import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AnnouncementList } from '../../../../components/feed/AnnouncementList';
import { Stack } from 'expo-router';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Feed',
          headerLargeTitle: true,
        }}
      />
      <AnnouncementList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
