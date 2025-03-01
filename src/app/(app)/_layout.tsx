import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/auth';
import { customTheme } from '../../styles/theme';

export default function AppLayout() {
  const { session, loading } = useAuth();

  // Redirect to sign in if not authenticated
  if (!loading && !session) {
    return <Redirect href="/sign-in" />;
  }

  // Don't render anything while checking authentication state
  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: customTheme.colors.background,
        },
        headerTintColor: customTheme.colors.onSurface,
        contentStyle: {
          backgroundColor: customTheme.colors.background,
        },
      }}
    />
  );
}
