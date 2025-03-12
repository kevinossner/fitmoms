import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { AnnouncementList } from '../../../../components/feed/AnnouncementList';
import { useAuth } from '../../../../providers/auth';
import { customTheme } from '../../../../styles/theme';
import { Header } from '../../../../components/ui/Header';

export default function FeedScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`News`} />
      <View style={styles.content}>
        <AnnouncementList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  content: {
    flex: 1,
  },
});
