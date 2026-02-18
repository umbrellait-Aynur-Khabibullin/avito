import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './MainScreen.styles';
import type { MainScreenProps } from './MainScreen.types';
import { logout } from '../../store/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function MainScreen(_props: MainScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Text style={styles.subtitle}>
        {user ? `Добро пожаловать, ${user.name ?? user.email}` : 'Добро пожаловать в Avito'}
      </Text>
      {user ? (
        <Pressable
          style={styles.logoutButton}
          onPress={() => dispatch(logout())}
        >
          <Text style={styles.logoutButtonText}>Выйти</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
