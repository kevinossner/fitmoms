import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useCourseDetails } from '../../../hooks/courses/useCourseDetails';
import { useSubscribeToCourse } from '../../../hooks/courses/useSubscribeToCourse';
import { useIsSubscribed } from '../../../hooks/courses/useIsSubscribed';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { customTheme } from '../../../styles/theme';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { course, isLoading, error } = useCourseDetails(id as string);
  const { subscribe, isSubscribing, subscriptionError } = useSubscribeToCourse();
  const { isSubscribed } = useIsSubscribed(id as string);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !course) {
    return (
      <View style={styles.container}>
        <ErrorMessage message={error?.message || 'Course not found'} />
      </View>
    );
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              disabled={isSubscribing || isSubscribed}
            >
              {isSubscribed ? 'Angemeldet' : 'Anmelden'}
            </Button>
          </Card.Actions>
        </Card>
        {subscriptionError && <Text style={styles.error}>{subscriptionError.message}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  scrollContent: {
    padding: customTheme.spacing.m,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customTheme.colors.background,
  },
  card: {
    marginBottom: customTheme.spacing.m,
  },
  description: {
    marginTop: customTheme.spacing.m,
    marginBottom: customTheme.spacing.m,
  },
  details: {
    marginTop: customTheme.spacing.s,
  },
  error: {
    color: customTheme.colors.error,
    textAlign: 'center',
    marginTop: customTheme.spacing.s,
  },
});
