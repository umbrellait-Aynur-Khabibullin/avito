import type { Product, AddProductPayload } from '../../types/product.types';
import { PRODUCT_CONST } from '../../constants/product.const';
import { getMockProductsStore } from './getProductsRequest';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function addProductRequest(payload: AddProductPayload): Promise<Product> {
  const product: Product = {
    id: `product-${Date.now()}`,
    title: payload.title,
    description: payload.description,
    price: payload.price,
    sellerId: payload.sellerId,
    sellerName: payload.sellerName,
    createdAt: new Date().toISOString(),
  };
  getMockProductsStore().push(product);
  return delay(PRODUCT_CONST.MOCK_DELAY_MS, product);
}
