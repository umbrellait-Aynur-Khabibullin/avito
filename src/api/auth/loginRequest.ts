import type { AuthResponse, LoginCredentials } from '../../types/auth.types';
import { AUTH_CONST } from '../../constants/auth.const';

const mockUser = {
  id: '1',
  email: '',
  name: 'Тестовый Пользователь',
};

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function loginRequest(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return delay(AUTH_CONST.MOCK_DELAY_MS, {
    user: {
      ...mockUser,
      email: credentials.email,
    },
    token: AUTH_CONST.MOCK_TOKEN,
  });
}
