import { Stack } from 'expo-router';
import { useAuth } from '../../providers/auth';
import { customTheme } from '../../styles/theme';

export default function AuthLayout() {
  const { loading } = useAuth();

  // Don't render anything while checking authentication state
  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: customTheme.colors.background,
        },
      }}
    />
  );
}
