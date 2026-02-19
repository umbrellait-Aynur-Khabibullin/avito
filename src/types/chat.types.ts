import type { Product } from './product.types';

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  isOwn: boolean;
  imageUrl?: string;
};

export type Chat = {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImageUrl?: string;
  sellerId: string;
  sellerName: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  messages: Message[];
};

export type ChatPreview = Omit<Chat, 'messages'>;
