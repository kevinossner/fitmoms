import { Stack } from 'expo-router';
import { ThemeProvider } from '../providers/theme';
import { AuthProvider } from '../providers/auth';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </ThemeProvider>
  );
}
