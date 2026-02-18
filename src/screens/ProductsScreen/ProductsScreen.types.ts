import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProductsStackParamList } from '../../navigation/MainNavigator.types';

export type ProductsScreenProps = NativeStackScreenProps<
  ProductsStackParamList,
  'Products'
>;
