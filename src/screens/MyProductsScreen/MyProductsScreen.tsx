import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
  Image,
} from 'react-native';
import { styles } from './MyProductsScreen.styles';
import type { MyProductsScreenProps } from './MyProductsScreen.types';
import type { Product } from '../../types/product.types';
import { getProducts } from '../../store/slices/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors, spacing } from '../../common/theme';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function ProductCard({
  item,
  onPress,
}: {
  item: Product;
  onPress: () => void;
}): React.JSX.Element {
  const imageUrl = item.imageUrls?.[0] ?? item.imageUrl;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
      ) : null}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
      </View>
    </Pressable>
  );
}

export function MyProductsScreen({ navigation }: MyProductsScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.product);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const myItems = useMemo(
    () => (user?.id ? items.filter((p) => p.sellerId === user.id) : []),
    [items, user?.id]
  );

  const goToAddProduct = useCallback(() => {
    navigation.navigate('AddProduct');
  }, [navigation]);

  const goToProductDetail = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard item={item} onPress={() => goToProductDetail(item)} />
    ),
    [goToProductDetail]
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={goToAddProduct}>
        <Text style={styles.addButtonText}>+ Добавить товар</Text>
      </Pressable>
      {error ? (
        <Text style={{ color: '#C62828', paddingHorizontal: spacing.md }}>{error}</Text>
      ) : null}
      <FlatList
        data={myItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          myItems.length === 0 && { flexGrow: 1 },
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            У вас пока нет объявлений. Добавьте первый товар!
          </Text>
        }
      />
    </View>
  );
}
