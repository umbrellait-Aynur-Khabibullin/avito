import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator.types';

export type RegistrationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Registration'
>;

export type RegistrationScreenNavigationProp = RegistrationScreenProps['navigation'];
export type RegistrationScreenRouteProp = RegistrationScreenProps['route'];
