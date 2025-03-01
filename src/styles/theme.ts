import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

export const theme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF6B6B', // Energetic coral pink
    primaryContainer: '#FFE0E0',
    secondary: '#4ECDC4', // Fresh mint
    secondaryContainer: '#D4F5F2',
    tertiary: '#FFD93D', // Warm yellow
    tertiaryContainer: '#FFF3D6',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FFFFFF',
    error: '#FF6B6B',
    errorContainer: '#FFE0E0',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#400000',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#002E2B',
    onTertiary: '#000000',
    onTertiaryContainer: '#3F3000',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454E',
    onError: '#FFFFFF',
    onErrorContainer: '#400000',
    outline: '#79747E',
    elevation: {
      level0: 'transparent',
      level1: '#F8F8F8',
      level2: '#F3F3F3',
      level3: '#EEEEEE',
      level4: '#E9E9E9',
      level5: '#E4E4E4',
    },
  },
  roundness: 2,
};

// Custom theme additions
export const customTheme = {
  ...theme,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.46,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.25,
      shadowRadius: 7.49,
      elevation: 8,
    },
  },
};
