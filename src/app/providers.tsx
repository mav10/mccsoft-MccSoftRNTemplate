import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '../shared/theme/ThemeContext';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '../store/store.ts';

export const ProvidersGate = ({children}: {children: React.ReactNode}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
