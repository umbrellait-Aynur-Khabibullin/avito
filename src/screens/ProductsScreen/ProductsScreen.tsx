import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { styles } from './ProductsScreen.styles';
import type { ProductsScreenProps } from './ProductsScreen.types';
import type { Product } from '../../types/product.types';
import type { ProductSortBy } from '../../store/slices/product/productSlice';
import {
  getProducts,
  setProductSort,
} from '../../store/slices/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../common/theme';

const MIN_RATING_OPTIONS = [1, 2, 3, 4, 5] as const;

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
  const imageUrl =
    item.imageUrls?.[0] ?? item.imageUrl;

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

const SORT_OPTIONS: { key: ProductSortBy; label: string }[] = [
  { key: 'price', label: 'По цене' },
  { key: 'sellerRating', label: 'По рейтингу продавца' },
];

function sortProducts(items: Product[], sortBy: ProductSortBy): Product[] {
  const copy = [...items];
  copy.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'sellerRating': {
        const ra = a.sellerRating ?? 0;
        const rb = b.sellerRating ?? 0;
        return rb - ra;
      }
      default:
        return 0;
    }
  });
  return copy;
}

type FilterState = {
  priceFrom: string;
  priceTo: string;
  nameSearch: string;
  minSellerRating: number | null;
};

function applyFilters(
  items: Product[],
  filters: FilterState
): Product[] {
  return items.filter((item) => {
    const priceFromNum = filters.priceFrom.trim()
      ? Number(filters.priceFrom.replace(/\s/g, ''))
      : null;
    const priceToNum = filters.priceTo.trim()
      ? Number(filters.priceTo.replace(/\s/g, ''))
      : null;
    if (priceFromNum != null && item.price < priceFromNum) return false;
    if (priceToNum != null && item.price > priceToNum) return false;
    const search = filters.nameSearch.trim().toLowerCase();
    if (search && !item.title.toLowerCase().includes(search)) return false;
    const minRating = filters.minSellerRating;
    if (minRating != null) {
      const rating = item.sellerRating ?? 0;
      if (rating < minRating) return false;
    }
    return true;
  });
}

const initialFilters: FilterState = {
  priceFrom: '',
  priceTo: '',
  nameSearch: '',
  minSellerRating: null,
};

export function ProductsScreen({ navigation }: ProductsScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, sortBy } = useAppSelector(
    (state) => state.product
  );
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [sortExpanded, setSortExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const sortedItems = useMemo(
    () => sortProducts(items, sortBy),
    [items, sortBy]
  );
  const filteredItems = useMemo(
    () => applyFilters(sortedItems, filters),
    [sortedItems, filters]
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const setSort = useCallback(
    (key: ProductSortBy) => () => dispatch(setProductSort(key)),
    [dispatch]
  );

  const setFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);
  const toggleFiltersExpanded = useCallback(() => {
    setFiltersExpanded((prev) => !prev);
  }, []);
  const toggleSortExpanded = useCallback(() => {
    setSortExpanded((prev) => !prev);
  }, []);
  const selectMinRating = useCallback(
    (rating: number) => () => {
      setFilters((prev) => ({
        ...prev,
        minSellerRating: prev.minSellerRating === rating ? null : rating,
      }));
    },
    []
  );

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
      <Pressable
        style={styles.filterHeader}
        onPress={toggleFiltersExpanded}
      >
        <Text style={styles.filterHeaderText}>Фильтры</Text>
        <Text style={styles.filterHeaderChevron}>
          {filtersExpanded ? '▼' : '▶'}
        </Text>
      </Pressable>
      {filtersExpanded ? (
        <View style={styles.filterPanel}>
          <Text style={styles.filterLabel}>Цена (от — до), ₽</Text>
          <View style={styles.filterRow}>
            <TextInput
              style={styles.filterInput}
              placeholder="От"
              placeholderTextColor={colors.textSecondary}
              value={filters.priceFrom}
              onChangeText={(v) => setFilter('priceFrom', v)}
              keyboardType="numeric"
            />
            <Text style={styles.filterSeparator}>—</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="До"
              placeholderTextColor={colors.textSecondary}
              value={filters.priceTo}
              onChangeText={(v) => setFilter('priceTo', v)}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.filterLabel}>Название</Text>
          <TextInput
            style={styles.filterInputFull}
            placeholder="Введите название товара"
            placeholderTextColor={colors.textSecondary}
            value={filters.nameSearch}
            onChangeText={(v) => setFilter('nameSearch', v)}
          />
          <Text style={styles.filterLabel}>
            Минимальный рейтинг продавца:
          </Text>
          <View style={styles.ratingOptionsRow}>
            {MIN_RATING_OPTIONS.map((r) => (
              <Pressable
                key={r}
                style={[
                  styles.ratingOptionChip,
                  filters.minSellerRating === r && styles.ratingOptionChipActive,
                ]}
                onPress={selectMinRating(r)}
              >
                <Text
                  style={[
                    styles.ratingOptionText,
                    filters.minSellerRating === r &&
                      styles.ratingOptionTextActive,
                  ]}
                >
                  {r}.0
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}
      <Pressable
        style={styles.filterHeader}
        onPress={toggleSortExpanded}
      >
        <Text style={styles.filterHeaderText}>Сортировка</Text>
        <Text style={styles.filterHeaderChevron}>
          {sortExpanded ? '▼' : '▶'}
        </Text>
      </Pressable>
      {sortExpanded ? (
        <View style={styles.sortPanel}>
          {SORT_OPTIONS.map(({ key, label }) => (
            <Pressable
              key={key}
              style={[
                styles.sortOptionRow,
                sortBy === key && styles.sortOptionRowActive,
              ]}
              onPress={setSort(key)}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === key && styles.sortOptionTextActive,
                ]}
              >
                {label}
              </Text>
              {sortBy === key ? (
                <Text style={styles.sortOptionCheck}>✓</Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      ) : null}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          filteredItems.length === 0 && { flexGrow: 1 },
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {items.length === 0
              ? 'Пока нет товаров. Добавьте первый!'
              : 'Нет товаров по выбранным фильтрам'}
          </Text>
        }
      />
    </View>
  );
}
