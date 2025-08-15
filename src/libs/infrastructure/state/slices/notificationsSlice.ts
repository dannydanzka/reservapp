import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Notification,
  NotificationFilters,
  NotificationSettings,
  NotificationType,
  PaginationParams,
} from '@shared/types';
import { notificationsService } from '@mod-notification/infrastructure/services/notificationsService';

export interface NotificationsState {
  notifications: Notification[];
  unreadNotifications: Notification[];
  selectedNotification: Notification | null;
  settings: NotificationSettings | null;
  filters: NotificationFilters;
  unreadCount: number;
  summary: {
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
  } | null;
  isLoading: boolean;
  isLoadingSettings: boolean;
  isUpdatingSettings: boolean;
  isMarkingRead: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Async Thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (
    params: {
      filters?: NotificationFilters;
      pagination?: PaginationParams;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await notificationsService.getNotifications(
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar notificaciones';
      return rejectWithValue(message);
    }
  }
);

export const fetchUnreadNotifications = createAsyncThunk(
  'notifications/fetchUnreadNotifications',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await notificationsService.getUnreadNotifications(pagination);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar notificaciones no leídas';
      return rejectWithValue(message);
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_unused, { rejectWithValue }) => {
    try {
      const response = await notificationsService.getUnreadCount();
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener contador';
      return rejectWithValue(message);
    }
  }
);

export const fetchNotificationDetails = createAsyncThunk(
  'notifications/fetchNotificationDetails',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const notification = await notificationsService.getNotificationDetails(notificationId);
      return notification;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar detalles de notificación';
      return rejectWithValue(message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const notification = await notificationsService.markAsRead(notificationId);
      return notification;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al marcar como leída';
      return rejectWithValue(message);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationsService.markAllAsRead();
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al marcar todas como leídas';
      return rejectWithValue(message);
    }
  }
);

export const fetchNotificationsByType = createAsyncThunk(
  'notifications/fetchNotificationsByType',
  async (
    params: { type: NotificationType; pagination?: PaginationParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await notificationsService.getNotificationsByType(
        params.type,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar notificaciones por tipo';
      return rejectWithValue(message);
    }
  }
);

export const fetchRecentNotifications = createAsyncThunk(
  'notifications/fetchRecentNotifications',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await notificationsService.getRecentNotifications(pagination);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar notificaciones recientes';
      return rejectWithValue(message);
    }
  }
);

export const fetchNotificationSettings = createAsyncThunk(
  'notifications/fetchNotificationSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await notificationsService.getNotificationSettings();
      return settings;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar configuración';
      return rejectWithValue(message);
    }
  }
);

export const updateNotificationSettings = createAsyncThunk(
  'notifications/updateNotificationSettings',
  async (settings: Partial<NotificationSettings>, { rejectWithValue }) => {
    try {
      const updatedSettings = await notificationsService.updateNotificationSettings(settings);
      return updatedSettings;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar configuración';
      return rejectWithValue(message);
    }
  }
);

export const fetchNotificationsSummary = createAsyncThunk(
  'notifications/fetchNotificationsSummary',
  async (_, { rejectWithValue }) => {
    try {
      const summary = await notificationsService.getNotificationsSummary();
      return summary;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar resumen';
      return rejectWithValue(message);
    }
  }
);

export const enablePushNotifications = createAsyncThunk(
  'notifications/enablePushNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await notificationsService.enablePushNotifications();
      return settings;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al habilitar notificaciones push';
      return rejectWithValue(message);
    }
  }
);

export const disablePushNotifications = createAsyncThunk(
  'notifications/disablePushNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await notificationsService.disablePushNotifications();
      return settings;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al deshabilitar notificaciones push';
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState: NotificationsState = {
  error: null,
  filters: {
    isRead: undefined,
    limit: 10,
    page: 1,
    type: undefined,
  },
  isLoading: false,
  isLoadingSettings: false,
  isMarkingRead: false,
  isUpdatingSettings: false,
  notifications: [],
  pagination: {
    hasMore: false,
    limit: 10,
    page: 1,
    total: 0,
  },
  selectedNotification: null,
  settings: null,
  summary: null,
  unreadCount: 0,
  unreadNotifications: [],
};

// Slice
const notificationsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Unread Notifications
      .addCase(fetchUnreadNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unreadNotifications = action.payload.data;
      })
      .addCase(fetchUnreadNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Unread Count
      .addCase(fetchUnreadCount.pending, (state) => {
        // No loading state for count (background operation)
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.count;
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Fetch Notification Details
      .addCase(fetchNotificationDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotificationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedNotification = action.payload;
      })
      .addCase(fetchNotificationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Mark Notification as Read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.isMarkingRead = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.isMarkingRead = false;
        // Update notification in lists
        const updateNotificationInArray = (notifications: Notification[]) => {
          const index = notifications.findIndex((n) => n.id === action.payload.id);
          if (index !== -1) {
            return [
              ...notifications.slice(0, index),
              action.payload,
              ...notifications.slice(index + 1),
            ];
          }
          return notifications;
        };
        state.notifications = updateNotificationInArray(state.notifications);
        state.unreadNotifications = updateNotificationInArray(state.unreadNotifications);

        // Update selected notification
        if (state.selectedNotification?.id === action.payload.id) {
          state.selectedNotification = action.payload;
        }

        // Decrement unread count if notification was marked as read
        if (!action.payload.isRead && state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.isMarkingRead = false;
        state.error = action.payload as string;
      })
      // Mark All as Read
      .addCase(markAllAsRead.pending, (state) => {
        state.isMarkingRead = true;
      })
      .addCase(markAllAsRead.fulfilled, (state, _action) => {
        state.isMarkingRead = false;
        // Mark all notifications as read
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));
        state.unreadNotifications = [];
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.isMarkingRead = false;
        state.error = action.payload as string;
      })
      // Fetch Notifications by Type
      .addCase(fetchNotificationsByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchNotificationsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Recent Notifications
      .addCase(fetchRecentNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.data;
      })
      .addCase(fetchRecentNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Notification Settings
      .addCase(fetchNotificationSettings.pending, (state) => {
        state.isLoadingSettings = true;
      })
      .addCase(fetchNotificationSettings.fulfilled, (state, action) => {
        state.isLoadingSettings = false;
        state.settings = action.payload;
      })
      .addCase(fetchNotificationSettings.rejected, (state, action) => {
        state.isLoadingSettings = false;
        state.error = action.payload as string;
      })
      // Update Notification Settings
      .addCase(updateNotificationSettings.pending, (state) => {
        state.isUpdatingSettings = true;
        state.error = null;
      })
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.isUpdatingSettings = false;
        state.settings = action.payload;
      })
      .addCase(updateNotificationSettings.rejected, (state, action) => {
        state.isUpdatingSettings = false;
        state.error = action.payload as string;
      })
      // Fetch Notifications Summary
      .addCase(fetchNotificationsSummary.pending, (_state) => {
        // Background operation, no loading state
      })
      .addCase(fetchNotificationsSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.unreadCount = action.payload.unread;
      })
      .addCase(fetchNotificationsSummary.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Enable Push Notifications
      .addCase(enablePushNotifications.pending, (state) => {
        state.isUpdatingSettings = true;
      })
      .addCase(enablePushNotifications.fulfilled, (state, action) => {
        state.isUpdatingSettings = false;
        state.settings = action.payload;
      })
      .addCase(enablePushNotifications.rejected, (state, action) => {
        state.isUpdatingSettings = false;
        state.error = action.payload as string;
      })
      // Disable Push Notifications
      .addCase(disablePushNotifications.pending, (state) => {
        state.isUpdatingSettings = true;
      })
      .addCase(disablePushNotifications.fulfilled, (state, action) => {
        state.isUpdatingSettings = false;
        state.settings = action.payload;
      })
      .addCase(disablePushNotifications.rejected, (state, action) => {
        state.isUpdatingSettings = false;
        state.error = action.payload as string;
      });
  },
  initialState,
  name: 'notifications',
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    setSelectedNotification: (state, action: PayloadAction<Notification | null>) => {
      state.selectedNotification = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<NotificationFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  clearError,
  clearFilters,
  decrementUnreadCount,
  resetUnreadCount,
  setSelectedNotification,
  updateFilters,
} = notificationsSlice.actions;

// Selectors
export const selectNotifications = (state: { notifications: NotificationsState }) =>
  state.notifications;
export const selectNotificationsList = (state: { notifications: NotificationsState }) =>
  state.notifications.notifications;
export const selectUnreadNotifications = (state: { notifications: NotificationsState }) =>
  state.notifications.unreadNotifications;
export const selectSelectedNotification = (state: { notifications: NotificationsState }) =>
  state.notifications.selectedNotification;
export const selectNotificationSettings = (state: { notifications: NotificationsState }) =>
  state.notifications.settings;
export const selectUnreadCount = (state: { notifications: NotificationsState }) =>
  state.notifications.unreadCount;
export const selectNotificationsSummary = (state: { notifications: NotificationsState }) =>
  state.notifications.summary;
export const selectNotificationsLoading = (state: { notifications: NotificationsState }) =>
  state.notifications.isLoading;
export const selectNotificationsSettingsLoading = (state: { notifications: NotificationsState }) =>
  state.notifications.isLoadingSettings;
export const selectNotificationsUpdatingSettings = (state: { notifications: NotificationsState }) =>
  state.notifications.isUpdatingSettings;
export const selectNotificationsMarkingRead = (state: { notifications: NotificationsState }) =>
  state.notifications.isMarkingRead;
export const selectNotificationsError = (state: { notifications: NotificationsState }) =>
  state.notifications.error;
export const selectNotificationsFilters = (state: { notifications: NotificationsState }) =>
  state.notifications.filters;
export const selectNotificationsPagination = (state: { notifications: NotificationsState }) =>
  state.notifications.pagination;

export { notificationsSlice };
export default notificationsSlice.reducer;
