import React from 'react';

import 'react-native-gesture-handler';

import { RootNavigator } from './libs/presentation/navigation/RootNavigator';
import AppProviders from './libs/infrastructure/providers/AppProviders';

const App: React.FC = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default App;
