import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import { styles } from './ProductDetailScreen.styles';
import type { ProductDetailScreenProps } from './ProductDetailScreen.types';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function getInitials(sellerName?: string, sellerId?: string): string {
  if (sellerName?.trim()) {
    const parts = sellerName.trim().split(/\s+/);
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  if (sellerId?.[0]) return sellerId[0].toUpperCase();
  return '?';
}

export function ProductDetailScreen({
  route,
}: ProductDetailScreenProps): React.JSX.Element {
  const { product } = route.params;
  const initials = getInitials(product.sellerName, product.sellerId);
  const { width } = useWindowDimensions();
  const contentWidth = width - 32;
  const imageUrls = product.imageUrls ?? (product.imageUrl ? [product.imageUrl] : []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleMessage = () => {
    // TODO: переход в сообщения с этим продавцом
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
      const idx = viewableItems[0]?.index ?? 0;
      setActiveIndex(idx);
    },
    []
  );

  const renderImage: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <View style={[styles.sliderItem, { width: contentWidth }]}>
        <Image
          source={{ uri: item }}
          style={[styles.sliderImage, { width: contentWidth }]}
          resizeMode="cover"
        />
      </View>
    ),
    [contentWidth]
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {imageUrls.length > 0 ? (
        <View style={styles.imageSlider}>
          <FlatList
            data={imageUrls}
            renderItem={renderImage}
            keyExtractor={(uri, i) => uri + i}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
          {imageUrls.length > 1 ? (
            <View style={styles.sliderDots}>
              {imageUrls.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.sliderDot,
                    i === activeIndex && styles.sliderDotActive,
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <Text style={styles.sectionLabel}>Описание</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionLabel}>Продавец</Text>
      <View style={styles.sellerBlock}>
        <View style={styles.sellerRow}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.sellerAvatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sellerName}>
              {product.sellerName ?? `Пользователь ${product.sellerId}`}
            </Text>
            <Text style={styles.sellerId}>ID: {product.sellerId}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>
          Опубликовано {formatDate(product.createdAt)}
        </Text>
        <Pressable style={styles.messageButton} onPress={handleMessage}>
          <Text style={styles.messageButtonText}>Написать продавцу</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
