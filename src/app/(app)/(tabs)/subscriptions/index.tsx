import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, FlatList, SafeAreaView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useRouter, useNavigation } from 'expo-router';
import { useSubscriptions } from '../../../../hooks/subscriptions/useSubscriptions';
import { SubscriptionStats } from '../../../../components/subscriptions/SubscriptionStats';
import { customTheme } from '../../../../styles/theme';
import { Header } from '../../../../components/ui/Header';

export default function SubscriptionsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { subscriptions, isLoading, error, refetch } = useSubscriptions();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text>Lade Anmeldungen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.error}>Fehler beim Laden der Anmeldungen</Text>
          <Button mode="contained" onPress={refetch} style={styles.button}>
            Erneut versuchen
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Du hast noch keine Anmeldungen.</Text>
          <Button
            mode="contained"
            onPress={() => router.push('/(app)/(tabs)/courses')}
            style={styles.button}
          >
            Kurse durchsuchen
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Anmeldungen" />
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
            onRefresh={handleRefresh}
            colors={[customTheme.colors.primary]}
            tintColor={customTheme.colors.primary}
          />
        }
      />
    </SafeAreaView>
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
