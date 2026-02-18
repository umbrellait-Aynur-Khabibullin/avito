import type { AuthResponse, RegisterCredentials } from '../../types/auth.types';
import { AUTH_CONST } from '../../constants/auth.const';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function registerRequest(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  return delay(AUTH_CONST.MOCK_DELAY_MS, {
    user: {
      id: String(Date.now()),
      email: credentials.email,
      name: credentials.name,
    },
    token: AUTH_CONST.MOCK_TOKEN,
  });
}
