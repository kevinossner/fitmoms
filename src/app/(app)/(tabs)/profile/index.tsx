import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Stack } from 'expo-router';
import { useAuth } from '../../../../providers/auth';
import { customTheme } from '../../../../styles/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerLargeTitle: true,
        }}
      />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.welcome}>
          Welcome, {user?.first_name}!
        </Text>
        <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
