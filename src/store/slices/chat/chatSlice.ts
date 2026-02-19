import { createSlice } from '@reduxjs/toolkit';
import type { ChatPreview, Message } from '../../../types/chat.types';
import type { Product } from '../../../types/product.types';
import {
  getDialogs,
  getMessages,
  sendMessage,
} from './thunks';

export { getDialogs, getMessages, sendMessage } from './thunks';

export type ChatState = {
  dialogs: ChatPreview[];
  messagesByChatId: Record<string, Message[]>;
  isLoading: boolean;
  messagesLoading: Record<string, boolean>;
  sendLoading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  dialogs: [],
  messagesByChatId: {},
  isLoading: false,
  messagesLoading: {},
  sendLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatError: (state) => {
      state.error = null;
    },
    clearMessages: (state, action: { payload: string }) => {
      delete state.messagesByChatId[action.payload];
    },
    ensureDialogForProduct: (state, action: { payload: Product }) => {
      const product = action.payload;
      const exists = state.dialogs.some((d) => d.productId === product.id);
      if (!exists) {
        const mockChatIdByProduct: Record<string, string> = {
          'product-1': 'chat-1',
          'product-3': 'chat-2',
          'product-4': 'chat-3',
        };
        const chatId =
          mockChatIdByProduct[product.id] ?? `chat-product-${product.id}`;
        const preview: ChatPreview = {
          id: chatId,
          productId: product.id,
          productTitle: product.title,
          productPrice: product.price,
          productImageUrl: product.imageUrls?.[0] ?? product.imageUrl,
          sellerId: product.sellerId,
          sellerName: product.sellerName ?? `Пользователь ${product.sellerId}`,
          lastMessage: undefined,
          lastMessageAt: undefined,
          unreadCount: 0,
        };
        state.dialogs.unshift(preview);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDialogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDialogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dialogs = action.payload;
        state.error = null;
      })
      .addCase(getDialogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки диалогов';
      })
      .addCase(getMessages.pending, (state, action) => {
        const { chatId } = action.meta.arg;
        state.messagesLoading[chatId] = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const chatId = action.meta.arg.chatId;
        state.messagesLoading[chatId] = false;
        state.messagesByChatId[chatId] = action.payload;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        const chatId = action.meta.arg.chatId;
        state.messagesLoading[chatId] = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки сообщений';
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendLoading = false;
        const msg = action.payload;
        if (!state.messagesByChatId[msg.chatId]) {
          state.messagesByChatId[msg.chatId] = [];
        }
        state.messagesByChatId[msg.chatId].push(msg);
        const dialog = state.dialogs.find((d) => d.id === msg.chatId);
        if (dialog) {
          dialog.lastMessage = msg.imageUrl
            ? (msg.text ? `🖼 ${msg.text}` : '🖼 Фото')
            : msg.text;
          dialog.lastMessageAt = msg.createdAt;
        }
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка отправки сообщения';
      });
  },
});

export const { clearChatError, clearMessages, ensureDialogForProduct } =
  chatSlice.actions;
export const chatReducer = chatSlice.reducer;
