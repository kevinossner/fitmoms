import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSubscriptions } from '../../../../hooks/subscriptions/useSubscriptions';
import { SubscriptionStats } from '../../../../components/subscriptions/SubscriptionStats';
import { customTheme } from '../../../../styles/theme';

export default function SubscriptionsScreen() {
  const router = useRouter();
  const { subscriptions, isLoading, error, refetch } = useSubscriptions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Lade Abonnements...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Fehler beim Laden der Abonnements</Text>
        <Button mode="contained" onPress={refetch} style={styles.button}>
          Erneut versuchen
        </Button>
      </View>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Du hast noch keine Kurse abonniert.</Text>
        <Button
          mode="contained"
          onPress={() => router.push('/(app)/(tabs)/courses')}
          style={styles.button}
        >
          Kurse durchsuchen
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => (
          <View style={styles.subscriptionContainer}>
            <Card style={styles.card} onPress={() => router.push(`/course/${item.course_id}`)}>
              <Card.Content>
                <Text variant="titleLarge">{item.course.name}</Text>
                <Text variant="bodyMedium" style={styles.dates}>
                  Von: {new Date(item.start_date).toLocaleDateString()}
                </Text>
                <Text variant="bodyMedium" style={styles.dates}>
                  Bis: {new Date(item.end_date).toLocaleDateString()}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.status,
                    {
                      color:
                        item.payment_status === 'paid'
                          ? '#4CAF50'
                          : item.payment_status === 'pending'
                            ? '#FF9800'
                            : '#F44336',
                    },
                  ]}
                >
                  Zahlungsstatus:{' '}
                  {item.payment_status === 'paid'
                    ? 'Bezahlt'
                    : item.payment_status === 'pending'
                      ? 'Ausstehend'
                      : 'Überfällig'}
                </Text>
              </Card.Content>
            </Card>
            <SubscriptionStats subscriptionId={item.id} />
          </View>
        )}
        keyExtractor={item => item.id}
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
  subscriptionContainer: {
    marginBottom: customTheme.spacing.m,
  },
  card: {
    marginBottom: 0,
  },
  list: {
    padding: customTheme.spacing.m,
  },
  dates: {
    marginTop: customTheme.spacing.s,
  },
  status: {
    marginTop: customTheme.spacing.s,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: customTheme.spacing.m,
  },
  button: {
    marginTop: customTheme.spacing.s,
  },
  error: {
    color: customTheme.colors.error,
    marginBottom: customTheme.spacing.m,
  },
});
