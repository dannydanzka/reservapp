// App Context Interface
export interface AppContextState {
  // Theme context
  theme: {
    isDark: boolean;
    colorScheme: 'light' | 'dark' | 'auto';
  };

  // User preferences
  preferences: {
    language: 'es' | 'en';
    fontSize: 'small' | 'medium' | 'large' | 'extraLarge';
    notifications: {
      push: boolean;
      email: boolean;
      marketing: boolean;
    };
    accessibility: {
      reduceMotion: boolean;
      highContrast: boolean;
    };
  };

  // App state
  app: {
    isFirstLaunch: boolean;
    hasCompletedOnboarding: boolean;
    lastActiveDate: Date | null;
    appVersion: string;
  };

  // Network state
  network: {
    isConnected: boolean;
    isInternetReachable: boolean;
    connectionType: string | null;
  };
}

export interface AppContextActions {
  // Theme actions
  toggleTheme: () => void;
  setColorScheme: (scheme: 'light' | 'dark' | 'auto') => void;

  // Preferences actions
  setLanguage: (language: 'es' | 'en') => void;
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extraLarge') => void;
  updateNotificationSettings: (
    settings: Partial<AppContextState['preferences']['notifications']>
  ) => void;
  updateAccessibilitySettings: (
    settings: Partial<AppContextState['preferences']['accessibility']>
  ) => void;

  // App actions
  completeOnboarding: () => void;
  resetAppData: () => void;
  updateLastActive: () => void;

  // Network actions
  updateNetworkState: (state: Partial<AppContextState['network']>) => void;
}

export interface AppContextType extends AppContextState, AppContextActions {}

// Default values
export const defaultAppContextState: AppContextState = {
  app: {
    appVersion: '1.0.0',
    hasCompletedOnboarding: false,
    isFirstLaunch: true,
    lastActiveDate: null,
  },
  network: {
    connectionType: null,
    isConnected: true,
    isInternetReachable: true,
  },
  preferences: {
    accessibility: {
      highContrast: false,
      reduceMotion: false,
    },
    fontSize: 'medium',
    language: 'es',
    notifications: {
      email: true,
      marketing: false,
      push: true,
    },
  },
  theme: {
    colorScheme: 'auto',
    isDark: false,
  },
};
