import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  ProductsStackParamList,
  MyProductsStackParamList,
} from '../../navigation/MainNavigator.types';

export type ProductDetailScreenProps =
  | NativeStackScreenProps<ProductsStackParamList, 'ProductDetail'>
  | NativeStackScreenProps<MyProductsStackParamList, 'ProductDetail'>;
