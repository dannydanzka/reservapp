import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import {
  defaultNotificationContextState,
  NotificationContextActions,
  NotificationContextState,
  NotificationContextType,
  NotificationItem,
} from './NotificationContext.interface';

// Context creation
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Action types
type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: NotificationItem }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'DISMISS_NOTIFICATION'; payload: string }
  | { type: 'DISMISS_ALL' }
  | { type: 'SET_MAX_NOTIFICATIONS'; payload: number }
  | { type: 'SET_DEFAULT_DURATION'; payload: number };

// Reducer function
const notificationReducer = (
  state: NotificationContextState,
  action: NotificationAction
): NotificationContextState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotifications = [action.payload, ...state.notifications];

      // Limit to max notifications, remove oldest if necessary
      if (newNotifications.length > state.maxNotifications) {
        newNotifications.splice(state.maxNotifications);
      }

      return {
        ...state,
        notifications: newNotifications,
      };
    }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };

    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, dismissed: true } : n
        ),
      };

    case 'DISMISS_ALL':
      return {
        ...state,
        notifications: [],
      };

    case 'SET_MAX_NOTIFICATIONS':
      return {
        ...state,
        maxNotifications: action.payload,
      };

    case 'SET_DEFAULT_DURATION':
      return {
        ...state,
        defaultDuration: action.payload,
      };

    default:
      return state;
  }
};

// Provider component
interface NotificationContextProviderProps {
  children: ReactNode;
  maxNotifications?: number;
  defaultDuration?: number;
}

export const NotificationContextProvider: React.FC<NotificationContextProviderProps> = ({
  children,
  defaultDuration = 4000,
  maxNotifications = 5,
}) => {
  const initialState = {
    ...defaultNotificationContextState,
    defaultDuration,
    maxNotifications,
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Auto-dismiss notifications after their duration
  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {};

    state.notifications.forEach((notification) => {
      if (!notification.persistent && !timers[notification.id]) {
        const duration = notification.duration || state.defaultDuration;

        timers[notification.id] = setTimeout(() => {
          dispatch({ payload: notification.id, type: 'REMOVE_NOTIFICATION' });
          notification.onDismiss?.();
          delete timers[notification.id];
        }, duration);
      }
    });

    // Cleanup timers for removed notifications
    Object.keys(timers).forEach((id) => {
      if (!state.notifications.find((n) => n.id === id)) {
        clearTimeout(timers[id]);
        delete timers[id];
      }
    });

    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer));
    };
  }, [state.notifications, state.defaultDuration]);

  // Generate unique ID for notifications
  const generateId = (): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Actions
  const actions: NotificationContextActions = {
    dismissAll: () => {
      dispatch({ type: 'DISMISS_ALL' });
    },

    dismissNotification: (id) => {
      dispatch({ payload: id, type: 'DISMISS_NOTIFICATION' });
    },

    removeNotification: (id) => {
      const notification = state.notifications.find((n) => n.id === id);
      dispatch({ payload: id, type: 'REMOVE_NOTIFICATION' });
      notification?.onDismiss?.();
    },

    showError: (message, title) => {
      actions.showNotification({
        duration: 6000,
        message,
        title: title || 'Error',
        type: 'error', // Longer duration for errors
      });
    },

    showInfo: (message, title) => {
      actions.showNotification({
        message,
        title: title || 'Información',
        type: 'info',
      });
    },

    showNotification: (notificationData) => {
      const notification: NotificationItem = {
        ...notificationData,
        id: generateId(),
        timestamp: new Date(),
      };

      dispatch({ payload: notification, type: 'ADD_NOTIFICATION' });
    },

    showSuccess: (message, title) => {
      actions.showNotification({
        message,
        title: title || 'Éxito',
        type: 'success',
      });
    },

    showWarning: (message, title) => {
      actions.showNotification({
        message,
        title: title || 'Advertencia',
        type: 'warning',
      });
    },
  };

  const contextValue: NotificationContextType = {
    ...state,
    ...actions,
  };

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationContextProvider');
  }

  return context;
};

// Convenience hooks for different notification types
export const useSuccessNotification = () => {
  const { showSuccess } = useNotifications();
  return showSuccess;
};

export const useErrorNotification = () => {
  const { showError } = useNotifications();
  return showError;
};

export const useWarningNotification = () => {
  const { showWarning } = useNotifications();
  return showWarning;
};

export const useInfoNotification = () => {
  const { showInfo } = useNotifications();
  return showInfo;
};

export default NotificationContext;
