import { PRODUCT_CONST } from '../../constants/product.const';
import { getMockProductsStore } from './getProductsRequest';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function deleteProductRequest(id: string): Promise<void> {
  const store = getMockProductsStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Товар не найден'));
  }
  store.splice(index, 1);
  return delay(PRODUCT_CONST.MOCK_DELAY_MS, undefined);
}
