import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../common/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listContent: {
    paddingTop: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
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
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
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
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
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
    borderColor: colors.backgroundSecondary,
    borderRadius: 8,
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
    borderColor: colors.backgroundSecondary,
    borderRadius: 8,
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
    borderRadius: 8,
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
    color: colors.background,
  },
  sortPanel: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: spacing.xs,
  },
  sortOptionRowActive: {
    backgroundColor: colors.primary + '20',
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
    color: '#C62828',
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
