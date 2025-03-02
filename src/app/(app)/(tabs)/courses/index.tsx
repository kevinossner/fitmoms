import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Courses',
          headerLargeTitle: true,
        }}
      />
      <Text>Courses Screen (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
