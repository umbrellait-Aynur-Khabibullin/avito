import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen/MainScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { ProductsScreen } from '../screens/ProductsScreen/ProductsScreen';
import { AddProductScreen } from '../screens/AddProductScreen/AddProductScreen';
import type { MainStackParamList } from './MainNavigator.types';
import { mainScreenOptions } from './MainNavigator.styles';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={mainScreenOptions}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: 'Главная' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Профиль' }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Товары' }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ title: 'Добавить товар' }}
      />
    </Stack.Navigator>
  );
}
