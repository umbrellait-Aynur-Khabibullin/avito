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
import { styles } from './PasswordResetScreen.styles';
import type { PasswordResetScreenProps } from './PasswordResetScreen.types';
import {
  resetPasswordRequest,
  clearError,
  clearResetPasswordMessage,
} from '../../store/slices/auth/authSlice';
import { colors } from '../../common/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function PasswordResetScreen({
  navigation,
}: PasswordResetScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, error, resetPasswordMessage } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');

  const handleReset = useCallback(() => {
    if (!email.trim()) return;
    dispatch(clearError());
    dispatch(clearResetPasswordMessage());
    dispatch(resetPasswordRequest(email.trim()));
  }, [dispatch, email]);

  const goToLogin = useCallback(() => {
    dispatch(clearError());
    dispatch(clearResetPasswordMessage());
    navigation.goBack();
  }, [dispatch, navigation]);

  const canSubmit = email.trim().length > 0 && !isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Сброс пароля</Text>
      <Text style={styles.subtitle}>
        Введите email — мы отправим инструкции для восстановления
      </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {resetPasswordMessage ? (
        <Text style={styles.successText}>{resetPasswordMessage}</Text>
      ) : null}

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

      <Pressable
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleReset}
        disabled={!canSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Отправить</Text>
        )}
      </Pressable>

      <View style={styles.linkRow}>
        <Pressable onPress={goToLogin} style={styles.link}>
          <Text style={styles.linkText}>Вернуться к входу</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
