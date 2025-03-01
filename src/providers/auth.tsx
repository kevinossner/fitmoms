import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        // Only fetch user if we don't already have their data
        const currentUser = user;
        if (!currentUser || currentUser.id !== session.user.id) {
          await fetchUser(session.user.id);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
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
        // On final retry, only log if it's not the expected "no rows" error
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
      });

      return { error };
    } catch (error) {
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

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithApple,
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
