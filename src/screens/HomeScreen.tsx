import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';

import {RootStackParamList} from '../navigation/RootNavigator.tsx';
import {useTheme} from '../shared/theme/ThemeContext';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {logout} from '../store/slices/authSlice.ts';
import {Text} from '../shared/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);
  const {t} = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', {userId: userId || 'unknown'});
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>{t('home:welcome', {appName: Config.APP_NAME})}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [styles.button, {backgroundColor: theme.colors.primary}, pressed && {opacity: 0.8}]}
          onPress={handleProfilePress}>
          <Text style={styles.buttonText}>{t('home:profile')}</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [styles.button, {backgroundColor: theme.colors.error}, pressed && {opacity: 0.8}]}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>{t('home:logout')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
