import React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';

import {useTheme} from '../theme/ThemeContext';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'error';
}

export const Text = ({variant = 'body', color = 'primary', style, ...rest}: CustomTextProps) => {
  const theme = useTheme();

  const getColor = () => {
    switch (color) {
      case 'secondary':
        return theme.colors.textSecondary;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  };

  return <RNText style={[styles[variant], {color: getColor()}, style]} {...rest} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
