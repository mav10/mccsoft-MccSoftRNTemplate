import React from 'react';
import {ProvidersGate} from './providers.tsx';
import {NavigationContainer} from '../navigation/NavigationContainer.tsx';

const App = () => {
  return (
    <ProvidersGate>
      <NavigationContainer />
    </ProvidersGate>
  );
};

export default App;
