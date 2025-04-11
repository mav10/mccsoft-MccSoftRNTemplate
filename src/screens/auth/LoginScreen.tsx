import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import {useTheme} from '../../shared/theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useAppDispatch} from '../../store/hooks';
import {login} from '../../store/slices/authSlice';
import {validateLoginForm, ValidationError} from '../../shared/utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const validationErrors = validateLoginForm({ email, password });
    
    if (validationErrors.length > 0) {
      const newErrors = validationErrors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message
      }), {});
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(login('user-123'));
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: string) => {
    setErrors(prev => ({...prev, [field]: ''}));
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.text}]}>Welcome Back</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderColor: errors.email ? theme.colors.error : theme.colors.border,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={(text) => {
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
              borderColor: errors.password ? theme.colors.error : theme.colors.border,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={(text) => {
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
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </Pressable>
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
});