import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './LaunchScreen.styles';
import type {LaunchScreenProps} from './LaunchScreen.types';

const LAUNCH_DURATION_MS = 2000;

export function LaunchScreen({onFinish}: LaunchScreenProps): React.JSX.Element {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish?.();
    }, LAUNCH_DURATION_MS);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Avito</Text>
      <Text style={styles.tagline}>Объявления</Text>
    </View>
  );
}
