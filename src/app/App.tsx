import React from 'react';

import {NavigationContainer} from '../navigation/NavigationContainer.tsx';
import {ProvidersGate} from './providers.tsx';

const App = () => {
  return (
    <ProvidersGate>
      <NavigationContainer />
    </ProvidersGate>
  );
};

export default App;
