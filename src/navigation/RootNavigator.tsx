import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAppSelector } from '../store/hooks';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: {
    userId: string;
  };
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerBackTitle: 'Back',
      }}>
      {!isAuthenticated ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
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
      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen}
        options={{
          title: 'Page Not Found',
        }}
      />
    </Stack.Navigator>
  );
}
