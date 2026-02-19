import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteProductRequest } from '../../../../api/product';

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProductRequest(id);
      return id;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
