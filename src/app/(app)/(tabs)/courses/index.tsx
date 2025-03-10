import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useCourses } from '../../../../hooks/courses/useCourses';
import { CourseCard } from '../../../../components/courses/CourseCard';
import { ErrorMessage } from '../../../../components/ui/ErrorMessage';
import { customTheme } from '../../../../styles/theme';

export default function CoursesScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { courses, isLoading, error, refetch } = useCourses();
  const [refreshing, setRefreshing] = React.useState(false);

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
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message={error.message} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
