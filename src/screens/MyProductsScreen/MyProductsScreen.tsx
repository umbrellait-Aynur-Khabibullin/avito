import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
  Alert,
} from 'react-native';
import { styles } from './MyProductsScreen.styles';
import type { MyProductsScreenProps } from './MyProductsScreen.types';
import type { Product } from '../../types/product.types';
import { MyProductCard } from '../../components/MyProductCard';
import { getProducts, deleteProduct } from '../../store/slices/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors, spacing } from '../../common/theme';

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
    navigation.navigate('AddProduct', {});
  }, [navigation]);

  const goToProductDetail = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product, isOwnProduct: true });
    },
    [navigation]
  );

  const goToEditProduct = useCallback(
    (product: Product) => {
      navigation.navigate('AddProduct', { product });
    },
    [navigation]
  );

  const handleDelete = useCallback(
    (product: Product) => {
      Alert.alert(
        'Удалить товар?',
        `Вы уверены, что хотите удалить «${product.title}»?`,
        [
          { text: 'Отмена', style: 'cancel' },
          {
            text: 'Удалить',
            style: 'destructive',
            onPress: () => dispatch(deleteProduct(product.id)),
          },
        ]
      );
    },
    [dispatch]
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <MyProductCard
        item={item}
        onPress={() => goToProductDetail(item)}
        onEdit={() => goToEditProduct(item)}
        onDelete={() => handleDelete(item)}
      />
    ),
    [goToProductDetail, goToEditProduct, handleDelete]
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
        <Text style={{ color: colors.error, paddingHorizontal: spacing.md }}>{error}</Text>
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
