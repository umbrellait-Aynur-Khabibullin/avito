import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../../types/auth.types';
import {
  login,
  register,
  resetPasswordRequest,
} from './thunks';

export { login, register, resetPasswordRequest } from './thunks';

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  resetPasswordMessage: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  resetPasswordMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.resetPasswordMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResetPasswordMessage: (state) => {
      state.resetPasswordMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка входа';
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка регистрации';
      })
      .addCase(resetPasswordRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetPasswordMessage = null;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordMessage = action.payload.message;
        state.error = null;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка сброса пароля';
      });
  },
});

export const { logout, clearError, clearResetPasswordMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;
