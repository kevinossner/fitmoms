import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { customTheme } from '../../styles/theme';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.header}>
      <Text variant="headlineMedium" style={styles.headerText}>
        {title}
      </Text>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Ionicons name="person-circle-outline" size={32} color={theme.colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: customTheme.spacing.m,
    paddingBottom: customTheme.spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: customTheme.colors.onSurface,
    fontWeight: '500',
  },
});
