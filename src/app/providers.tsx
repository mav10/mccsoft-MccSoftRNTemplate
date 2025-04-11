import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const ProvidersGate = ({children}: {children: React.ReactNode}) => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>{children}</SafeAreaProvider>
        </GestureHandlerRootView>
    );
};
