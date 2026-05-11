import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, ColorPalette } from '../../presentation/theme/colors';
import { STORAGE_KEYS } from '../utils/storage';

export type { ColorPalette };

interface ThemeContextValue {
  isDark: boolean;
  colors: ColorPalette;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

// Dark-mode persistence lives here rather than in SettingsRepository because
// ThemeProvider must read the preference before any screen renders, before
// the progress repo is initialized. Moving it would require blocking the
// entire app on repo init, which causes a visible flash.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.darkMode)
      .then(val => { if (val === 'true') setIsDark(true); })
      .catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEYS.darkMode, String(next)).catch(() => {});
      return next;
    });
  }, []);

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
