import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Types
export interface AppNotification {
  id: string;
  userId: string;
  type: 'reservation' | 'promotion' | 'payment' | 'reminder' | 'system' | 'review';
  title: string;
  message: string;
  data?: Record<string, any>; // Datos adicionales (reservationId, etc.)
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string; // Para navegación al tocar notificación
  imageUrl?: string;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
}

export interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    reservations: boolean;
    promotions: boolean;
    reminders: boolean;
    payments: boolean;
    system: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // "22:00"
    endTime: string; // "08:00"
  };
}

export interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
  settings: NotificationSettings;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  filters: {
    type: string[];
    isRead: boolean | null;
    priority: string[];
  };
}

// Async Thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (params: { 
    page?: number; 
    limit?: number; 
    filters?: Partial<NotificationsState['filters']> 
  } = {}) => {
    // TODO: Implementar llamada a API real
    // return await notificationService.getNotifications(params);
    
    // Mock data
    const mockNotifications: AppNotification[] = [
      {
        id: '1',
        userId: 'user123',
        type: 'reservation',
        title: 'Reservación Confirmada',
        message: 'Tu reservación para "Salón Elegante Vista" el 20 de enero ha sido confirmada.',
        data: { reservationId: '1', venueId: 'venue1' },
        isRead: false,
        priority: 'high',
        actionUrl: '/reservations/1',
        imageUrl: 'https://example.com/venue1-thumb.jpg',
        createdAt: '2025-01-08T10:30:00Z'
      },
      {
        id: '2',
        userId: 'user123',
        type: 'promotion',
        title: '🎉 15% de Descuento',
        message: 'Aprovecha nuestro descuento especial en eventos premium. Válido hasta el 31 de marzo.',
        data: { promotionId: 'promo1', discountPercent: 15 },
        isRead: false,
        priority: 'medium',
        actionUrl: '/services?promo=promo1',
        imageUrl: 'https://example.com/promotion-banner.jpg',
        createdAt: '2025-01-07T14:00:00Z',
        expiresAt: '2025-03-31T23:59:59Z'
      },
      {
        id: '3',
        userId: 'user123',
        type: 'reminder',
        title: 'Recordatorio: Evento Mañana',
        message: 'No olvides tu evento en "Salón Elegante Vista" mañana a las 18:00.',
        data: { reservationId: '1', reminderType: '24h' },
        isRead: true,
        priority: 'high',
        actionUrl: '/reservations/1',
        createdAt: '2025-01-07T18:00:00Z',
        readAt: '2025-01-07T18:05:00Z'
      },
      {
        id: '4',
        userId: 'user123',
        type: 'payment',
        title: 'Pago Procesado',
        message: 'Tu pago de $10,000 MXN ha sido procesado exitosamente.',
        data: { paymentId: 'pay123', amount: 10000 },
        isRead: true,
        priority: 'medium',
        actionUrl: '/payments/pay123',
        createdAt: '2025-01-06T16:20:00Z',
        readAt: '2025-01-06T17:00:00Z'
      },
      {
        id: '5',
        userId: 'user123',
        type: 'review',
        title: 'Califica tu Experiencia',
        message: 'Ayúdanos a mejorar. Califica tu experiencia en "Terraza Jardín".',
        data: { reservationId: '2', venueId: 'venue2' },
        isRead: false,
        priority: 'low',
        actionUrl: '/reservations/2/review',
        createdAt: '2025-01-05T20:00:00Z'
      }
    ];

    return {
      notifications: mockNotifications,
      totalCount: mockNotifications.length,
      unreadCount: mockNotifications.filter(n => !n.isRead).length
    };
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string) => {
    // TODO: Implementar llamada a API real
    // return await notificationService.markAsRead(notificationId);
    
    return {
      id: notificationId,
      isRead: true,
      readAt: new Date().toISOString()
    };
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async () => {
    // TODO: Implementar llamada a API real
    // return await notificationService.markAllAsRead();
    
    const now = new Date().toISOString();
    return { readAt: now };
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId: string) => {
    // TODO: Implementar llamada a API real
    // await notificationService.deleteNotification(notificationId);
    
    return notificationId;
  }
);

export const updateNotificationSettings = createAsyncThunk(
  'notifications/updateSettings',
  async (settings: Partial<NotificationSettings>) => {
    // TODO: Implementar llamada a API real
    // return await notificationService.updateSettings(settings);
    
    return settings;
  }
);

// Initial State
const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  settings: {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    categories: {
      reservations: true,
      promotions: true,
      reminders: true,
      payments: true,
      system: true
    },
    quietHours: {
      enabled: true,
      startTime: '22:00',
      endTime: '08:00'
    }
  },
  isLoading: false,
  isUpdating: false,
  error: null,
  filters: {
    type: [],
    isRead: null,
    priority: []
  }
};

// Slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Agregar notificación local (por ejemplo, desde push notification)
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    // Marcar como leída localmente
    markAsReadLocal: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        notification.readAt = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    // Eliminar notificación localmente
    removeNotificationLocal: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        state.notifications.splice(index, 1);
        if (!notification.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    // Limpiar notificaciones expiradas
    clearExpiredNotifications: (state) => {
      const now = new Date().toISOString();
      const expiredIds: string[] = [];
      
      state.notifications = state.notifications.filter(notification => {
        if (notification.expiresAt && notification.expiresAt < now) {
          expiredIds.push(notification.id);
          if (!notification.isRead) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          return false;
        }
        return true;
      });
    },
    // Actualizar filtros
    updateFilters: (state, action: PayloadAction<Partial<NotificationsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Limpiar filtros
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar notificaciones';
      })
      // Mark as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload.id);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          notification.readAt = action.payload.readAt;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Mark All as Read
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.notifications.forEach(notification => {
          if (!notification.isRead) {
            notification.isRead = true;
            notification.readAt = action.payload.readAt;
          }
        });
        state.unreadCount = 0;
      })
      // Delete Notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
          const notification = state.notifications[index];
          state.notifications.splice(index, 1);
          if (!notification.isRead) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
        }
      })
      // Update Settings
      .addCase(updateNotificationSettings.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.settings = { ...state.settings, ...action.payload };
      })
      .addCase(updateNotificationSettings.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message || 'Error al actualizar configuración';
      });
  }
});

export const {
  addNotification,
  markAsReadLocal,
  removeNotificationLocal,
  clearExpiredNotifications,
  updateFilters,
  clearFilters,
  clearError
} = notificationsSlice.actions;

export { notificationsSlice };
export default notificationsSlice.reducer;