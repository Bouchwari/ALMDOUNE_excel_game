export const lightColors = {
  // Primary – Excel green + school branding
  primary: '#217346',
  primaryLight: '#2ECC71',
  primarySoft: '#E8F8F0',

  // School brand (Almdoun logo)
  accent: '#C0177A',       // pink/magenta from logo
  accentCyan: '#00BCD4',   // cyan from logo text
  accentMaroon: '#6A0D4B', // dark maroon from logo
  accentGold: '#F39C12',   // gold for stars/XP
  accentBlue: '#3498DB',   // info/links

  // Neutrals
  background: '#F5F6FA',
  surface: '#FFFFFF',      // card/panel background
  border: '#E0E0E0',
  textPrimary: '#1A1A2E',
  textSecondary: '#6C757D',
  textMuted: '#ADB5BD',

  // Feedback
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',

  // Level colors
  levelBeginner: '#2ECC71',
  levelBasic: '#F39C12',
  levelIntermed: '#E67E22',
  levelAdvanced: '#3498DB',
  levelExpert: '#9B59B6',
  levelMaster: '#E74C3C',

  // Splash bg
  splashBg: '#FFF0F8',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  card: '#FFFFFF',
};

export type ColorPalette = typeof lightColors;

export const darkColors: ColorPalette = {
  ...lightColors,
  background: '#121212',
  surface: '#1E1E1E',
  card: '#1E1E1E',
  border: '#2C2C2C',
  textPrimary: '#F0F0F0',
  textSecondary: '#A0A0A0',
  textMuted: '#666666',
  splashBg: '#1A0A18',
  primarySoft: '#0A2018',
};

export function getColors(isDark: boolean): ColorPalette {
  return isDark ? darkColors : lightColors;
}

// Backward-compatible static export (always light)
export const colors = lightColors;
