import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  imageSlider: {
    height: 220,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  sliderItem: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  sliderImage: {
    height: 220,
  },
  sliderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.overlay,
  },
  sliderCounter: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  sliderDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
  sliderDotActive: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  sellerBlock: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  sellerAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onPrimary,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  sellerId: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  messageButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onPrimary,
  },
});
