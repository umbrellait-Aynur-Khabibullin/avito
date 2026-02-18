import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { styles } from './AddProductScreen.styles';
import type { AddProductScreenProps } from './AddProductScreen.types';
import { addProduct } from '../../store/slices/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../common/theme';

export function AddProductScreen({
  navigation,
}: AddProductScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { addLoading, error } = useAppSelector((state) => state.product);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceText, setPriceText] = useState('');

  const handleSubmit = useCallback(async () => {
    const price = Number(priceText.replace(/\s/g, ''));
    if (!user?.id || !title.trim() || !description.trim() || Number.isNaN(price) || price <= 0) {
      return;
    }
    const result = await dispatch(
      addProduct({
        title: title.trim(),
        description: description.trim(),
        price,
        sellerId: user.id,
        sellerName: user.name ?? user.email,
      })
    );
    if (addProduct.fulfilled.match(result)) {
      navigation.goBack();
    }
  }, [dispatch, navigation, user, title, description, priceText]);

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    priceText.trim().length > 0 &&
    !Number.isNaN(Number(priceText.replace(/\s/g, ''))) &&
    Number(priceText.replace(/\s/g, '')) > 0 &&
    !addLoading &&
    !!user;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Новый товар</Text>
        <Text style={styles.subtitle}>
          Заполните данные о товаре
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Название"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          editable={!addLoading}
        />
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Описание"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          editable={!addLoading}
        />
        <TextInput
          style={styles.input}
          placeholder="Цена (₽)"
          placeholderTextColor={colors.textSecondary}
          value={priceText}
          onChangeText={setPriceText}
          keyboardType="numeric"
          editable={!addLoading}
        />

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {addLoading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.buttonText}>Добавить товар</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
