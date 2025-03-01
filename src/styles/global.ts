import { StyleSheet } from 'react-native';
import { customTheme } from './theme';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Spacing
  padding: {
    padding: customTheme.spacing.m,
  },
  paddingHorizontal: {
    paddingHorizontal: customTheme.spacing.m,
  },
  paddingVertical: {
    paddingVertical: customTheme.spacing.m,
  },
  margin: {
    margin: customTheme.spacing.m,
  },
  marginHorizontal: {
    marginHorizontal: customTheme.spacing.m,
  },
  marginVertical: {
    marginVertical: customTheme.spacing.m,
  },
  gap: {
    gap: customTheme.spacing.m,
  },

  // Cards
  card: {
    backgroundColor: customTheme.colors.surface,
    borderRadius: customTheme.roundness * 4,
    padding: customTheme.spacing.m,
    ...customTheme.shadows.small,
  },
  elevatedCard: {
    backgroundColor: customTheme.colors.surface,
    borderRadius: customTheme.roundness * 4,
    padding: customTheme.spacing.m,
    ...customTheme.shadows.medium,
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: customTheme.spacing.s,
    paddingHorizontal: customTheme.spacing.m,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: customTheme.colors.outline,
  },

  // Forms
  formContainer: {
    gap: customTheme.spacing.m,
    padding: customTheme.spacing.m,
  },
  inputContainer: {
    marginBottom: customTheme.spacing.m,
  },
  errorText: {
    color: customTheme.colors.error,
    fontSize: 12,
    marginTop: customTheme.spacing.xs,
  },

  // Images
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  // Utility classes
  fullWidth: {
    width: '100%',
  },
  roundedFull: {
    borderRadius: 9999,
  },
  shadow: {
    ...customTheme.shadows.small,
  },
  mediumShadow: {
    ...customTheme.shadows.medium,
  },
  largeShadow: {
    ...customTheme.shadows.large,
  },
});
