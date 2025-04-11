import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useAppSelector} from '../store/hooks';
import {SplashScreen} from '../screens/SplashScreen';
import {useState, useEffect} from 'react';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Profile: {userId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(state => !!state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initialization process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'User Profile',
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
