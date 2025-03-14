import { useEffect } from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '../../providers/auth';
import { customTheme } from '../../styles/theme';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: customTheme.colors.background,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default function AppLayout() {
  const { session, loading, refreshSession } = useAuth();
  const appState = useRef(AppState.currentState);
  const refreshing = useRef(false);
  const lastActiveTime = useRef(Date.now());

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      console.log('[AppLayout] App State Change:', {
        previous: appState.current,
        next: nextAppState,
        hasSession: !!session,
        sessionUserId: session?.user?.id,
        refreshing: refreshing.current,
        timeSinceLastActive: Date.now() - lastActiveTime.current,
      });

      if (nextAppState === 'active') {
        lastActiveTime.current = Date.now();
      }

      // Only refresh if coming back to active state and enough time has passed (5 seconds)
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !refreshing.current &&
        Date.now() - lastActiveTime.current > 5000 // Only refresh if more than 5 seconds have passed
      ) {
        refreshing.current = true;
        console.log('[AppLayout] Attempting to refresh session...');

        try {
          // First check if we still have a valid session
          const { data: currentSession, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) {
            console.error('[AppLayout] Error getting current session:', sessionError);
            return;
          }

          console.log('[AppLayout] Current session check:', {
            hasSession: !!currentSession.session,
            userId: currentSession.session?.user?.id,
          });

          if (!currentSession.session) {
            console.log('[AppLayout] No current session found');
            return;
          }

          // Attempt to refresh the session
          await refreshSession?.();

          // Verify the refresh was successful
          const { data } = await supabase.auth.getSession();
          console.log('[AppLayout] Session refresh complete:', {
            hasSession: !!data.session,
            sessionUserId: data.session?.user?.id,
          });
        } catch (error) {
          console.error('[AppLayout] Session refresh failed:', error);
        } finally {
          refreshing.current = false;
        }
      }
      appState.current = nextAppState;
    },
    [refreshSession]
  );

  useEffect(() => {
    console.log('[AppLayout] Mount/update:', {
      hasSession: !!session,
      sessionUserId: session?.user?.id,
      loading,
    });

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  // Redirect to sign in if not authenticated
  if (!loading && !session) {
    console.log('[AppLayout] No session, redirecting to sign-in');
    return <Redirect href="/sign-in" />;
  }

  // Don't render anything while checking authentication state
  if (loading) {
    console.log('[AppLayout] Loading auth state...');
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: 'Profil',
          presentation: 'modal',
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: styles.headerStyle,
          headerTintColor: customTheme.colors.onSurface,
          headerRight: () => {
            const router = useRouter();
            return (
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                <Text style={{ color: customTheme.colors.primary, fontSize: 18 }}>Fertig</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: 'Details',
          presentation: 'modal',
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: styles.headerStyle,
          headerTintColor: customTheme.colors.onSurface,
          headerRight: () => {
            const router = useRouter();
            return (
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                <Text style={{ color: customTheme.colors.primary, fontSize: 18 }}>Fertig</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
}
