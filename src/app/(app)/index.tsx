import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import { globalStyles } from '../../styles/global';
import { customTheme } from '../../styles/theme';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={[globalStyles.container, globalStyles.centerContent]}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.welcome}>
          Willkommen, {user?.first_name}!
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Du bist erfolgreich eingeloggt.
        </Text>
        <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
          Abmelden
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: customTheme.spacing.xl,
  },
  welcome: {
    textAlign: 'center',
    marginBottom: customTheme.spacing.s,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: customTheme.spacing.xl,
    color: customTheme.colors.onSurfaceVariant,
  },
  button: {
    minWidth: 120,
  },
});
