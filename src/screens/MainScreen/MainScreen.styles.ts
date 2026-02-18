import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  logoutButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
