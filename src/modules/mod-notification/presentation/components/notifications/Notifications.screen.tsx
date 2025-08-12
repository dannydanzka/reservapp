import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  ListRenderItem,
  RefreshControl,
  SectionListData,
} from 'react-native';
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  CreditCard,
  Filter,
  Gift,
  MoreVertical,
  Search,
  Settings,
} from 'lucide-react-native';

import { theme } from '@styles/theme';

import {
  NotificationGroup,
  NotificationItem,
  NotificationsScreenProps,
  NotificationsScreenState,
  NotificationStats,
} from './Notifications.screen.interface';

import * as S from './Notifications.screen.styled';

// Mock data
const MOCK_STATS: NotificationStats = {
  important: 3,
  today: 5,
  total: 24,
  unread: 8,
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    actionable: true,
    data: {
      bookingId: 'booking123',
      deepLink: '/bookings/booking123',
    },
    color: theme.colors.primary[500],
    id: '1',
    icon: 'calendar',
    isRead: false,
    isImportant: true,
    message: 'Tu masaje relajante en Spa Serenity está confirmado para mañana a las 3:00 PM',
    timestamp: '2025-08-09T18:30:00Z',
    title: 'Reserva Confirmada',
    type: 'booking',
  },
  {
    actionable: true,
    data: {
      deepLink: '/wallet/transactions/txn456',
      transactionId: 'txn456',
    },
    color: theme.colors.success[500],
    id: '2',
    icon: 'credit-card',
    isRead: false,
    isImportant: false,
    message: 'Se ha procesado exitosamente tu pago de $850 MXN para Masaje Relajante',
    timestamp: '2025-08-09T16:15:00Z',
    title: 'Pago Procesado',
    type: 'payment',
  },
  {
    actionable: true,
    data: {
      deepLink: '/services/spa?promo=promo789',
      promotionId: 'promo789',
    },
    color: theme.colors.secondary[500],
    id: '3',
    icon: 'gift',
    isRead: true,
    isImportant: false,
    message: '¡50% de descuento en servicios de spa! Válido hasta el 15 de agosto',
    timestamp: '2025-08-09T14:00:00Z',
    title: 'Oferta Especial',
    type: 'promotion',
  },
  {
    actionable: true,
    data: {
      bookingId: 'booking789',
      deepLink: '/bookings/booking789',
    },
    color: theme.colors.warning[500],
    id: '4',
    icon: 'bell',
    isRead: false,
    isImportant: true,
    message: 'Tu cita en La Terraza Gourmet es en 2 horas. ¡No olvides confirmar tu asistencia!',
    timestamp: '2025-08-09T12:00:00Z',
    title: 'Recordatorio de Cita',
    type: 'reminder',
  },
  {
    actionable: false,
    color: theme.colors.gray[500],
    icon: 'settings',
    id: '5',
    isImportant: false,
    isRead: true,
    message: 'Nueva versión de ReservApp disponible con mejoras en rendimiento',
    timestamp: '2025-08-08T20:30:00Z',
    title: 'Actualización Disponible',
    type: 'system',
  },
  {
    actionable: false,
    color: theme.colors.error[500],
    icon: 'alert-circle',
    id: '6',
    isImportant: false,
    isRead: true,
    message:
      'Tu reserva en Beauty Studio ha sido cancelada. Se procesará el reembolso automáticamente',
    timestamp: '2025-08-08T15:45:00Z',
    title: 'Reserva Cancelada',
    type: 'booking',
  },
];

const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  const [state, setState] = useState<NotificationsScreenState>({
    filters: { status: 'all', type: 'all' },
    groupedNotifications: [],
    isLoading: true,
    notifications: [],
    refreshing: false,
    searchQuery: '',
    selectedTab: 'all',
    stats: MOCK_STATS,
  });

  const loadNotifications = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const groupedData = groupNotificationsByDate(MOCK_NOTIFICATIONS);

      setState((prev) => ({
        ...prev,
        groupedNotifications: groupedData,
        isLoading: false,
        notifications: MOCK_NOTIFICATIONS,
      }));
    } catch (error) {
      console.error('Error loading notifications:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const groupNotificationsByDate = (notifications: NotificationItem[]): NotificationGroup[] => {
    const groups: { [key: string]: NotificationItem[] } = {};

    notifications.forEach((notification) => {
      const date = new Date(notification.timestamp);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;
      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Hoy';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Ayer';
      } else {
        dateKey = date.toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(notification);
    });

    return Object.entries(groups).map(([date, notifications]) => ({
      date,
      notifications: notifications.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    }));
  };

  const onRefresh = async () => {
    setState((prev) => ({ ...prev, refreshing: true }));
    await loadNotifications();
    setState((prev) => ({ ...prev, refreshing: false }));
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotificationIcon = (icon: string, color: string) => {
    const iconProps = { color, size: 24 };

    switch (icon) {
      case 'calendar':
        return <Calendar {...iconProps} />;
      case 'credit-card':
        return <CreditCard {...iconProps} />;
      case 'gift':
        return <Gift {...iconProps} />;
      case 'bell':
        return <Bell {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      case 'alert-circle':
        return <AlertCircle {...iconProps} />;
      case 'check-circle':
        return <CheckCircle2 {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'booking':
        return 'Reserva';
      case 'payment':
        return 'Pago';
      case 'promotion':
        return 'Promoción';
      case 'system':
        return 'Sistema';
      case 'reminder':
        return 'Recordatorio';
      case 'update':
        return 'Actualización';
      default:
        return type;
    }
  };

  const handleTabChange = (tab: 'all' | 'unread' | 'important') => {
    setState((prev) => ({ ...prev, selectedTab: tab }));

    // Filter notifications based on selected tab
    const filteredNotifications = MOCK_NOTIFICATIONS.filter((notification) => {
      switch (tab) {
        case 'unread':
          return !notification.isRead;
        case 'important':
          return notification.isImportant;
        default:
          return true;
      }
    });

    const groupedData = groupNotificationsByDate(filteredNotifications);
    setState((prev) => ({ ...prev, groupedNotifications: groupedData }));
  };

  const handleNotificationPress = (notification: NotificationItem) => {
    // Handle notification press

    // Mark as read
    if (!notification.isRead) {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notification.id ? { ...n, isRead: true } : n
        ),
        stats: {
          ...prev.stats,
          unread: prev.stats.unread - 1,
        },
      }));
    }

    // Handle deep linking or actions
    if (notification.data?.deepLink) {
      // TODO: Implement deep link navigation
    }
  };

  const handleMarkAllAsRead = () => {
    Alert.alert('Marcar como Leídas', '¿Marcar todas las notificaciones como leídas?', [
      { style: 'cancel', text: 'Cancelar' },
      {
        onPress: () => {
          setState((prev) => ({
            ...prev,
            notifications: prev.notifications.map((n) => ({
              ...n,
              isRead: true,
            })),
            stats: { ...prev.stats, unread: 0 },
          }));
        },
        text: 'Marcar',
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('Limpiar Notificaciones', '¿Eliminar todas las notificaciones leídas?', [
      { style: 'cancel', text: 'Cancelar' },
      {
        onPress: () => {
          const unreadNotifications = state.notifications.filter((n) => !n.isRead);
          const groupedData = groupNotificationsByDate(unreadNotifications);

          setState((prev) => ({
            ...prev,
            groupedNotifications: groupedData,
            notifications: unreadNotifications,
            stats: {
              ...prev.stats,
              total: unreadNotifications.length,
            },
          }));
        },
        style: 'destructive',
        text: 'Eliminar',
      },
    ]);
  };

  const renderNotification: ListRenderItem<NotificationItem> = ({ item }) => (
    <S.NotificationCard $isRead={item.isRead} onPress={() => handleNotificationPress(item)}>
      <S.NotificationIconContainer $color={item.color}>
        {getNotificationIcon(item.icon, item.color)}
      </S.NotificationIconContainer>

      <S.NotificationContent>
        <S.NotificationHeader>
          <S.NotificationTitle $isRead={item.isRead}>{item.title}</S.NotificationTitle>
          <S.NotificationTime>{formatTime(item.timestamp)}</S.NotificationTime>
        </S.NotificationHeader>

        <S.NotificationMessage $isRead={item.isRead}>{item.message}</S.NotificationMessage>

        <S.NotificationFooter>
          <S.NotificationBadges>
            <S.NotificationBadge $color={item.color}>
              <S.NotificationBadgeText $color={item.color}>
                {getTypeLabel(item.type)}
              </S.NotificationBadgeText>
            </S.NotificationBadge>
            {item.isImportant && (
              <S.NotificationBadge $color={theme.colors.warning[500]}>
                <S.NotificationBadgeText $color={theme.colors.warning[500]}>
                  Importante
                </S.NotificationBadgeText>
              </S.NotificationBadge>
            )}
          </S.NotificationBadges>

          {item.actionable && (
            <S.NotificationActions>
              <S.NotificationAction>
                <S.NotificationActionText>Ver Detalles</S.NotificationActionText>
              </S.NotificationAction>
            </S.NotificationActions>
          )}
        </S.NotificationFooter>
      </S.NotificationContent>

      {!item.isRead && <S.UnreadIndicator />}
    </S.NotificationCard>
  );

  const renderSectionHeader = ({ section }: { section: SectionListData<NotificationItem> }) => (
    <S.DateHeader>
      <S.DateHeaderText>{section.date}</S.DateHeaderText>
    </S.DateHeader>
  );

  useEffect(() => {
    loadNotifications();
  }, []);

  if (state.isLoading && state.notifications.length === 0) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary[500]} size='large' />
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderContent>
          <S.HeaderLeft>
            <S.HeaderTitle>Notificaciones</S.HeaderTitle>
            <S.HeaderSubtitle>Mantente al día con tus reservas</S.HeaderSubtitle>
          </S.HeaderLeft>
          <S.HeaderActions>
            <S.HeaderButton onPress={handleMarkAllAsRead}>
              <CheckCircle2 color={theme.colors.white} size={20} />
            </S.HeaderButton>
            <S.HeaderButton onPress={handleClearAll}>
              <MoreVertical color={theme.colors.white} size={20} />
            </S.HeaderButton>
          </S.HeaderActions>
        </S.HeaderContent>
      </S.Header>

      {/* Stats Cards */}
      <S.StatsContainer>
        <S.StatCard onPress={() => handleTabChange('all')}>
          <S.StatNumber>{state.stats.total}</S.StatNumber>
          <S.StatLabel>Total</S.StatLabel>
        </S.StatCard>
        <S.StatCard onPress={() => handleTabChange('unread')}>
          <S.StatNumber>{state.stats.unread}</S.StatNumber>
          <S.StatLabel>Sin Leer</S.StatLabel>
        </S.StatCard>
        <S.StatCard onPress={() => handleTabChange('important')}>
          <S.StatNumber>{state.stats.important}</S.StatNumber>
          <S.StatLabel>Importantes</S.StatLabel>
        </S.StatCard>
      </S.StatsContainer>

      {/* Tabs */}
      <S.TabsContainer>
        <S.TabButton $isActive={state.selectedTab === 'all'} onPress={() => handleTabChange('all')}>
          <S.TabButtonText $isActive={state.selectedTab === 'all'}>Todas</S.TabButtonText>
        </S.TabButton>
        <S.TabButton
          $isActive={state.selectedTab === 'unread'}
          onPress={() => handleTabChange('unread')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'unread'}>Sin Leer</S.TabButtonText>
        </S.TabButton>
        <S.TabButton
          $isActive={state.selectedTab === 'important'}
          onPress={() => handleTabChange('important')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'important'}>
            Importantes
          </S.TabButtonText>
        </S.TabButton>
      </S.TabsContainer>

      {/* Search */}
      <S.SearchContainer>
        <S.SearchBar>
          <Search color={theme.colors.gray[400]} size={20} />
          <S.SearchInput
            placeholder='Buscar notificaciones...'
            value={state.searchQuery}
            onChangeText={(text) => setState((prev) => ({ ...prev, searchQuery: text }))}
          />
          <Filter color={theme.colors.gray[400]} size={20} />
        </S.SearchBar>
      </S.SearchContainer>

      {/* Content */}
      <S.ContentContainer>
        {state.groupedNotifications.length > 0 ? (
          <S.NotificationsList
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
            renderItem={renderNotification}
            renderSectionHeader={renderSectionHeader}
            sections={state.groupedNotifications}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <S.EmptyState>
            <Bell color={theme.colors.gray[300]} size={48} />
            <S.EmptyStateTitle>Sin Notificaciones</S.EmptyStateTitle>
            <S.EmptyStateText>
              No tienes notificaciones en este momento.
              {'\n'}
              Te avisaremos cuando haya novedades sobre tus reservas.
            </S.EmptyStateText>
          </S.EmptyState>
        )}
      </S.ContentContainer>

      {/* Floating Button */}
      <S.FloatingButton
        onPress={() => {
          /* TODO: Open notification settings */
        }}
      >
        <Settings color={theme.colors.white} size={24} />
      </S.FloatingButton>
    </S.Container>
  );
};

export default NotificationsScreen;
