export interface NotificationItem {
  id: string;
  type: 'booking' | 'payment' | 'promotion' | 'system' | 'reminder' | 'update';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionable: boolean;
  data?: {
    bookingId?: string;
    transactionId?: string;
    promotionId?: string;
    deepLink?: string;
  };
  icon: string;
  color: string;
}

export interface NotificationGroup {
  date: string;
  notifications: NotificationItem[];
}

export interface NotificationFilters {
  type?: 'all' | 'booking' | 'payment' | 'promotion' | 'system';
  status?: 'all' | 'unread' | 'read';
}

export interface NotificationStats {
  total: number;
  unread: number;
  important: number;
  today: number;
}

export interface NotificationsScreenState {
  notifications: NotificationItem[];
  groupedNotifications: NotificationGroup[];
  filters: NotificationFilters;
  stats: NotificationStats;
  selectedTab: 'all' | 'unread' | 'important';
  isLoading: boolean;
  refreshing: boolean;
  searchQuery: string;
}

export interface NotificationsScreenProps {}
