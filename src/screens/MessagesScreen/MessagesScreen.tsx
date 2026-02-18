import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './MessagesScreen.styles';
import type { MessagesScreenProps } from './MessagesScreen.types';

export function MessagesScreen(_props: MessagesScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>
        Здесь будут переписки с другими пользователями
      </Text>
    </View>
  );
}
