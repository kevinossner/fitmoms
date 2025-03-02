import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { Database } from '../../types/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleLarge">{course.name}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {course.description}
        </Text>
        <Text variant="bodySmall" style={styles.participants}>
          Max. Teilnehmer: {course.max_participants}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onPress}>
          Details ansehen
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    marginBottom: 8,
  },
  participants: {
    opacity: 0.7,
  },
});
