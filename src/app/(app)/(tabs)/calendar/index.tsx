import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { useSubscribedSessions } from '../../../../hooks/sessions/useSubscribedSessions';
import { SessionCard } from '../../../../components/sessions/SessionCard';
import { customTheme } from '../../../../styles/theme';

export default function CalendarScreen() {
  const { sessions, isLoading, error, refetch } = useSubscribedSessions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Kalender',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'System',
            },
            headerStyle: {
              backgroundColor: customTheme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={customTheme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Kalender',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'System',
            },
            headerStyle: {
              backgroundColor: customTheme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        <View style={styles.centered}>
          <Text style={styles.error}>Fehler beim Laden der Termine</Text>
        </View>
      </View>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Kalender',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'System',
            },
            headerStyle: {
              backgroundColor: customTheme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Keine anstehenden Termine gefunden.
            {'\n'}
            Melde dich für Kurse an, um Termine zu sehen.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Kalender',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: 'System',
          },
          headerStyle: {
            backgroundColor: customTheme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      <FlashList
        data={sessions}
        renderItem={({ item }) => <SessionCard session={item} onUpdate={refetch} />}
        estimatedItemSize={150}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[customTheme.colors.primary]}
            tintColor={customTheme.colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: customTheme.spacing.m,
  },
  list: {
    padding: customTheme.spacing.m,
  },
  emptyText: {
    textAlign: 'center',
    color: customTheme.colors.onSurfaceVariant,
  },
  error: {
    color: customTheme.colors.error,
  },
});
