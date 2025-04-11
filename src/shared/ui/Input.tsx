import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';

import {useTheme} from '../theme/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input = ({label, error, containerStyle, style, ...rest}: InputProps) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, {color: theme.colors.textSecondary}]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderColor: error ? theme.colors.error : theme.colors.border,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...rest}
      />
      {error && <Text style={[styles.error, {color: theme.colors.error}]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
