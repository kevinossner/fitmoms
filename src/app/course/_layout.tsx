import { Stack, useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { customTheme } from '../../styles/theme';

export default function CourseLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: customTheme.colors.background,
        },
        headerTitle: 'Kursdetails',
        headerTintColor: customTheme.colors.onSurface,
        headerShadowVisible: false,
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            onPress={() => router.back()}
            iconColor={customTheme.colors.onSurface}
          />
        ),
      }}
    />
  );
}
