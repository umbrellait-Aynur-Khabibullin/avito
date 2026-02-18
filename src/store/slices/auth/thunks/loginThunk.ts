import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../../../../api/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await loginRequest(credentials);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
