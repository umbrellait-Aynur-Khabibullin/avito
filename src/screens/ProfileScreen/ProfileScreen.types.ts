import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../navigation/MainNavigator.types';

export type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;
