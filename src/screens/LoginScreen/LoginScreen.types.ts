import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator.types';

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

export type LoginScreenNavigationProp = LoginScreenProps['navigation'];
export type LoginScreenRouteProp = LoginScreenProps['route'];
