import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { LoadingSpinner } from '@presentation/components';
import { ModalProvider } from '@presentation/components/Modal/ModalProvider';
import { persistor, store } from '@infrastructure/state/store';
import { theme } from '@styles/theme';
import { ToastProvider } from '@presentation/components/Toast/ToastProvider';
import ErrorBoundary from '@presentation/components/ErrorBoundary';

import '../i18n/i18n';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <ModalProvider>
                  <ToastProvider>
                    <ErrorBoundary>{children}</ErrorBoundary>
                  </ToastProvider>
                </ModalProvider>
              </ThemeProvider>
            </PersistGate>
          </ReduxProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export { AppProviders };
