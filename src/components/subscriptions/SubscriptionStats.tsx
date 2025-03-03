import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar, useTheme } from 'react-native-paper';
import { useSubscriptionStats } from '../../hooks/subscriptions/useSubscriptionStats';
import { customTheme } from '../../styles/theme';

interface SubscriptionStatsProps {
  subscriptionId: string;
}

export function SubscriptionStats({ subscriptionId }: SubscriptionStatsProps) {
  const { stats, isLoading, error } = useSubscriptionStats(subscriptionId);
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Lade Statistiken...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Fehler beim Laden der Statistiken</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text>Keine Statistiken verfügbar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Anwesenheitsstatistik
      </Text>

      <View style={styles.progressContainer}>
        <ProgressBar
          progress={stats.attendanceRate / 100}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>{stats.attendanceRate.toFixed(1)}% Anwesenheit</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text variant="titleSmall">Gesamt</Text>
          <Text variant="bodyLarge">{stats.total}</Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="titleSmall">Anwesend</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
            {stats.attended}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="titleSmall">Nicht erschienen</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
            {stats.noShow}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="titleSmall">Entschuldigt</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
            {stats.excused}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: customTheme.spacing.m,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: customTheme.spacing.m,
  },
  title: {
    marginBottom: customTheme.spacing.m,
  },
  progressContainer: {
    marginBottom: customTheme.spacing.m,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginTop: customTheme.spacing.s,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -customTheme.spacing.s,
  },
  statItem: {
    width: '50%',
    padding: customTheme.spacing.s,
  },
  error: {
    color: customTheme.colors.error,
  },
});
