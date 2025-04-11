import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackParamList} from '../../navigation/RootNavigator';
import {LanguageSwitch} from '../../shared/components/LanguageSwitch';
import {useTheme} from '../../shared/theme/ThemeContext';
import {Button} from '../../shared/ui/Button';
import {Card} from '../../shared/ui/Card';
import {Input} from '../../shared/ui/Input';
import {Text} from '../../shared/ui/Text';
import {validateLoginForm} from '../../shared/utils/validation';
import {useAppDispatch} from '../../store/hooks';
import {login} from '../../store/slices/authSlice';
import {useModal} from '../../shared/modals/useModal.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {showModal} = useModal();

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
      Alert.alert(t('common:error'), t('auth:loginError') + JSON.stringify(error));
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

        <View style={styles.buttonBlock}>
          <Button title={t('auth:loginButton')} onPress={handleLogin} loading={isLoading} fullWidth />
          <Button
            title={t('auth:details')}
            fullWidth
            variant={'secondary'}
            onPress={() =>
              showModal('confirm', {
                title: 'Test',
                onConfirm: () => console.log('confirmed'),
              })
            }
          />
        </View>
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
  buttonBlock: {
    gap: 12,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
