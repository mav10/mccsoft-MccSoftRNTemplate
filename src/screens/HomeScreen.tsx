import {Pressable, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {logout} from '../store/slices/authSlice';
import {useTheme} from '../shared/theme/ThemeContext';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', { userId: userId || 'unknown' });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        🚀Welcome to {Config.APP_NAME}
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: theme.colors.primary},
            pressed && {opacity: 0.8},
          ]}
          onPress={handleProfilePress}>
          <Text style={styles.buttonText}>Go to Profile</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: theme.colors.error},
            pressed && {opacity: 0.8},
          ]}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
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
