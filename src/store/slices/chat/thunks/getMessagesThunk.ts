import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message } from '../../../../types/chat.types';
import { getMessagesRequest } from '../../../../api/chat';

export const getMessages = createAsyncThunk<
  Message[],
  { chatId: string }
>(
  'chat/getMessages',
  async ({ chatId }, { rejectWithValue }) => {
    try {
      return await getMessagesRequest(chatId);
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : 'Ошибка загрузки сообщений'
      );
    }
  }
);
