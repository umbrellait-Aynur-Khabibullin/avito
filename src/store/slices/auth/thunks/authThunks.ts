import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../../api/authApi';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.login(credentials);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    credentials: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.register(credentials);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const resetPasswordRequest = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (email: string, { rejectWithValue }) => {
    try {
      return await authApi.resetPasswordRequest({ email });
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
