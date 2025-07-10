import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '../shared/theme/ThemeContext';
import { Text } from '../shared/ui';

export const SplashScreen = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="h1" style={styles.title}>
        MCC Soft
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});