import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors, AppColors} from './colors';

const ThemeContext = createContext<AppColors>(lightColors);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
