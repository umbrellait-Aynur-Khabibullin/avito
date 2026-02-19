/**
 * @format
 */

import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { LaunchScreen } from './src/screens/LaunchScreen/LaunchScreen';
import { MainNavigator } from './src/navigation/MainNavigator';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { store } from './src/store';
import { useAppSelector } from './src/store/hooks';

type Screen = 'launch' | 'auth' | 'main';

function AppContent(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('launch');
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLaunchFinish = useCallback(() => {
    setScreen(isAuthenticated ? 'main' : 'auth');
  }, [isAuthenticated]);

  useEffect(() => {
    if (screen === 'auth' && isAuthenticated) {
      setScreen('main');
    }
  }, [screen, isAuthenticated]);

  useEffect(() => {
    if (screen === 'main' && !isAuthenticated) {
      setScreen('auth');
    }
  }, [screen, isAuthenticated]);

  if (screen === 'launch') {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <LaunchScreen onFinish={handleLaunchFinish} />
      </>
    );
  }

  if (screen === 'auth') {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
