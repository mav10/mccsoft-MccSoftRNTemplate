import {
    NavigationContainer as RNNavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { RootNavigator } from './RootNavigator';

export function NavigationContainer() {
    const scheme = useColorScheme();

    return (
        <RNNavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </RNNavigationContainer>
    );
}
