import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { styles } from './ChatListItem.styles';
import type { ChatListItemProps } from './ChatListItem.types';
import { getProductImageSource } from '../../assets/images/products';

function formatTime(iso?: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return d.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return d.toLocaleDateString('ru-RU', { weekday: 'short' });
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

function getInitials(name?: string, id?: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  if (id?.[0]) return id[0].toUpperCase();
  return '?';
}

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function ChatListItem({
  item,
  onPress,
}: ChatListItemProps): React.JSX.Element {
  const initials = getInitials(item.sellerName, item.sellerId);
  const localImage = getProductImageSource(item.productId);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {localImage ? (
        <Image
          source={localImage}
          style={[styles.avatar, { overflow: 'hidden' }]}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.sellerName} numberOfLines={1}>
            {item.sellerName}
          </Text>
          <View style={styles.rightSection}>
            {item.lastMessageAt ? (
              <Text style={styles.time}>{formatTime(item.lastMessageAt)}</Text>
            ) : null}
            {item.unreadCount > 0 ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>
                  {item.unreadCount > 99 ? '99+' : item.unreadCount}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.productTitle} · {formatPrice(item.productPrice)}
        </Text>
        {item.lastMessage ? (
          <Text style={styles.lastMessage} numberOfLines={2}>
            {item.lastMessage}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
