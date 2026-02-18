import { createSlice } from '@reduxjs/toolkit';
import type { Profile } from '../../../types/profile.types';
import { getProfile } from './thunks/getProfileThunk';
import { logout } from '../auth/authSlice';

export { getProfile } from './thunks/getProfileThunk';

export type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки профиля';
      })
      .addCase(logout, (state) => {
        state.profile = null;
        state.error = null;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
