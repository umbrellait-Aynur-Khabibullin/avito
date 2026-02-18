import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getTabIconUrl } from '../constants/navigation.const';
import { ProductsScreen } from '../screens/ProductsScreen/ProductsScreen';
import { AddProductScreen } from '../screens/AddProductScreen/AddProductScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import { MyProductsScreen } from '../screens/MyProductsScreen/MyProductsScreen';
import { MessagesScreen } from '../screens/MessagesScreen/MessagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import type {
  MainTabParamList,
  ProductsStackParamList,
  MyProductsStackParamList,
  MessagesStackParamList,
  ProfileStackParamList,
} from './MainNavigator.types';
import { mainScreenOptions, tabScreenOptions } from './MainNavigator.styles';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const MyProductsStack = createNativeStackNavigator<MyProductsStackParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function ProductsTabStack(): React.JSX.Element {
  return (
    <ProductsStack.Navigator screenOptions={mainScreenOptions}>
      <ProductsStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Товары' }}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Товар' }}
      />
      <ProductsStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ title: 'Добавить товар' }}
      />
    </ProductsStack.Navigator>
  );
}

function MyProductsTabStack(): React.JSX.Element {
  return (
    <MyProductsStack.Navigator screenOptions={mainScreenOptions}>
      <MyProductsStack.Screen
        name="MyProducts"
        component={MyProductsScreen}
        options={{ title: 'Мои товары' }}
      />
      <MyProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Товар' }}
      />
      <MyProductsStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ title: 'Добавить товар' }}
      />
    </MyProductsStack.Navigator>
  );
}

function MessagesTabStack(): React.JSX.Element {
  return (
    <MessagesStack.Navigator screenOptions={mainScreenOptions}>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Сообщения' }}
      />
    </MessagesStack.Navigator>
  );
}

function ProfileTabStack(): React.JSX.Element {
  return (
    <ProfileStack.Navigator screenOptions={mainScreenOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Профиль' }}
      />
    </ProfileStack.Navigator>
  );
}

function getTabIcon(
  routeName: keyof MainTabParamList
): (props: { focused: boolean; color: string; size: number }) => React.JSX.Element {
  return ({ color, size }) => (
    <Image
      source={{ uri: getTabIconUrl(routeName, size, color) }}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export function MainNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="ProductsTab"
      screenOptions={tabScreenOptions}
    >
      <Tab.Screen
        name="ProductsTab"
        component={ProductsTabStack}
        options={{
          title: 'Товары',
          tabBarLabel: 'Товары',
          headerShown: false,
          tabBarIcon: getTabIcon('ProductsTab'),
        }}
      />
      <Tab.Screen
        name="MyProductsTab"
        component={MyProductsTabStack}
        options={{
          title: 'Мои товары',
          tabBarLabel: 'Мои',
          headerShown: false,
          tabBarIcon: getTabIcon('MyProductsTab'),
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesTabStack}
        options={{
          title: 'Сообщения',
          tabBarLabel: 'Сообщения',
          headerShown: false,
          tabBarIcon: getTabIcon('MessagesTab'),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTabStack}
        options={{
          title: 'Профиль',
          tabBarLabel: 'Профиль',
          headerShown: false,
          tabBarIcon: getTabIcon('ProfileTab'),
        }}
      />
    </Tab.Navigator>
  );
}
