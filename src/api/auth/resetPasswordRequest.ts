import type { ResetPasswordRequest } from '../../types/auth.types';
import { AUTH_CONST } from '../../constants/auth.const';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function resetPasswordRequestApi(
  payload: ResetPasswordRequest
): Promise<{ success: boolean; message: string }> {
  return delay(AUTH_CONST.MOCK_DELAY_MS, {
    success: true,
    message: `Инструкции по сбросу пароля отправлены на ${payload.email}`,
  });
}
