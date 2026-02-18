import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen/RegistrationScreen';
import { PasswordResetScreen } from '../screens/PasswordResetScreen/PasswordResetScreen';
import type { AuthStackParamList } from './AuthNavigator.types';
import { screenOptions } from './AuthNavigator.styles';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Вход' }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: 'Регистрация' }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{ title: 'Сброс пароля' }}
      />
    </Stack.Navigator>
  );
}
