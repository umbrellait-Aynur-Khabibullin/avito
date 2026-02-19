import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  stickyHeader: {
    flexShrink: 0,
    backgroundColor: colors.backgroundSecondary,
  },
  list: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listContent: {
    paddingTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardBody: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardSellerName: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  filterHeaderChevron: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  filterPanel: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  filterInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundSecondary,
  },
  filterSeparator: {
    marginHorizontal: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
  },
  filterInputFull: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: spacing.md,
  },
  ratingOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  ratingOptionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundSecondary,
  },
  ratingOptionChipActive: {
    backgroundColor: colors.primary,
  },
  ratingOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  ratingOptionTextActive: {
    color: colors.onPrimary,
  },
  sortPanel: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: spacing.xs,
  },
  sortOptionRowActive: {
    backgroundColor: colors.primary + '25',
  },
  sortOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  sortOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  sortOptionCheck: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    paddingHorizontal: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
