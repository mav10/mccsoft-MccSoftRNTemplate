import './i18n/localization.ts';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {OfflineNotice} from '../shared/components/OfflineNotice';
import {SyncIndicator} from '../shared/components/SyncIndicator';
import {NetworkProvider} from '../shared/network/NetworkProvider';
import {ThemeProvider} from '../shared/theme/ThemeContext';
import {persistor, store} from '../store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry if we're offline
        if (error?.message === 'Network request failed') {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export const ProvidersGate = ({children}: {children: React.ReactNode}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <NetworkProvider>
                <ThemeProvider>
                  <OfflineNotice />
                  <SyncIndicator />
                  {children}
                </ThemeProvider>
              </NetworkProvider>
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
