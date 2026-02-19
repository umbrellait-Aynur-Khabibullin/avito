import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from './StarRating.styles';
import type { StarRatingProps } from './StarRating.types';

const FILLED = '★';
const EMPTY = '☆';

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
}: StarRatingProps): React.JSX.Element {
  const styles = createStyles(size);
  const clampedRating = Math.max(0, Math.min(maxStars, rating));
  const filledCount = Math.round(clampedRating);

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Text
          key={i}
          style={[styles.star, i < filledCount ? styles.starFilled : styles.starEmpty]}
        >
          {i < filledCount ? FILLED : EMPTY}
        </Text>
      ))}
    </View>
  );
}
