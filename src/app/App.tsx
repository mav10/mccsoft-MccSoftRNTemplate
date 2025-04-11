import React from 'react';
import {Text} from 'react-native';
import {ProvidersGate} from './providers.tsx';

const App = () => {
  return (
    <ProvidersGate>
      <Text>🚀 Welcome to MccSoftRNTemplate!</Text>
    </ProvidersGate>
  );
};

export default App;
