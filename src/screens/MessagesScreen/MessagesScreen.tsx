import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { getDialogs } from '../../store/slices/chat/chatSlice';
import type { ChatPreview } from '../../types/chat.types';
import { ChatListItem } from '../../components/ChatListItem';
import { styles } from './MessagesScreen.styles';
import type { MessagesScreenProps } from './MessagesScreen.types';

export function MessagesScreen({
  navigation,
}: MessagesScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const dialogs = useAppSelector((s: RootState) => s.chat.dialogs);
  const isLoading = useAppSelector((s: RootState) => s.chat.isLoading);

  const loadDialogs = useCallback(() => {
    dispatch(getDialogs());
  }, [dispatch]);

  useEffect(() => {
    loadDialogs();
  }, [loadDialogs]);

  const handleChatPress = useCallback(
    (item: ChatPreview) => {
      navigation.navigate('Chat', { chatId: item.id });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<ChatPreview> = useCallback(
    ({ item }) => (
      <ChatListItem item={item} onPress={() => handleChatPress(item)} />
    ),
    [handleChatPress]
  );

  const keyExtractor = useCallback((item: ChatPreview) => item.id, []);

  if (isLoading && dialogs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06B6D4" />
        <Text style={styles.loadingText}>Загрузка сообщений...</Text>
      </View>
    );
  }

  if (dialogs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholderText}>
          Нет сообщений. Нажмите «Написать продавцу» на странице товара, чтобы начать диалог.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={dialogs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadDialogs}
          tintColor="#06B6D4"
        />
      }
    />
  );
}
