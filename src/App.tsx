import React from 'react';

import { NotificationContainer } from '@presentation/components/NotificationDisplay';
import EnhancedAppProviders from '@providers/EnhancedAppProviders';
import RootNavigator from '@navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <EnhancedAppProviders>
      <RootNavigator />
      <NotificationContainer />
    </EnhancedAppProviders>
  );
};

export default App;
