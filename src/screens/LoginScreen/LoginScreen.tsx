import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { styles } from './LoginScreen.styles';
import type { LoginScreenProps } from './LoginScreen.types';
import { login, clearError } from '../../store/slices/auth/authSlice';
import { colors } from '../../common/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function LoginScreen({ navigation }: LoginScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    if (!email.trim() || !password) return;
    dispatch(clearError());
    dispatch(login({ email: email.trim(), password }));
  }, [dispatch, email, password]);

  const goToRegistration = useCallback(() => {
    dispatch(clearError());
    navigation.navigate('Registration');
  }, [dispatch, navigation]);

  const goToPasswordReset = useCallback(() => {
    dispatch(clearError());
    navigation.navigate('PasswordReset');
  }, [dispatch, navigation]);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Вход</Text>
      <Text style={styles.subtitle}>Введите email и пароль</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <Pressable
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!canSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={styles.buttonText}>Войти</Text>
        )}
      </Pressable>

      <View style={styles.linkRow}>
        <Pressable onPress={goToRegistration} style={styles.link}>
          <Text style={styles.linkText}>Регистрация</Text>
        </Pressable>
        <Pressable onPress={goToPasswordReset} style={styles.link}>
          <Text style={styles.linkText}>Забыли пароль?</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
