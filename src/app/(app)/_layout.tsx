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
