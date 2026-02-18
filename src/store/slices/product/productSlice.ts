import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../../types/product.types';
import { addProduct, getProducts } from './thunks';

export { addProduct, getProducts } from './thunks';

export type ProductState = {
  items: Product[];
  isLoading: boolean;
  addLoading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  items: [],
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
      });
  },
});

export const { clearProductError } = productSlice.actions;
export const productReducer = productSlice.reducer;
