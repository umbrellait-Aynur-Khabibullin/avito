import type { Product } from '../../types/product.types';

export type MyProductCardProps = {
  item: Product;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
