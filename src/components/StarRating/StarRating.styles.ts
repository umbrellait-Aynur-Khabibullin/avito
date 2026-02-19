import { StyleSheet } from 'react-native';
import { colors } from '../../common/theme';

export const starColors = {
  filled: colors.primary,
  empty: colors.textMuted,
} as const;

export const createStyles = (size: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    star: {
      fontSize: size,
      lineHeight: size,
    },
    starFilled: {
      color: starColors.filled,
    },
    starEmpty: {
      color: starColors.empty,
    },
  });
