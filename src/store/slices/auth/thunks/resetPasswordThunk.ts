import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordRequestApi } from '../../../../api/auth';

export const resetPasswordRequest = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (email: string, { rejectWithValue }) => {
    try {
      return await resetPasswordRequestApi({ email });
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
