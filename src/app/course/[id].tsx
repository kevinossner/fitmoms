import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useCourseDetails } from '../../hooks/courses/useCourseDetails';
import { useSubscribeToCourse } from '../../hooks/courses/useSubscribeToCourse';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { course, isLoading, error } = useCourseDetails(id as string);
  const { subscribe, isSubscribing, subscriptionError } = useSubscribeToCourse();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !course) {
    return <ErrorMessage message={error?.message || 'Course not found'} />;
  }

  const handleSubscribe = async () => {
    try {
      await subscribe(course.id);
      router.push('/subscriptions');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium">{course.name}</Text>
          <Text variant="bodyLarge" style={styles.description}>
            {course.description}
          </Text>
          <View style={styles.details}>
            <Text variant="bodyMedium">Maximale Teilnehmerzahl: {course.max_participants}</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleSubscribe}
            loading={isSubscribing}
            disabled={isSubscribing}
          >
            Anmelden
          </Button>
        </Card.Actions>
      </Card>
      {subscriptionError && <Text style={styles.error}>{subscriptionError.message}</Text>}
    </ScrollView>
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
  },
  card: {
    margin: 16,
  },
  description: {
    marginTop: 16,
    marginBottom: 16,
  },
  details: {
    marginTop: 8,
  },
  error: {
    color: '#B00020',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
});
