import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../providers/auth';
import { globalStyles } from '../../styles/global';
import { customTheme } from '../../styles/theme';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Explicitly navigate to app route on success
    router.replace('/(app)');
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Explicitly navigate to app route on success
    router.replace('/(app)');
  };

  const handleAppleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const { error } = await signInWithApple();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Explicitly navigate to app route on success
    router.replace('/(app)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyles.container, globalStyles.centerContent]}
    >
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Willkommen zurück
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            disabled={loading}
            style={styles.input}
          />

          <TextInput
            label="Passwort"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            disabled={loading}
            style={styles.input}
          />

          {error && <Text style={[globalStyles.errorText, styles.error]}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Anmelden
          </Button>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oder</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              mode="outlined"
              onPress={handleGoogleSignIn}
              // disabled={loading}
              disabled={true}
              style={[styles.socialButton, styles.googleButton]}
              icon="google"
            >
              Google
            </Button>

            <Button
              mode="outlined"
              onPress={handleAppleSignIn}
              disabled={loading}
              style={[styles.socialButton, styles.appleButton]}
              icon="apple"
            >
              Apple
            </Button>
          </View>

          <View style={styles.footer}>
            <Text variant="bodyMedium">Du hast noch kein Konto? </Text>
            <Link href="/sign-up" asChild>
              <Button mode="text" compact>
                Registrieren
              </Button>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 400,
    padding: customTheme.spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: customTheme.spacing.xl,
  },
  form: {
    gap: customTheme.spacing.m,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: customTheme.spacing.s,
  },
  error: {
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: customTheme.spacing.l,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: customTheme.colors.outline,
  },
  dividerText: {
    marginHorizontal: customTheme.spacing.m,
    color: customTheme.colors.outline,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: customTheme.spacing.m,
  },
  socialButton: {
    flex: 1,
  },
  googleButton: {
    borderColor: customTheme.colors.outline,
  },
  appleButton: {
    borderColor: customTheme.colors.outline,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: customTheme.spacing.l,
  },
});
