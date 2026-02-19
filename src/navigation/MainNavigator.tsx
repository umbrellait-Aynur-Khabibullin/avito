import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '../common/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { tabIcons, headerIcons } from '../assets/icons';
import { ProductsScreen } from '../screens/ProductsScreen/ProductsScreen';
import { AddProductScreen } from '../screens/AddProductScreen/AddProductScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen/ProductDetailScreen';
import { MyProductsScreen } from '../screens/MyProductsScreen/MyProductsScreen';
import { MessagesScreen } from '../screens/MessagesScreen/MessagesScreen';
import { ChatScreen } from '../screens/ChatScreen/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import type {
  MainTabParamList,
  ProductsStackParamList,
  MyProductsStackParamList,
  MessagesStackParamList,
  ProfileStackParamList,
} from './MainNavigator.types';
import { mainScreenOptions, tabScreenOptions } from './MainNavigator.styles';

const SCREEN_TITLES: Record<string, string> = {
  Products: 'Товары',
  ProductDetail: 'Товар',
  AddProduct: 'Добавить товар',
  MyProducts: 'Мои товары',
  Messages: 'Сообщения',
  Chat: 'Чат',
  Profile: 'Профиль',
};

function getScreenOptionsWithIcon(
  route: { name: string; params?: Record<string, unknown> }
) {
  const isEditing =
    route.name === 'AddProduct' && route.params?.product != null;
  const title = isEditing
    ? 'Редактирование товара'
    : SCREEN_TITLES[route.name] ?? route.name;
  const icon = isEditing ? undefined : headerIcons[route.name];
  return {
    ...mainScreenOptions,
    title,
    headerTitle: ({ children }: { children?: string }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {icon ? (
          <Image
            source={icon}
            style={{ width: 22, height: 22, tintColor: colors.text }}
            resizeMode="contain"
          />
        ) : null}
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>
          {children ?? title}
        </Text>
      </View>
    ),
  };
}

const Tab = createBottomTabNavigator<MainTabParamList>();
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const MyProductsStack = createNativeStackNavigator<MyProductsStackParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function ProductsTabStack(): React.JSX.Element {
  return (
    <ProductsStack.Navigator
      screenOptions={({ route }) => getScreenOptionsWithIcon(route)}
    >
      <ProductsStack.Screen name="Products" component={ProductsScreen} />
      <ProductsStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <ProductsStack.Screen name="AddProduct" component={AddProductScreen} />
    </ProductsStack.Navigator>
  );
}

function MyProductsTabStack(): React.JSX.Element {
  return (
    <MyProductsStack.Navigator
      screenOptions={({ route }) => getScreenOptionsWithIcon(route)}
    >
      <MyProductsStack.Screen name="MyProducts" component={MyProductsScreen} />
      <MyProductsStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <MyProductsStack.Screen name="AddProduct" component={AddProductScreen} />
    </MyProductsStack.Navigator>
  );
}

function MessagesTabStack(): React.JSX.Element {
  return (
    <MessagesStack.Navigator
      screenOptions={({ route }) => getScreenOptionsWithIcon(route)}
    >
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen name="Chat" component={ChatScreen} />
    </MessagesStack.Navigator>
  );
}

function ProfileTabStack(): React.JSX.Element {
  return (
    <ProfileStack.Navigator
      screenOptions={({ route }) => getScreenOptionsWithIcon(route)}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function getTabIcon(
  routeName: keyof MainTabParamList
): (props: { focused: boolean; color: string; size: number }) => React.JSX.Element {
  return ({ color, size }) => (
    <Image
      source={tabIcons[routeName]}
      style={{ width: size, height: size, tintColor: color }}
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
