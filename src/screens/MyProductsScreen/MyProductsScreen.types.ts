import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MyProductsStackParamList } from '../../navigation/MainNavigator.types';

export type MyProductsScreenProps = NativeStackScreenProps<
  MyProductsStackParamList,
  'MyProducts'
>;
