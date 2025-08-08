import React from 'react';

import { AppProviders } from './libs/core/providers/AppProviders';
import RootNavigator from './navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default App;