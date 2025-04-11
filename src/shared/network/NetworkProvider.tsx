import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useQueryClient} from '@tanstack/react-query';
import React, {createContext, useContext, useEffect, useState} from 'react';

interface NetworkContextType {
  isConnected: boolean;
  isInternetReachable: boolean | null;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  isInternetReachable: true,
});

export const NetworkProvider = ({children}: {children: React.ReactNode}) => {
  const queryClient = useQueryClient();
  const [networkState, setNetworkState] = useState<NetworkContextType>({
    isConnected: true,
    isInternetReachable: true,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const wasOffline = !networkState.isConnected;
      const isNowOnline = state.isConnected ?? false;

      setNetworkState({
        isConnected: isNowOnline,
        isInternetReachable: state.isInternetReachable,
      });

      // Refetch all queries when connection is restored
      if (wasOffline && isNowOnline) {
        queryClient.refetchQueries();
      }
    });

    return () => unsubscribe();
  }, [networkState.isConnected, queryClient]);

  return <NetworkContext.Provider value={networkState}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => useContext(NetworkContext);
