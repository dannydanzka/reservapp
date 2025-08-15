import React, { ReactNode } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { LoadingScreen } from '../components/LoadingScreen';
import { persistor, store } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary';

const GestureContainer = styled(GestureHandlerRootView)`
  flex: 1;
`;

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <SafeAreaProvider>
            <GestureContainer>
              <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
              {children}
            </GestureContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default AppProviders;
