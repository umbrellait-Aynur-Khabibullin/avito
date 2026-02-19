import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './LaunchScreen.styles';
import type { LaunchScreenProps } from './LaunchScreen.types';

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
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>Avi<Text style={styles.logoAccent}>to</Text></Text>
        </View>
        <Text style={styles.tagline}>Объявления</Text>
        <View style={styles.dot} />
      </View>
    </View>
  );
}
