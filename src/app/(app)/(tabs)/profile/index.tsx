import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../../../../providers/auth';
import { customTheme } from '../../../../styles/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.welcome}>
          Welcome, {user?.first_name}!
        </Text>
        <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
          Sign Out
        </Button>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: customTheme.spacing.xl,
  },
  welcome: {
    textAlign: 'center',
    marginBottom: customTheme.spacing.xl,
  },
  button: {
    minWidth: 120,
  },
});
