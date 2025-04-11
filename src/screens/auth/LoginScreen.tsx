import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTheme} from '../../shared/theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useAppDispatch} from '../../store/hooks';
import {login} from '../../store/slices/authSlice';
import {validateLoginForm} from '../../shared/utils/validation';
import {useTranslation} from 'react-i18next';
import {LanguageSwitch} from '../../shared/components/LanguageSwitch';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../shared/ui/Button';
import {Input} from '../../shared/ui/Input';
import {Text} from '../../shared/ui/Text';
import {Card} from '../../shared/ui/Card';

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
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Card style={styles.card}>
        <Text variant="h1" style={styles.title}>
          {t('auth:login')}
        </Text>

        <Input
          placeholder={t('auth:email')}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors(prev => ({...prev, email: ''}));
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
          error={errors.email}
        />

        <Input
          placeholder={t('auth:password')}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setErrors(prev => ({...prev, password: ''}));
          }}
          secureTextEntry
          editable={!isLoading}
          error={errors.password}
        />

        <Button
          title={t('auth:loginButton')}
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
        />

        <View style={styles.languageSwitchContainer}>
            <LanguageSwitch />
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
