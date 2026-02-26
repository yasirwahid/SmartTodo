export type ThemeColors = {
  primary: string;
  primaryDark: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  border: string;
  shadow: string;
  overlay: string;
  cardGradientStart: string;
  cardGradientEnd: string;
  fabBackground: string;
};

export const lightColors: ThemeColors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  secondary: '#8B5CF6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#EFF6FF',
  text: '#0F172A',
  textSecondary: '#64748B',
  error: '#EF4444',
  success: '#22C55E',
  border: '#E2E8F0',
  shadow: '#000000',
  overlay: 'rgba(15, 23, 42, 0.4)',
  cardGradientStart: '#EEF2FF',
  cardGradientEnd: '#F5F3FF',
  fabBackground: '#6366F1',
};

export const darkColors: ThemeColors = {
  primary: '#818CF8',
  primaryDark: '#6366F1',
  secondary: '#A855F7',
  background: '#020617',
  surface: '#020617',
  surfaceElevated: '#0F172A',
  text: '#E5E7EB',
  textSecondary: '#9CA3AF',
  error: '#F97373',
  success: '#4ADE80',
  border: '#1F2937',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  cardGradientStart: '#0F172A',
  cardGradientEnd: '#111827',
  fabBackground: '#4F46E5',
};
