import {useIsFetching} from '@tanstack/react-query';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {useTheme} from '../theme/ThemeContext';

export const SyncIndicator = () => {
  const theme = useTheme();
  const isFetching = useIsFetching();
  const {t} = useTranslation();

  if (!isFetching) return null;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
      <ActivityIndicator size="small" color="#FFFFFF" />
      <Text style={styles.text}>{t('common:syncing')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
