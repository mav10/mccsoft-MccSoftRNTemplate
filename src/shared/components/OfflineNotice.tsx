import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useNetwork} from '../network/NetworkProvider';
import {useTheme} from '../theme/ThemeContext';
import {useTranslation} from 'react-i18next';

export const OfflineNotice = () => {
  const {isConnected} = useNetwork();
  const theme = useTheme();
  const {t} = useTranslation();

  if (isConnected) {
    return null;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.error}]}>
      <Text style={styles.text}>{t('common:offline')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
