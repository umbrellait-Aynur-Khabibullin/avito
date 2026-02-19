import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../../types/product.types';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from './thunks';

export {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from './thunks';

export type ProductSortBy = 'price' | 'sellerRating';

export type ProductState = {
  items: Product[];
  sortBy: ProductSortBy;
  isLoading: boolean;
  addLoading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  sortBy: 'price',
  isLoading: false,
  addLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setProductSort: (state, action: { payload: ProductSortBy }) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки товаров';
      })
      .addCase(addProduct.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addLoading = false;
        state.items.unshift(action.payload);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка добавления товара';
      })
      .addCase(updateProduct.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.addLoading = false;
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.addLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка обновления товара';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearProductError, setProductSort } = productSlice.actions;
export const productReducer = productSlice.reducer;
