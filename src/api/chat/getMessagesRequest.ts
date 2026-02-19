import type { Message } from '../../types/chat.types';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const mockMessagesByChat: Record<string, Message[]> = {
  'chat-1': [
    {
      id: 'msg-1-1',
      chatId: 'chat-1',
      senderId: 'me',
      text: 'Здравствуйте! iPhone ещё продаётся?',
      createdAt: '2024-02-20T10:00:00Z',
      isOwn: true,
    },
    {
      id: 'msg-1-2',
      chatId: 'chat-1',
      senderId: '1',
      text: 'Да, ещё актуален. В отличном состоянии.',
      createdAt: '2024-02-20T10:15:00Z',
      isOwn: false,
    },
    {
      id: 'msg-1-3',
      chatId: 'chat-1',
      senderId: 'me',
      text: 'Сможете скинуть больше фото?',
      createdAt: '2024-02-20T10:20:00Z',
      isOwn: true,
    },
    {
      id: 'msg-1-4',
      chatId: 'chat-1',
      senderId: '1',
      text: 'Конечно, сейчас отправлю.',
      createdAt: '2024-02-20T10:22:00Z',
      isOwn: false,
    },
    {
      id: 'msg-1-5',
      chatId: 'chat-1',
      senderId: 'me',
      text: 'Отлично, тогда договоримся на просмотр завтра',
      createdAt: '2024-02-20T14:30:00Z',
      isOwn: true,
    },
    {
      id: 'msg-1-6',
      chatId: 'chat-1',
      senderId: '1',
      text: 'Ок, жду вас завтра в 15:00',
      createdAt: '2024-02-20T14:35:00Z',
      isOwn: false,
    },
  ],
  'chat-2': [
    {
      id: 'msg-2-1',
      chatId: 'chat-2',
      senderId: 'me',
      text: 'Диван ещё в наличии?',
      createdAt: '2024-02-19T09:00:00Z',
      isOwn: true,
    },
    {
      id: 'msg-2-2',
      chatId: 'chat-2',
      senderId: '2',
      text: 'Да, ещё актуально. Можете приехать посмотреть',
      createdAt: '2024-02-19T11:20:00Z',
      isOwn: false,
    },
  ],
  'chat-3': [
    {
      id: 'msg-3-1',
      chatId: 'chat-3',
      senderId: '3',
      text: 'Здравствуйте! Вас интересует этот товар?',
      createdAt: '2024-02-18T09:15:00Z',
      isOwn: false,
    },
  ],
};

export function getMessagesRequest(chatId: string): Promise<Message[]> {
  const messages = mockMessagesByChat[chatId] ?? [];
  return delay(200, [...messages]);
}
