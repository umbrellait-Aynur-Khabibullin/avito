import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.background,
    letterSpacing: 1,
  },
  tagline: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.background,
    opacity: 0.9,
  },
});
