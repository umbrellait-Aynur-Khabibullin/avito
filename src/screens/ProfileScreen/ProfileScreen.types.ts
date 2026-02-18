import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator.types';

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Profile'
>;

