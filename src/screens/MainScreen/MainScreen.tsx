import React, { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './MainScreen.styles';
import type { MainScreenProps } from './MainScreen.types';
import { useAppSelector } from '../../store/hooks';

export function MainScreen({ navigation }: MainScreenProps): React.JSX.Element {
  const user = useAppSelector((state) => state.auth.user);

  const goToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const goToProducts = useCallback(() => {
    navigation.navigate('Products');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Text style={styles.subtitle}>
        {user ? `Добро пожаловать, ${user.name ?? user.email}` : 'Добро пожаловать в Avito'}
      </Text>
      {user ? (
        <View style={styles.buttonsRow}>
          <Pressable style={styles.profileButton} onPress={goToProducts}>
            <Text style={styles.profileButtonText}>Товары</Text>
          </Pressable>
          <Pressable style={styles.profileButton} onPress={goToProfile}>
            <Text style={styles.profileButtonText}>Профиль</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
