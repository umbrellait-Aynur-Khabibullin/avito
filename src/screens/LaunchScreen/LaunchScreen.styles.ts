import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoWrapper: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    borderRadius: 16,
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: typography.letterSpacing.wider,
  },
  logoAccent: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: spacing.md,
  },
});
