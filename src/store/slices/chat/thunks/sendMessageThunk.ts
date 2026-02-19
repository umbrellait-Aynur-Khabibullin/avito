import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message } from '../../../../types/chat.types';
import { sendMessageRequest, type SendMessagePayload } from '../../../../api/chat';

export const sendMessage = createAsyncThunk<
  Message,
  SendMessagePayload
>(
  'chat/sendMessage',
  async (payload, { rejectWithValue }) => {
    try {
      return await sendMessageRequest(payload);
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : 'Ошибка отправки сообщения'
      );
    }
  }
);
