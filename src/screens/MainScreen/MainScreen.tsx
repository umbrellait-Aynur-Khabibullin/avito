import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import type {MainScreenProps} from './types';

export function MainScreen(_props: MainScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Text style={styles.subtitle}>Добро пожаловать в Avito</Text>
    </View>
  );
}
