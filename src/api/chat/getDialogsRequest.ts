import type { ChatPreview } from '../../types/chat.types';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const mockDialogs: ChatPreview[] = [
  {
    id: 'chat-1',
    productId: 'product-1',
    productTitle: 'iPhone 14',
    productPrice: 65000,
    productImageUrl: undefined,
    sellerId: '1',
    sellerName: 'Тестовый Пользователь',
    lastMessage: 'Ок, жду вас завтра в 15:00',
    lastMessageAt: '2024-02-20T14:35:00Z',
    unreadCount: 0,
  },
  {
    id: 'chat-2',
    productId: 'product-3',
    productTitle: 'Диван угловой',
    productPrice: 28000,
    productImageUrl: undefined,
    sellerId: '2',
    sellerName: 'Алексей Иванов',
    lastMessage: 'Да, ещё актуально. Можете приехать посмотреть',
    lastMessageAt: '2024-02-19T11:20:00Z',
    unreadCount: 1,
  },
  {
    id: 'chat-3',
    productId: 'product-4',
    productTitle: 'Ноутбук MacBook Air M1',
    productPrice: 75000,
    productImageUrl: undefined,
    sellerId: '3',
    sellerName: 'Мария Петрова',
    lastMessage: 'Здравствуйте! Вас интересует этот товар?',
    lastMessageAt: '2024-02-18T09:15:00Z',
    unreadCount: 0,
  },
];

export function getDialogsRequest(): Promise<ChatPreview[]> {
  return delay(300, [...mockDialogs]);
}
