import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator.types';

export type PasswordResetScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'PasswordReset'
>;

export type PasswordResetScreenNavigationProp = PasswordResetScreenProps['navigation'];
export type PasswordResetScreenRouteProp = PasswordResetScreenProps['route'];
