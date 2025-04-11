import React from 'react';
import {View, ViewProps, StyleSheet, Platform} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined';
}

export const Card = ({
  variant = 'elevated',
  style,
  children,
  ...rest
}: CardProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: variant === 'outlined' ? theme.colors.border : 'transparent',
          ...variant === 'elevated' && {
            shadowColor: theme.colors.shadow,
          },
        },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});