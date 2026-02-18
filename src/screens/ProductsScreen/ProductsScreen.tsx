import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { styles } from './ProductsScreen.styles';
import type { ProductsScreenProps } from './ProductsScreen.types';
import type { Product } from '../../types/product.types';
import { getProducts } from '../../store/slices/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors, spacing } from '../../common/theme';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function ProductCard({ item }: { item: Product }): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
    </View>
  );
}

export function ProductsScreen({ navigation }: ProductsScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const goToAddProduct = useCallback(() => {
    navigation.navigate('AddProduct');
  }, [navigation]);

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return <ProductCard item={item} />;
  }, []);

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
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          items.length === 0 && { flexGrow: 1 },
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Пока нет товаров. Добавьте первый!</Text>
        }
      />
    </View>
  );
}
