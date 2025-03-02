import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Card, Text, Button } from 'react-native-paper';
import { useRouter, useNavigation } from 'expo-router';
import { useSubscriptions } from '../../../../hooks/subscriptions/useSubscriptions';
import { ErrorMessage } from '../../../../components/ui/ErrorMessage';

export default function SubscriptionsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { subscriptions, isLoading, error, refetch } = useSubscriptions();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (subscriptions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text variant="bodyLarge" style={styles.emptyText}>
          Du hast noch keine Kurse gebucht
        </Text>
        <Button mode="contained" onPress={() => router.push('/courses')} style={styles.button}>
          Kurse durchstöbern
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200ee']} // Material Design primary color
            tintColor="#6200ee"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  list: {
    padding: 16,
  },
  dates: {
    marginTop: 8,
  },
  status: {
    marginTop: 8,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
