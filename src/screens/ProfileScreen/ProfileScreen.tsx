import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { styles } from './ProfileScreen.styles';
import type { ProfileScreenProps } from './ProfileScreen.types';
import { getProfile } from '../../store/slices/profile/profileSlice';
import { logout } from '../../store/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../common/theme';

function getInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  if (email && email[0]) return email[0].toUpperCase();
  return '?';
}

export function ProfileScreen(_props: ProfileScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getProfile({ userId: user.id, email: user.email, name: user.name }));
    }
  }, [dispatch, user?.id, user?.email, user?.name]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (isLoading && !profile) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const displayProfile = profile ?? (user ? { id: user.id, email: user.email, name: user.name } : null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getInitials(displayProfile?.name, displayProfile?.email)}
        </Text>
      </View>
      <Text style={styles.title}>
        {displayProfile?.name ?? displayProfile?.email ?? 'Профиль'}
      </Text>
      <Text style={styles.subtitle}>
        {displayProfile?.email ?? ''}
      </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {displayProfile?.phone ? (
        <View style={styles.row}>
          <Text style={styles.label}>Телефон</Text>
          <Text style={styles.value}>{displayProfile.phone}</Text>
        </View>
      ) : null}

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Выйти</Text>
      </Pressable>
    </ScrollView>
  );
}
