import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useTheme} from '../../shared/theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useAppDispatch} from '../../store/hooks';
import {login} from '../../store/slices/authSlice';
import {validateLoginForm} from '../../shared/utils/validation';
import {useTranslation} from 'react-i18next';
import {LanguageSwitch} from '../../shared/components/LanguageSwitch';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {top} = useSafeAreaInsets();

  const handleLogin = async () => {
    const validationErrors = validateLoginForm({email, password});

    if (validationErrors.length > 0) {
      const newErrors = validationErrors.reduce(
        (acc, error) => ({
          ...acc,
          [error.field]: error.message,
        }),
        {},
      );
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(login('user-123'));
    } catch (error) {
      Alert.alert(t('common:error'), t('auth:loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        {t('auth:login')}
      </Text>
      <View style={[styles.languageSwitchContainer, {marginTop: top}]}>
        <LanguageSwitch />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderColor: errors.email
                ? theme.colors.error
                : theme.colors.border,
            },
          ]}
          placeholder={t('auth:email')}
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors(prev => ({...prev, email: ''}));
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />
        {errors.email ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.email}
          </Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderColor: errors.password
                ? theme.colors.error
                : theme.colors.border,
            },
          ]}
          placeholder={t('auth:password')}
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setErrors(prev => ({...prev, password: ''}));
          }}
          secureTextEntry
          editable={!isLoading}
        />
        {errors.password ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.password}
          </Text>
        ) : null}
      </View>

      <Pressable
        style={({pressed}) => [
          styles.button,
          {backgroundColor: theme.colors.primary},
          pressed && {opacity: 0.8},
          isLoading && {opacity: 0.6},
        ]}
        onPress={handleLogin}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? t('common:loading') : t('auth:loginButton')}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
