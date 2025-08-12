import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ModalState {
  id: string;
  type: 'confirm' | 'alert' | 'custom';
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface UIState {
  isLoading: boolean;
  loadingMessage?: string;
  notifications: NotificationState[];
  modals: ModalState[];
  networkStatus: 'online' | 'offline';
  theme: 'light' | 'dark' | 'system';
}

const initialState: UIState = {
  isLoading: false,
  modals: [],
  networkStatus: 'online',
  notifications: [],
  theme: 'system',
};

export const uiSlice = createSlice({
  initialState,
  name: 'ui',
  reducers: {
    addModal: (state, action: PayloadAction<Omit<ModalState, 'id'>>) => {
      const modal: ModalState = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.modals.push(modal);
    },
    addNotification: (state, action: PayloadAction<Omit<NotificationState, 'id'>>) => {
      const notification: NotificationState = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    clearModals: (state) => {
      state.modals = [];
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter((modal) => modal.id !== action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message;
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  addModal,
  addNotification,
  clearModals,
  clearNotifications,
  removeModal,
  removeNotification,
  setLoading,
  setNetworkStatus,
  setTheme,
} = uiSlice.actions;
