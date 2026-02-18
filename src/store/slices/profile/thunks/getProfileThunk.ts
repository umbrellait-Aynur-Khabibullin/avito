import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileRequest, type GetProfileParams } from '../../../../api/profile';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (params: GetProfileParams, { rejectWithValue }) => {
    try {
      return await getProfileRequest(params);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
