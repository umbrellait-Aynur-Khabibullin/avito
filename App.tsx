/**
 * @format
 */

import React, {useState, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {LaunchScreen} from './src/screens/LaunchScreen/LaunchScreen';
import {MainScreen} from './src/screens/MainScreen/MainScreen';

type Screen = 'launch' | 'main';

export default function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('launch');

  const handleLaunchFinish = useCallback(() => {
    setScreen('main');
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      {screen === 'launch' ? (
        <LaunchScreen onFinish={handleLaunchFinish} />
      ) : (
        <MainScreen />
      )}
    </>
  );
}
