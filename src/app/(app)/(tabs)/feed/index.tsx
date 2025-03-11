import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { AnnouncementList } from '../../../../components/feed/AnnouncementList';
import { useAuth } from '../../../../providers/auth';
import { customTheme } from '../../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function FeedScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.name}>
          Hi {user?.first_name}!
        </Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={32} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Neuigkeiten
          </Text>
        </View>
        <AnnouncementList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  header: {
    paddingTop: customTheme.spacing.m,
    paddingHorizontal: customTheme.spacing.m,
    paddingBottom: customTheme.spacing.m,
    backgroundColor: customTheme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
