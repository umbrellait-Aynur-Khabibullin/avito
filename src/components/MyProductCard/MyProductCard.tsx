import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { styles } from './MyProductCard.styles';
import type { MyProductCardProps } from './MyProductCard.types';
import { getProductImageSource } from '../../assets/images/products';

const EDIT_ICON_URI = 'https://img.icons8.com/?id=49&format=png&size=24';
const DELETE_ICON_URI = 'https://img.icons8.com/?id=1942&format=png&size=24';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function MyProductCard({
  item,
  onPress,
  onEdit,
  onDelete,
}: MyProductCardProps): React.JSX.Element {
  const localImage = getProductImageSource(item.id);
  const imageUri = item.imageUrls?.[0] ?? item.imageUrl;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {localImage ? (
        <Image source={localImage} style={styles.cardImage} resizeMode="cover" />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.cardImage} resizeMode="cover" />
      ) : null}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
          <View style={styles.actionsRow}>
            <Pressable
              style={styles.actionBtn}
              onPress={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              hitSlop={8}
            >
              <Image
                source={{ uri: EDIT_ICON_URI }}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={styles.actionBtn}
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              hitSlop={8}
            >
              <Image
                source={{ uri: DELETE_ICON_URI }}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
