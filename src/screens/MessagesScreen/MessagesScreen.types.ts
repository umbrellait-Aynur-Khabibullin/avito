import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MessagesStackParamList } from '../../navigation/MainNavigator.types';

export type MessagesScreenProps = NativeStackScreenProps<
  MessagesStackParamList,
  'Messages'
>;
