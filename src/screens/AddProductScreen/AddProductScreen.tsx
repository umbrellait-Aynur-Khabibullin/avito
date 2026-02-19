import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './AddProductScreen.styles';
import type { AddProductScreenProps } from './AddProductScreen.types';
import { addProduct, updateProduct } from '../../store/slices/product/productSlice';
import { getProfile } from '../../store/slices/profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../common/theme';

const MAX_PHOTOS = 3;

export function AddProductScreen({
  navigation,
  route,
}: AddProductScreenProps): React.JSX.Element {
  const productToEdit = route.params?.product;
  const isEditMode = !!productToEdit;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.profile.profile);
  const { addLoading, error } = useAppSelector((state) => state.product);

  const [title, setTitle] = useState(productToEdit?.title ?? '');
  const [description, setDescription] = useState(productToEdit?.description ?? '');
  const [priceText, setPriceText] = useState(
    productToEdit ? String(productToEdit.price) : ''
  );
  const [imageUris, setImageUris] = useState<string[]>(
    productToEdit?.imageUrls ?? []
  );

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setPriceText(String(productToEdit.price));
      setImageUris(productToEdit.imageUrls ?? []);
    }
  }, [productToEdit?.id]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getProfile({ userId: user.id, email: user.email, name: user.name }));
    }
  }, [dispatch, user?.id, user?.email, user?.name]);

  const pickImages = useCallback(() => {
    const remaining = MAX_PHOTOS - imageUris.length;
    if (remaining <= 0) return;
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: remaining,
      },
      (response) => {
        if (response.didCancel || !response.assets?.length) return;
        const uris = response.assets
          .map((a) => a.uri)
          .filter((u): u is string => !!u);
        setImageUris((prev) => [...prev, ...uris].slice(0, MAX_PHOTOS));
      }
    );
  }, [imageUris.length]);

  const removeImage = useCallback((index: number) => {
    setImageUris((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async () => {
    const price = Number(priceText.replace(/\s/g, ''));
    if (!title.trim() || !description.trim() || Number.isNaN(price) || price <= 0) {
      return;
    }
    if (isEditMode && productToEdit) {
      const result = await dispatch(
        updateProduct({
          id: productToEdit.id,
          payload: {
            title: title.trim(),
            description: description.trim(),
            price,
            imageUrls: imageUris.length > 0 ? imageUris : undefined,
          },
        })
      );
      if (updateProduct.fulfilled.match(result)) {
        navigation.goBack();
      }
    } else if (user?.id) {
      const result = await dispatch(
        addProduct({
          title: title.trim(),
          description: description.trim(),
          price,
          sellerId: user.id,
          sellerName: user.name ?? user.email,
          sellerRating: profile?.rating,
          imageUrls: imageUris.length > 0 ? imageUris : undefined,
        })
      );
      if (addProduct.fulfilled.match(result)) {
        navigation.goBack();
      }
    }
  }, [
    dispatch,
    navigation,
    user,
    profile?.rating,
    title,
    description,
    priceText,
    imageUris,
    isEditMode,
    productToEdit,
  ]);

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    priceText.trim().length > 0 &&
    !Number.isNaN(Number(priceText.replace(/\s/g, ''))) &&
    Number(priceText.replace(/\s/g, '')) > 0 &&
    !addLoading &&
    (isEditMode || !!user);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {isEditMode ? 'Редактировать товар' : 'Новый товар'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditMode
            ? 'Измените данные о товаре'
            : 'Заполните данные о товаре'}
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.sectionLabel}>Фото (до {MAX_PHOTOS})</Text>
        <View style={styles.photosRow}>
          {imageUris.map((uri, index) => (
            <View key={uri + index} style={styles.photoPreviewWrapper}>
              <Image source={{ uri }} style={styles.photoPreview} resizeMode="cover" />
              <Pressable
                style={styles.photoRemoveBtn}
                onPress={() => removeImage(index)}
                hitSlop={8}
              >
                <Text style={styles.photoRemoveText}>×</Text>
              </Pressable>
            </View>
          ))}
          {imageUris.length < MAX_PHOTOS ? (
            <Pressable
              style={styles.photoAddBtn}
              onPress={pickImages}
              disabled={addLoading}
            >
              <Text style={styles.photoAddText}>+</Text>
              <Text style={styles.photoAddHint}>Добавить</Text>
            </Pressable>
          ) : null}
        </View>

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
            <Text style={styles.buttonText}>
              {isEditMode ? 'Сохранить изменения' : 'Добавить товар'}
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
