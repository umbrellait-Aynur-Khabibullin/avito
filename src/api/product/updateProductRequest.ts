import type { Product, UpdateProductPayload } from '../../types/product.types';
import { PRODUCT_CONST } from '../../constants/product.const';
import { getMockProductsStore } from './getProductsRequest';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function updateProductRequest(
  id: string,
  payload: UpdateProductPayload
): Promise<Product> {
  const store = getMockProductsStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Товар не найден'));
  }
  const existing = store[index];
  const updated: Product = {
    ...existing,
    ...payload,
    id: existing.id,
    sellerId: existing.sellerId,
    createdAt: existing.createdAt,
  };
  store[index] = updated;
  return delay(PRODUCT_CONST.MOCK_DELAY_MS, updated);
}
