/**
 * Digital theme — тёмная палитра, cyan-акценты, tech-forward визуал
 */
export const colors = {
  // Акценты
  primary: '#06B6D4',
  primaryDark: '#0891B2',
  primaryGlow: '#22D3EE',
  // Фоны
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  surface: '#334155',
  surfaceElevated: '#475569',
  // Текст
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  // Семантика
  error: '#EF4444',
  success: '#10B981',
  border: '#334155',
  divider: '#334155',
  // Инверсия для кнопок
  onPrimary: '#FFFFFF',
  // Специальные
  overlay: 'rgba(0,0,0,0.5)',
  cardShadow: 'rgba(6, 182, 212, 0.12)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const typography = {
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1,
    wider: 2,
  },
} as const;
