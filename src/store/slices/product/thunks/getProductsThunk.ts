import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsRequest } from '../../../../api/product';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProductsRequest();
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
