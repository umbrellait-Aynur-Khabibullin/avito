import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerRequest } from '../../../../api/auth';

export const register = createAsyncThunk(
  'auth/register',
  async (
    credentials: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      return await registerRequest(credentials);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
