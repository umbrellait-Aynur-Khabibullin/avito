import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator.types';

export type ProductsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Products'
>;
