import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { AnnouncementList } from '../../../../components/feed/AnnouncementList';
import { Stack } from 'expo-router';
import { useAuth } from '../../../../providers/auth';
import { customTheme } from '../../../../styles/theme';

export default function FeedScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          header: () => (
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.greeting}>
                Willkommen zurück,
              </Text>
              <Text variant="headlineLarge" style={styles.name}>
                {user?.first_name}!
              </Text>
            </View>
          ),
        }}
      />
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Neuigkeiten
          </Text>
        </View>
        <AnnouncementList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: customTheme.spacing.m,
    paddingBottom: customTheme.spacing.m,
    backgroundColor: customTheme.colors.background,
  },
  greeting: {
    color: customTheme.colors.onSurfaceVariant,
  },
  name: {
    color: customTheme.colors.onBackground,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: customTheme.spacing.m,
    paddingVertical: customTheme.spacing.s,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: customTheme.colors.outlineVariant,
    backgroundColor: customTheme.colors.background,
  },
  sectionTitle: {
    color: customTheme.colors.onSurfaceVariant,
    fontWeight: '600',
  },
});
