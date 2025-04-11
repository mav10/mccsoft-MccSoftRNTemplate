import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../theme/ThemeContext';

const LANGUAGES = [
  {code: 'en', label: 'EN'},
  {code: 'ru', label: 'RU'},
];

export const LanguageSwitch = () => {
  const {i18n} = useTranslation();
  const theme = useTheme();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <View style={styles.container}>
      {LANGUAGES.map(({code, label}) => (
        <Pressable
          key={code}
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: currentLanguage === code ? theme.colors.primary : theme.colors.surface,
            },
            pressed && {opacity: 0.8},
          ]}
          onPress={() => handleLanguageChange(code)}
        >
          <Text
            style={[
              styles.text,
              {
                color: currentLanguage === code ? '#FFFFFF' : theme.colors.textSecondary,
              },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
