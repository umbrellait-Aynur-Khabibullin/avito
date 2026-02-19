import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { colors } from '../common/theme';

export const mainScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerShadowVisible: false,
  headerTintColor: colors.text,
  headerTitleStyle: { fontWeight: '600', fontSize: 18 },
  contentStyle: { backgroundColor: colors.backgroundSecondary },
};

export const tabScreenOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarStyle: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
  },
  tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
};
