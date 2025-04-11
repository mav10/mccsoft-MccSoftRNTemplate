import React from 'react';
import {Pressable, Text, StyleSheet, PressableProps, ActivityIndicator} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {StyleProp, ViewStyle} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'error';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({title, variant = 'primary', loading, fullWidth, style, disabled, ...rest}: ButtonProps) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.surface;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    return variant === 'secondary' ? theme.colors.text : '#FFFFFF';
  };

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {backgroundColor: getBackgroundColor()},
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style as ViewStyle, // Fix type casting
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[styles.text, {color: getTextColor()}]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
