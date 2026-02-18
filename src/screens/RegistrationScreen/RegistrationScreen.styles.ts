import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: 14,
    color: '#C62828',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  linkRow: {
    marginTop: spacing.lg,
  },
  link: {
    paddingVertical: spacing.sm,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});
