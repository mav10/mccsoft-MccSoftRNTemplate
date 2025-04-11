import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useTheme} from '../shared/theme/ThemeContext';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import {logout} from '../store/slices/authSlice.ts';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator.tsx';

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
          onPress={handleProfilePress}
        >
          <Text style={styles.buttonText}>{t('home:profile')}</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [styles.button, {backgroundColor: theme.colors.error}, pressed && {opacity: 0.8}]}
          onPress={handleLogout}
        >
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
