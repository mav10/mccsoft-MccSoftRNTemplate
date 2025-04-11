import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useColorScheme} from 'react-native';

import {NavigationContainer} from '../navigation/NavigationContainer.tsx';
import {ProvidersGate} from './providers.tsx';

const App = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const init = async () => {
      // Perform any initialization here
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Hide splash screen with fade animation
      await RNBootSplash.hide({fade: true});
    };

    init();
  }, []);

  return (
    <ProvidersGate>
      <NavigationContainer />
    </ProvidersGate>
  );
};

export default App;
