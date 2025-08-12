import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import { Appearance, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {
  AppContextActions,
  AppContextState,
  AppContextType,
  defaultAppContextState,
} from './AppContext.interface';

// Storage keys
const STORAGE_KEYS = {
  APP_CONTEXT: '@reservapp/app_context',
};

// Context creation
const AppContext = createContext<AppContextType | undefined>(undefined);

// Action types
type AppContextAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_COLOR_SCHEME'; payload: 'light' | 'dark' | 'auto' }
  | { type: 'SET_LANGUAGE'; payload: 'es' | 'en' }
  | {
      type: 'SET_FONT_SIZE';
      payload: 'small' | 'medium' | 'large' | 'extraLarge';
    }
  | {
      type: 'UPDATE_NOTIFICATION_SETTINGS';
      payload: Partial<AppContextState['preferences']['notifications']>;
    }
  | {
      type: 'UPDATE_ACCESSIBILITY_SETTINGS';
      payload: Partial<AppContextState['preferences']['accessibility']>;
    }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_APP_DATA' }
  | { type: 'UPDATE_LAST_ACTIVE' }
  | {
      type: 'UPDATE_NETWORK_STATE';
      payload: Partial<AppContextState['network']>;
    }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<AppContextState> }
  | { type: 'UPDATE_THEME_FROM_SYSTEM'; payload: boolean };

// Reducer function
const appContextReducer = (state: AppContextState, action: AppContextAction): AppContextState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: {
          ...state.theme,
          isDark: !state.theme.isDark,
        },
      };

    case 'SET_COLOR_SCHEME':
      return {
        ...state,
        theme: {
          ...state.theme,
          colorScheme: action.payload,
          isDark:
            action.payload === 'auto'
              ? Appearance.getColorScheme() === 'dark'
              : action.payload === 'dark',
        },
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          language: action.payload,
        },
      };

    case 'SET_FONT_SIZE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          fontSize: action.payload,
        },
      };

    case 'UPDATE_NOTIFICATION_SETTINGS':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          notifications: {
            ...state.preferences.notifications,
            ...action.payload,
          },
        },
      };

    case 'UPDATE_ACCESSIBILITY_SETTINGS':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          accessibility: {
            ...state.preferences.accessibility,
            ...action.payload,
          },
        },
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        app: {
          ...state.app,
          hasCompletedOnboarding: true,
          isFirstLaunch: false,
        },
      };

    case 'RESET_APP_DATA':
      return {
        ...defaultAppContextState,
        network: state.network, // Keep network state
      };

    case 'UPDATE_LAST_ACTIVE':
      return {
        ...state,
        app: {
          ...state.app,
          lastActiveDate: new Date(),
        },
      };

    case 'UPDATE_NETWORK_STATE':
      return {
        ...state,
        network: {
          ...state.network,
          ...action.payload,
        },
      };

    case 'LOAD_PERSISTED_STATE':
      return {
        ...state,
        ...action.payload,
      };

    case 'UPDATE_THEME_FROM_SYSTEM':
      return {
        ...state,
        theme: {
          ...state.theme,
          isDark: state.theme.colorScheme === 'auto' ? action.payload : state.theme.isDark,
        },
      };

    default:
      return state;
  }
};

// Provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appContextReducer, defaultAppContextState);

  // Load persisted state on mount
  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const persistedData = await AsyncStorage.getItem(STORAGE_KEYS.APP_CONTEXT);
        if (persistedData) {
          const parsedData = JSON.parse(persistedData);
          dispatch({ payload: parsedData, type: 'LOAD_PERSISTED_STATE' });
        }
      } catch (error) {
        console.warn('Failed to load persisted app context:', error);
      }
    };

    loadPersistedState();
  }, []);

  // Persist state changes
  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.APP_CONTEXT, JSON.stringify(state));
      } catch (error) {
        console.warn('Failed to persist app context:', error);
      }
    };

    persistState();
  }, [state]);

  // Listen to appearance changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch({
        payload: colorScheme === 'dark',
        type: 'UPDATE_THEME_FROM_SYSTEM',
      });
    });

    return () => subscription.remove();
  }, []);

  // Listen to network state changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch({
        payload: {
          connectionType: state.type,
          isConnected: state.isConnected ?? false,
          isInternetReachable: state.isInternetReachable ?? false,
        },
        type: 'UPDATE_NETWORK_STATE',
      });
    });

    return unsubscribe;
  }, []);

  // Listen to app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        dispatch({ type: 'UPDATE_LAST_ACTIVE' });
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  // Actions
  const actions: AppContextActions = {
    completeOnboarding: () => dispatch({ type: 'COMPLETE_ONBOARDING' }),
    resetAppData: () => dispatch({ type: 'RESET_APP_DATA' }),
    setColorScheme: (scheme) => dispatch({ payload: scheme, type: 'SET_COLOR_SCHEME' }),
    setFontSize: (size) => dispatch({ payload: size, type: 'SET_FONT_SIZE' }),
    setLanguage: (language) => dispatch({ payload: language, type: 'SET_LANGUAGE' }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    updateAccessibilitySettings: (settings) =>
      dispatch({ payload: settings, type: 'UPDATE_ACCESSIBILITY_SETTINGS' }),
    updateLastActive: () => dispatch({ type: 'UPDATE_LAST_ACTIVE' }),
    updateNetworkState: (networkState) =>
      dispatch({ payload: networkState, type: 'UPDATE_NETWORK_STATE' }),
    updateNotificationSettings: (settings) =>
      dispatch({ payload: settings, type: 'UPDATE_NOTIFICATION_SETTINGS' }),
  };

  const contextValue: AppContextType = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

// Selectors for specific parts of the state
export const useTheme = () => {
  const { setColorScheme, theme, toggleTheme } = useAppContext();
  return { setColorScheme, theme, toggleTheme };
};

export const usePreferences = () => {
  const {
    preferences,
    setFontSize,
    setLanguage,
    updateAccessibilitySettings,
    updateNotificationSettings,
  } = useAppContext();

  return {
    preferences,
    setFontSize,
    setLanguage,
    updateAccessibilitySettings,
    updateNotificationSettings,
  };
};

export const useNetworkState = () => {
  const { network } = useAppContext();
  return network;
};

export const useAppState = () => {
  const { app, completeOnboarding, resetAppData, updateLastActive } = useAppContext();
  return { app, completeOnboarding, resetAppData, updateLastActive };
};

export default AppContext;
