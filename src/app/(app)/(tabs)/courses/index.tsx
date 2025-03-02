import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useCourses } from '../../../../hooks/courses/useCourses';
import { CourseCard } from '../../../../components/courses/CourseCard';
import { ErrorMessage } from '../../../../components/ui/ErrorMessage';

export default function CoursesScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { courses, isLoading, error, refetch } = useCourses();
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

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseCard course={item} onPress={() => router.push(`/course/${item.id}`)} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200ee']}
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
  },
  list: {
    padding: 16,
  },
});
