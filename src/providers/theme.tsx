import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../styles/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
