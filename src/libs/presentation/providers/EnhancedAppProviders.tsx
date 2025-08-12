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

import { AppContextProvider } from './AppContext';
import { NotificationContextProvider } from './NotificationContext';
import '../i18n/i18n';

interface EnhancedAppProvidersProps {
  children: React.ReactNode;
}

/**
 * Enhanced App Providers - Combines all app providers including new context providers
 * This includes:
 * - Error Boundaries for error handling
 * - Gesture Handler for gestures and animations
 * - Safe Area Provider for safe area handling
 * - Redux Provider for state management
 * - Redux Persist for state persistence
 * - Theme Provider for styled-components theming
 * - App Context Provider for global app state
 * - Notification Context Provider for notification management
 * - Modal Provider for modal management
 * - Toast Provider for toast notifications
 */
const EnhancedAppProviders: React.FC<EnhancedAppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
              <AppContextProvider>
                <NotificationContextProvider>
                  <ThemeProvider theme={theme}>
                    <ModalProvider>
                      <ToastProvider>
                        <ErrorBoundary>{children}</ErrorBoundary>
                      </ToastProvider>
                    </ModalProvider>
                  </ThemeProvider>
                </NotificationContextProvider>
              </AppContextProvider>
            </PersistGate>
          </ReduxProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default EnhancedAppProviders;
