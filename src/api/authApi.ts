import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordRequest,
  AuthResponse,
} from '../types/auth.types';

const MOCK_DELAY_MS = 800;

const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Тестовый Пользователь',
};

const mockToken = 'mock-jwt-token-12345';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const authApi = {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return delay(MOCK_DELAY_MS, {
      user: {
        ...mockUser,
        email: credentials.email,
      },
      token: mockToken,
    });
  },

  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return delay(MOCK_DELAY_MS, {
      user: {
        id: String(Date.now()),
        email: credentials.email,
        name: credentials.name,
      },
      token: mockToken,
    });
  },

  resetPasswordRequest(payload: ResetPasswordRequest): Promise<{ success: boolean; message: string }> {
    return delay(MOCK_DELAY_MS, {
      success: true,
      message: `Инструкции по сбросу пароля отправлены на ${payload.email}`,
    });
  },
};
