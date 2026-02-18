import type { Product } from '../../types/product.types';
import { PRODUCT_CONST } from '../../constants/product.const';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const mockProductsStore: Product[] = [
    {
      id: 'product-1',
      title: 'iPhone 14',
      description: 'Смартфон в отличном состоянии',
      price: 65000,
      sellerId: '1',
      sellerName: 'Тестовый Пользователь',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'product-2',
      title: 'Велосипед Trek',
      description: 'Горный велосипед, год выпуска 2022',
      price: 35000,
      sellerId: '1',
      sellerName: 'Тестовый Пользователь',
      createdAt: '2024-01-16T12:00:00Z',
    },
  ];

export function getProductsRequest(): Promise<Product[]> {
  return delay(PRODUCT_CONST.MOCK_DELAY_MS, [...mockProductsStore]);
}

export function getMockProductsStore(): Product[] {
  return mockProductsStore;
}
