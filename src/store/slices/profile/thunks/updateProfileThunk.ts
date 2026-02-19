import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../../index';
import type { Profile } from '../../../../types/profile.types';
import {
  updateProfileRequest,
  type UpdateProfileParams,
} from '../../../../api/profile';

export const updateProfile = createAsyncThunk<
  Profile,
  UpdateProfileParams,
  { state: RootState }
>(
  'profile/updateProfile',
  async (params, { getState, rejectWithValue }) => {
    try {
      const currentProfile = getState().profile.profile;
      return await updateProfileRequest(params, currentProfile);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
