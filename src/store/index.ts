import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/authSlice';
import { profileReducer } from './slices/profile/profileSlice';
import { productReducer } from './slices/product/productSlice';
import { chatReducer } from './slices/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
