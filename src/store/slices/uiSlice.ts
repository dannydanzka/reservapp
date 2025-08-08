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
  notifications: [],
  modals: [],
  networkStatus: 'online',
  theme: 'system',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message;
    },
    addNotification: (state, action: PayloadAction<Omit<NotificationState, 'id'>>) => {
      const notification: NotificationState = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addModal: (state, action: PayloadAction<Omit<ModalState, 'id'>>) => {
      const modal: ModalState = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.modals.push(modal);
    },
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter((modal) => modal.id !== action.payload);
    },
    clearModals: (state) => {
      state.modals = [];
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
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  addModal,
  removeModal,
  clearModals,
  setNetworkStatus,
  setTheme,
} = uiSlice.actions;