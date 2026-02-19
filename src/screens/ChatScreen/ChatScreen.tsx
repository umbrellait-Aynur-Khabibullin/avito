import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import type { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getMessages, sendMessage, ensureDialogForProduct } from '../../store/slices/chat/chatSlice';
import { styles } from './ChatScreen.styles';
import type { ChatScreenProps } from './ChatScreen.types';
import type { Message } from '../../types/chat.types';
import type { Product } from '../../types/product.types';

const PLACEHOLDER_SENDER_ID = 'me';

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function ChatScreen({ route, navigation }: ChatScreenProps): React.JSX.Element {
  const params = route.params as { chatId?: string; product?: Product };
  const paramChatId = params?.chatId;
  const product = params?.product;
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const dialogs = useAppSelector((s: RootState) => s.chat.dialogs);
  const sendLoading = useAppSelector((s: RootState) => s.chat.sendLoading);

  const chatId = (() => {
    if (paramChatId) return paramChatId;
    if (product) {
      const found = dialogs.find((d) => d.productId === product.id);
      return found?.id ?? `chat-product-${product.id}`;
    }
    return null;
  })();

  const dialog = chatId ? dialogs.find((d) => d.id === chatId) : null;
  const isLoading = useAppSelector((s: RootState) =>
    chatId ? (s.chat.messagesLoading[chatId] ?? false) : false
  );
  const messages = useAppSelector(
    (s: RootState) => (chatId ? s.chat.messagesByChatId[chatId] ?? [] : [])
  );

  useEffect(() => {
    if (product) {
      dispatch(ensureDialogForProduct(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (chatId) {
      dispatch(getMessages({ chatId }));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    const sellerName = dialog?.sellerName ?? product?.sellerName ?? 'Продавец';
    const productTitle = dialog?.productTitle ?? product?.title ?? '';
    const maxTitleLen = 25;
    const abbreviatedTitle =
      productTitle.length > maxTitleLen
        ? `${productTitle.slice(0, maxTitleLen - 3)}...`
        : productTitle;
    const title = abbreviatedTitle
      ? `${sellerName} (${abbreviatedTitle})`
      : sellerName || 'Чат';
    navigation.setOptions({ title });
  }, [
    dialog?.sellerName,
    dialog?.productTitle,
    product?.sellerName,
    product?.title,
    navigation,
  ]);

  const pickImage = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel || !response.assets?.[0]?.uri) return;
        setSelectedImageUri(response.assets[0].uri);
      }
    );
  }, []);

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    const hasContent = text || selectedImageUri;
    if (!hasContent || !chatId || sendLoading) return;
    dispatch(
      sendMessage({
        chatId,
        text: text || '',
        senderId: PLACEHOLDER_SENDER_ID,
        imageUri: selectedImageUri ?? undefined,
      })
    );
    setInputText('');
    setSelectedImageUri(null);
  }, [inputText, selectedImageUri, chatId, sendLoading, dispatch]);

  const renderMessage: ListRenderItem<Message> = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.messageBubble,
          item.isOwn ? styles.messageOwn : styles.messageOther,
        ]}
      >
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        ) : null}
        {item.text ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : null}
        <Text
          style={[
            styles.messageTime,
            item.isOwn ? styles.messageTimeOwn : styles.messageTimeOther,
          ]}
        >
          {formatTime(item.createdAt)}
        </Text>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  if (!chatId) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Не удалось определить чат</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#06B6D4" />
          <Text style={styles.loadingText}>Загрузка сообщений...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.messagesList}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          inverted={false}
          contentContainerStyle={
            messages.length === 0 ? styles.emptyContainer : undefined
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Нет сообщений. Напишите первым!
            </Text>
          }
        />
      )}

      <View style={styles.inputRow}>
        <Pressable
          style={styles.attachButton}
          onPress={pickImage}
          disabled={sendLoading}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/?id=11321&format=png&size=24' }}
            style={styles.attachIcon}
          />
        </Pressable>
        {selectedImageUri ? (
          <Pressable
            onPress={() => setSelectedImageUri(null)}
            style={styles.selectedImagePreview}
          >
            <Image
              source={{ uri: selectedImageUri }}
              style={styles.selectedImagePreview}
              resizeMode="cover"
            />
          </Pressable>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Сообщение..."
          placeholderTextColor="#64748B"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
          editable={!sendLoading}
        />
        <Pressable
          style={[
            styles.sendButton,
            ((!inputText.trim() && !selectedImageUri) || sendLoading) &&
              styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={(!inputText.trim() && !selectedImageUri) || sendLoading}
        >
          {sendLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
              →
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
