import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useTheme} from '../shared/theme/ThemeContext';
import {Text} from '../shared/ui';
import LottieView from 'lottie-react-native';
import {SHARED_ICONS} from '../shared/icons/icons';
import {SHARED_ANIMATIONS} from '../shared/animations/animations';

export const SplashScreen = () => {
  const theme = useTheme();

  const appearance = theme.isDark ? 'dark' : 'light';

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.centered}>
        <LottieView source={SHARED_ANIMATIONS.CAT_LOADING} autoPlay loop style={styles.animation} />
      </View>

      <View style={styles.branding}>
        <Image source={SHARED_ICONS.MCC_LOGO[appearance]} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>MCC Soft</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
