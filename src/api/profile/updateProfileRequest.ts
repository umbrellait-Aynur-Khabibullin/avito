import type { Profile } from '../../types/profile.types';
import { AUTH_CONST } from '../../constants/auth.const';

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type UpdateProfileParams = {
  userId: string;
  avatarUrl?: string;
  rating?: number;
};

export function updateProfileRequest(
  params: UpdateProfileParams,
  currentProfile: Profile | null
): Promise<Profile> {
  const base = currentProfile ?? {
    id: params.userId,
    email: '',
    name: '',
  };
  return delay(AUTH_CONST.MOCK_DELAY_MS, {
    ...base,
    avatarUrl: params.avatarUrl ?? base.avatarUrl,
    rating: params.rating ?? base.rating,
  });
}
