import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { colors } from '../common/theme';

export const mainScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: '#FF6B35' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '600', fontSize: 18 },
};

export const tabScreenOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textSecondary,
  tabBarStyle: { backgroundColor: colors.background },
  tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
};
