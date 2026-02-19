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
import { styles } from './RegistrationScreen.styles';
import type { RegistrationScreenProps } from './RegistrationScreen.types';
import { register, clearError } from '../../store/slices/auth/authSlice';
import { colors } from '../../common/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function RegistrationScreen({
  navigation,
}: RegistrationScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = useCallback(() => {
    if (!name.trim() || !email.trim() || !password) return;
    dispatch(clearError());
    dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password,
      })
    );
  }, [dispatch, name, email, password]);

  const goToLogin = useCallback(() => {
    dispatch(clearError());
    navigation.goBack();
  }, [dispatch, navigation]);

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    !isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.subtitle}>Создайте аккаунт</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Имя"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        editable={!isLoading}
      />
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
        onPress={handleRegister}
        disabled={!canSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        )}
      </Pressable>

      <View style={styles.linkRow}>
        <Pressable onPress={goToLogin} style={styles.link}>
          <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
