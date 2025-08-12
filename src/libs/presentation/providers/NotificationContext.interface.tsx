// Notification Context Interface
export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    text: string;
    onPress: () => void;
  };
  onDismiss?: () => void;
  timestamp: Date;
}

export interface NotificationContextState {
  notifications: NotificationItem[];
  maxNotifications: number;
  defaultDuration: number;
}

export interface NotificationContextActions {
  showNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
  removeNotification: (id: string) => void;
}

export interface NotificationContextType
  extends NotificationContextState,
    NotificationContextActions {}

// Default values
export const defaultNotificationContextState: NotificationContextState = {
  defaultDuration: 4000,
  maxNotifications: 5,
  notifications: [],
};
