import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from './colors';
import {spacing, fontSizes} from './metrics';
import {Theme} from './types';

const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkColors : lightColors,
  spacing,
  fontSizes,
  isDark,
});

const ThemeContext = createContext<Theme>(createTheme(false));

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = createTheme(isDark);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
