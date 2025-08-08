import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import { LoadingSpinner } from '../../../components';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { ToastProvider } from '../../../components/Toast/ToastProvider';
import { ModalProvider } from '../../../components/Modal/ModalProvider';

// Initialize i18n
import '../i18n/i18n';

import { persistor, store } from '../../../store/store';
import { theme } from '../../ui/theme/theme';

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
                    <ErrorBoundary>
                      {children}
                    </ErrorBoundary>
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