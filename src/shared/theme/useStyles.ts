import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

export const useStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: ReturnType<typeof useTheme>) => T
) => {
  const theme = useTheme();
  return StyleSheet.create(styleFactory(theme));
};