import type { ImageSourcePropType } from 'react-native';

const ICON_SIZE = 28;
const icons8 = (id: string) => ({
  uri: `https://img.icons8.com/?id=${id}&format=png&size=${ICON_SIZE}`,
});

/**
 * Иконки таб-бара (Icons8 Fluent Filled — более толстые).
 */
export const tabIcons: Record<string, ImageSourcePropType> = {
  ProductsTab: icons8('rtwsPcq0rXOw'), // shop
  MyProductsTab: icons8('4IbsKb7MVfkT'), // list
  MessagesTab: icons8('kEtW9PRT0hAv'), // filled-chat
  ProfileTab: icons8('2yC9SZKcXDdX'), // user-male-circle
};

/**
 * Иконки для заголовков экранов (Icons8 Fluent Filled).
 */
export const headerIcons: Record<string, ImageSourcePropType> = {
  Products: icons8('rtwsPcq0rXOw'),
  ProductDetail: icons8('rtwsPcq0rXOw'),
  AddProduct: icons8('zHoPnj4N4f6N'), // plus
  MyProducts: icons8('4IbsKb7MVfkT'),
  Messages: icons8('kEtW9PRT0hAv'),
  Chat: icons8('kEtW9PRT0hAv'),
  Profile: icons8('2yC9SZKcXDdX'),
};
