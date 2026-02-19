/**
 * Моковые фото товаров (скачаны с picsum.photos).
 * Каждый товар имеет 1–3 фото, количество фиксировано для детерминированности.
 */
import type { ImageSourcePropType } from 'react-native';

const productPhotoKeys = [
  'iphone',
  'bicycle',
  'sofa',
  'laptop',
  'stroller',
  'wardrobe',
  'scooter',
  'microwave',
  'shelf',
  'headphones',
] as const;

/** Все фото по ключу: 3 штуки на каждый товар */
const photoFiles: Record<(typeof productPhotoKeys)[number], ImageSourcePropType[]> = {
  iphone: [
    require('./iphone-1.jpg'),
    require('./iphone-2.jpg'),
    require('./iphone-3.jpg'),
  ],
  bicycle: [
    require('./bicycle-1.jpg'),
    require('./bicycle-2.jpg'),
    require('./bicycle-3.jpg'),
  ],
  sofa: [require('./sofa-1.jpg'), require('./sofa-2.jpg'), require('./sofa-3.jpg')],
  laptop: [
    require('./laptop-1.jpg'),
    require('./laptop-2.jpg'),
    require('./laptop-3.jpg'),
  ],
  stroller: [
    require('./stroller-1.jpg'),
    require('./stroller-2.jpg'),
    require('./stroller-3.jpg'),
  ],
  wardrobe: [
    require('./wardrobe-1.jpg'),
    require('./wardrobe-2.jpg'),
    require('./wardrobe-3.jpg'),
  ],
  scooter: [
    require('./scooter-1.jpg'),
    require('./scooter-2.jpg'),
    require('./scooter-3.jpg'),
  ],
  microwave: [
    require('./microwave-1.jpg'),
    require('./microwave-2.jpg'),
    require('./microwave-3.jpg'),
  ],
  shelf: [
    require('./shelf-1.jpg'),
    require('./shelf-2.jpg'),
    require('./shelf-3.jpg'),
  ],
  headphones: [
    require('./headphones-1.jpg'),
    require('./headphones-2.jpg'),
    require('./headphones-3.jpg'),
  ],
};

/** product-id -> индекс товара (0–9) */
const productIdToKey = (id: string): (typeof productPhotoKeys)[number] | null => {
  const num = id.replace('product-', '');
  const idx = parseInt(num, 10) - 1;
  if (idx >= 0 && idx < productPhotoKeys.length) {
    return productPhotoKeys[idx];
  }
  return null;
};

/** Количество фото на товар: 1, 2 или 3 (фиксировано по productId для детерминированности) */
function getPhotoCount(productId: string): 1 | 2 | 3 {
  const num = parseInt(productId.replace('product-', ''), 10);
  return ((num % 3) + 1) as 1 | 2 | 3;
}

/** Первое фото для карточки */
export function getProductImageSource(productId: string): ImageSourcePropType | null {
  const key = productIdToKey(productId);
  if (!key) return null;
  const photos = photoFiles[key];
  return photos[0] ?? null;
}

/** Все фото для слайдера (1–3 штуки в зависимости от товара) */
export function getProductImageSources(productId: string): ImageSourcePropType[] {
  const key = productIdToKey(productId);
  if (!key) return [];
  const photos = photoFiles[key];
  const count = getPhotoCount(productId);
  return photos.slice(0, count);
}
