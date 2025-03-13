import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, AppState } from 'react-native';

type User = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithApple: () => Promise<{ error: Error | null }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Separate effect for initial session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  // Effect to handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Separate effect to handle user data fetching
  useEffect(() => {
    if (session?.user) {
      const currentUser = user;
      if (!currentUser || currentUser.id !== session.user.id) {
        fetchUser(session.user.id);
      }
    }
  }, [session]);

  // Auto refresh handling
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchUser = async (userId: string, retries = 3, delay = 1000) => {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

      if (error) {
        if (retries > 0) {
          console.log(`Retrying fetch user (${retries} attempts left)...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchUser(userId, retries - 1, delay);
        }
        if (!error.message.includes('multiple (or no) rows')) {
          console.error('Error fetching user:', error.message);
        }
        return;
      }

      setUser(data);
    } catch (error) {
      console.error('Error in fetchUser:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned from sign up');

      // 2. Create user profile using the authenticated connection
      const { data: userData, error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // 3. Update local state with the data we already have
      setSession(authData.session);
      setUser(userData);

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update local state
      setSession(session);
      if (session?.user) {
        await fetchUser(session.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signInWithApple = async () => {
    try {
      // Only proceed with Apple Sign In on iOS
      if (Platform.OS !== 'ios') {
        throw new Error('Apple Sign In is only available on iOS devices');
      }

      // Check if Apple Sign In is available on the device
      let isAvailable = false;
      try {
        isAvailable = await AppleAuthentication.isAvailableAsync();
      } catch (availabilityError) {
        console.log('Error checking Apple Sign In availability:', availabilityError);
        throw new Error('Unable to verify Apple Sign In availability');
      }

      if (!isAvailable) {
        throw new Error(
          'Apple Sign In is not available on this device. Please ensure you are signed into iCloud and have an Apple ID set up.'
        );
      }

      // Request sign in with Apple
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Sign in with Supabase using the Apple ID token
      const { data: authData, error: signInError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken!,
      });

      if (signInError) throw signInError;
      if (!authData.user) throw new Error('No user data returned from sign in');

      // Check if user profile already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (!existingUser) {
        // Create user profile if it doesn't exist
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email,
            first_name: credential.fullName?.givenName || '',
            last_name: credential.fullName?.familyName || '',
          })
          .select()
          .single();

        if (profileError) throw profileError;
        setUser(userData);
      } else {
        setUser(existingUser);
      }

      setSession(authData.session);
      return { error: null };
    } catch (error) {
      console.error('Apple Sign In error:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    setSession(null);
    setUser(null);
  };

  const refreshSession = async () => {
    try {
      console.log('[Auth] Starting session refresh...');
      // First try to get the current session
      const { data: currentData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('[Auth] Error getting current session:', sessionError);
        await signOut();
        return;
      }

      console.log('[Auth] Current session check:', {
        hasSession: !!currentData.session,
        userId: currentData.session?.user?.id,
      });

      if (!currentData.session) {
        console.log('[Auth] No current session found, signing out...');
        await signOut();
        return;
      }

      // Try to refresh the session
      console.log('[Auth] Attempting to refresh session token...');
      const {
        data: { session: newSession },
        error,
      } = await supabase.auth.refreshSession(currentData.session);

      if (error) {
        console.error('[Auth] Session refresh failed:', error);
        await signOut();
        return;
      }

      if (!newSession) {
        console.error('[Auth] Session refresh returned no session');
        await signOut();
        return;
      }

      console.log('[Auth] Got new session:', {
        userId: newSession.user?.id,
        expiresAt: newSession.expires_at,
      });

      // Update the session state
      setSession(newSession);

      // Only fetch user if we have a valid session and user ID
      if (newSession?.user?.id) {
        try {
          console.log('[Auth] Fetching user data...');
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', newSession.user.id)
            .single();

          if (userError) {
            console.error('[Auth] Error fetching user data:', userError);
            return;
          }

          if (!userData) {
            console.error('[Auth] No user data found');
            return;
          }

          setUser(userData);
          console.log('[Auth] User data updated successfully');
        } catch (userError) {
          console.error('[Auth] Error in user fetch:', userError);
        }
      }
    } catch (error) {
      console.error('[Auth] Unexpected error in session refresh:', error);
      // If anything fails, sign out to ensure clean state
      await signOut();
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithApple,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
