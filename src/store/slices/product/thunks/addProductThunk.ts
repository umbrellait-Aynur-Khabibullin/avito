import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProductRequest } from '../../../../api/product';
import type { AddProductPayload } from '../../../../types/product.types';

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (payload: AddProductPayload, { rejectWithValue }) => {
    try {
      return await addProductRequest(payload);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
