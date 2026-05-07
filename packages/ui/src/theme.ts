import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Grayscales for borders, texts, background placeholders
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    textPrimary: palette.black,
    textSecondary: palette.gray500,
    primary: palette.purplePrimary,
    primaryLight: palette.purpleLight,
    border: palette.gray200,
    
    // Status colors
    success: palette.success,
    successBackground: palette.successLight,
    warning: palette.warning,
    warningBackground: palette.warningLight,
    danger: palette.danger,
    dangerBackground: palette.dangerLight,
    info: palette.info,
    infoBackground: palette.infoLight,

    grayLight: palette.gray100,
    grayMedium: palette.gray400,
    grayDark: palette.gray800,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const useTheme = () => useRestyleTheme<Theme>();
