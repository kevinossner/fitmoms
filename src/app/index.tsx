import { Redirect } from 'expo-router';
import { useAuth } from '../providers/auth';
import { ActivityIndicator, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { customTheme } from '../styles/theme';
import { useEffect } from 'react';

export default function Index() {
  const { session, loading } = useAuth();

  useEffect(() => {
    console.log('Root index - Session:', session?.user?.id, 'Loading:', loading);
  }, [session, loading]);

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent]}>
        <ActivityIndicator size="large" color={customTheme.colors.primary} />
      </View>
    );
  }

  // Redirect based on auth state
  if (session) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/sign-in" />;
}
