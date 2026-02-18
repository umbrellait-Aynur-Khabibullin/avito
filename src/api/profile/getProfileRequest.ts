import type { Profile } from '../../types/profile.types';
import { AUTH_CONST } from '../../constants/auth.const';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type GetProfileParams = {
  userId: string;
  email?: string;
  name?: string;
};

export function getProfileRequest(params: GetProfileParams): Promise<Profile> {
  const { userId, email = 'user@example.com', name = 'Тестовый Пользователь' } = params;
  return delay(AUTH_CONST.MOCK_DELAY_MS, {
    id: userId,
    email,
    name,
    phone: '+7 (999) 123-45-67',
    avatarUrl: undefined,
    createdAt: '2024-01-01T00:00:00Z',
  });
}
