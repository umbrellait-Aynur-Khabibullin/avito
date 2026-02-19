import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Product } from '../types/product.types';

export type ChatParams =
  | { chatId: string }
  | { product: Product };

/** Стек внутри вкладки «Товары» */
export type ProductsStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product; isOwnProduct?: boolean };
  AddProduct: undefined;
};

/** Стек внутри вкладки «Мои товары» */
export type MyProductsStackParamList = {
  MyProducts: undefined;
  ProductDetail: { product: Product; isOwnProduct?: boolean };
  AddProduct: { product?: Product };
};

/** Стек внутри вкладки «Сообщения» */
export type MessagesStackParamList = {
  Messages: undefined;
  Chat: ChatParams;
};

/** Стек внутри вкладки «Профиль» */
export type ProfileStackParamList = {
  Profile: undefined;
};

/** Параметры нижних табов (каждый таб — свой стек) */
export type MainTabParamList = {
  ProductsTab: NavigatorScreenParams<ProductsStackParamList>;
  MyProductsTab: NavigatorScreenParams<MyProductsStackParamList>;
  MessagesTab: NavigatorScreenParams<MessagesStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

/** Для обратной совместимости: корневой список экранов (стек) — теперь не используется как корень */
export type MainStackParamList = {
  Main: undefined;
  Profile: undefined;
  Products: undefined;
  AddProduct: undefined;
};
