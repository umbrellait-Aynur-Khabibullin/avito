import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './LaunchScreen.styles';
import type {LaunchScreenProps} from './LaunchScreen.types';

import { COMMON_CONST } from '../../constants/common.const';

export function LaunchScreen({ onFinish }: LaunchScreenProps): React.JSX.Element {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish?.();
    }, COMMON_CONST.LAUNCH_DURATION_MS);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Avito</Text>
      <Text style={styles.tagline}>Объявления</Text>
    </View>
  );
}
