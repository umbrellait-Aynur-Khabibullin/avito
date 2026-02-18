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
    sellerRating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'product-2',
    title: 'Велосипед Trek',
    description: 'Горный велосипед, год выпуска 2022',
    price: 35000,
    sellerId: '1',
    sellerName: 'Тестовый Пользователь',
    sellerRating: 4.8,
    createdAt: '2024-01-16T12:00:00Z',
  },
  {
    id: 'product-3',
    title: 'Диван угловой',
    description: 'Угловой диван, ткань серый велюр, состояние отличное',
    price: 28000,
    sellerId: '2',
    sellerName: 'Алексей Иванов',
    sellerRating: 4.5,
    createdAt: '2024-01-17T09:30:00Z',
  },
  {
    id: 'product-4',
    title: 'Ноутбук MacBook Air M1',
    description: 'MacBook Air 2020, 8/256, батарея 95%',
    price: 75000,
    sellerId: '3',
    sellerName: 'Мария Петрова',
    sellerRating: 4.9,
    createdAt: '2024-01-18T14:00:00Z',
  },
  {
    id: 'product-5',
    title: 'Детская коляска',
    description: 'Коляска-трансформер 3 в 1, тёмно-синяя',
    price: 15000,
    sellerId: '2',
    sellerName: 'Алексей Иванов',
    sellerRating: 4.5,
    createdAt: '2024-01-19T11:20:00Z',
  },
  {
    id: 'product-6',
    title: 'Шкаф купе',
    description: 'Шкаф купе 2,4 м, белый глянец, с зеркалом',
    price: 42000,
    sellerId: '4',
    sellerName: 'Дмитрий Сидоров',
    sellerRating: 4.2,
    createdAt: '2024-01-20T08:00:00Z',
  },
  {
    id: 'product-7',
    title: 'Самокат Xiaomi',
    description: 'Электросамокат, пробег 500 км, в хорошем состоянии',
    price: 22000,
    sellerId: '3',
    sellerName: 'Мария Петрова',
    sellerRating: 4.9,
    createdAt: '2024-01-21T16:45:00Z',
  },
  {
    id: 'product-8',
    title: 'Микроволновка Samsung',
    description: 'Микроволновая печь 23 л, гриль, 800 Вт',
    price: 5500,
    sellerId: '5',
    sellerName: 'Елена Козлова',
    sellerRating: 4.6,
    createdAt: '2024-01-22T12:10:00Z',
  },
  {
    id: 'product-9',
    title: 'Книжная полка',
    description: 'Полка настенная, дерево, 5 ярусов, 80 см',
    price: 3200,
    sellerId: '4',
    sellerName: 'Дмитрий Сидоров',
    sellerRating: 4.2,
    createdAt: '2024-01-23T10:00:00Z',
  },
  {
    id: 'product-10',
    title: 'Наушники Sony WH-1000XM4',
    description: 'Беспроводные наушники с шумоподавлением',
    price: 18500,
    sellerId: '5',
    sellerName: 'Елена Козлова',
    sellerRating: 4.6,
    createdAt: '2024-01-24T13:30:00Z',
  },
];

export function getProductsRequest(): Promise<Product[]> {
  return delay(PRODUCT_CONST.MOCK_DELAY_MS, [...mockProductsStore]);
}

export function getMockProductsStore(): Product[] {
  return mockProductsStore;
}
