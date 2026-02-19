import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatPreview } from '../../../../types/chat.types';
import { getDialogsRequest } from '../../../../api/chat';

export const getDialogs = createAsyncThunk<ChatPreview[]>(
  'chat/getDialogs',
  async (_, { rejectWithValue }) => {
    try {
      return await getDialogsRequest();
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : 'Ошибка загрузки диалогов'
      );
    }
  }
);
