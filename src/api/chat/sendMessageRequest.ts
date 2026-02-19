import type { Message } from '../../types/chat.types';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type SendMessagePayload = {
  chatId: string;
  text: string;
  senderId: string;
  imageUri?: string;
};

export function sendMessageRequest(
  payload: SendMessagePayload
): Promise<Message> {
  const message: Message = {
    id: `msg-${Date.now()}`,
    chatId: payload.chatId,
    senderId: payload.senderId,
    text: payload.text,
    createdAt: new Date().toISOString(),
    isOwn: true,
    imageUrl: payload.imageUri,
  };
  return delay(150, message);
}
