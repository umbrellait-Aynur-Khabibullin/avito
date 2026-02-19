import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProductRequest } from '../../../../api/product';
import type { UpdateProductPayload } from '../../../../types/product.types';

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (
    { id, payload }: { id: string; payload: UpdateProductPayload },
    { rejectWithValue }
  ) => {
    try {
      return await updateProductRequest(id, payload);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
