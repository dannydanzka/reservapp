import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, RefreshControl } from 'react-native';
import { Bell } from 'lucide-react-native';

import { fetchNotifications } from '../../../../../libs/infrastructure/state/slices/notificationsSlice';
import { Notification } from '../../../../../libs/shared/types/api';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  Container,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  EmptyTitle,
  ErrorContainer,
  ErrorText,
  Header,
  HeaderSubtitle,
  HeaderTitle,
  LoadingContainer,
  LoadingText,
  NotificationBadge,
  NotificationBadgeText,
  NotificationFooter,
  NotificationHeader,
  NotificationItem,
  NotificationMessage,
  NotificationsList,
  NotificationTime,
  NotificationTitle,
  RetryButton,
  RetryButtonText,
  UnreadIndicator,
} from './NotificationsScreen.styled';

export const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, notifications, pagination } = useAppSelector(
    (state) => state.notifications
  );

  // Check auth state
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [refreshing, setRefreshing] = useState(false);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await dispatch(
        fetchNotifications({
          pagination: { limit: 20, page: 1 },
        })
      ).unwrap();
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, [loadNotifications]);

  const handleRetry = useCallback(() => {
    loadNotifications();
  }, [loadNotifications]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return date.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffDays <= 7) {
      return `${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
      });
    }
  }, []);

  const getNotificationTypeLabel = useCallback((type: string) => {
    const labels: Record<string, string> = {
      CHECKIN_REMINDER: 'Recordatorio',
      PAYMENT_CONFIRMATION: 'Pago',
      PROMOTION: 'Promoción',
      RESERVATION_CANCELLATION: 'Cancelación',
      RESERVATION_CONFIRMATION: 'Reserva',
      SYSTEM_ALERT: 'Sistema',
    };
    return labels[type] || type;
  }, []);

  const renderNotificationItem = useCallback(
    ({ item }: { item: Notification }) => (
      <NotificationItem
        activeOpacity={0.7}
        isRead={item.isRead}
        onPress={() => {
          // TODO: Implementar navegación a detalles si es necesario
          console.log('Notification pressed:', item.id, item.title);
        }}
      >
        <NotificationHeader>
          <NotificationTitle isRead={item.isRead} numberOfLines={1}>
            {item.title}
          </NotificationTitle>
          <NotificationTime>{formatDate(item.createdAt)}</NotificationTime>
        </NotificationHeader>

        <NotificationMessage isRead={item.isRead} numberOfLines={3}>
          {item.message}
        </NotificationMessage>

        <NotificationFooter>
          <NotificationBadge type={item.type}>
            <NotificationBadgeText>{getNotificationTypeLabel(item.type)}</NotificationBadgeText>
          </NotificationBadge>

          {!item.isRead && <UnreadIndicator />}
        </NotificationFooter>
      </NotificationItem>
    ),
    [formatDate, getNotificationTypeLabel]
  );

  const renderEmptyState = () => (
    <EmptyContainer>
      <EmptyIcon>
        <Bell color='#ccc' size={48} />
      </EmptyIcon>
      <EmptyTitle>No tienes notificaciones</EmptyTitle>
      <EmptyText>
        Cuando recibas notificaciones sobre tus reservaciones, pagos o promociones, aparecerán aquí.
      </EmptyText>
    </EmptyContainer>
  );

  if (isLoading && !refreshing && notifications.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator color='#FF8A00' size='large' />
          <LoadingText>Cargando notificaciones...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>Inicia sesión para ver tus notificaciones</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
          <RetryButton onPress={handleRetry}>
            <RetryButtonText>Reintentar</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Container>
      <NotificationsList
        contentContainerStyle={notifications.length === 0 ? { flex: 1 } : { paddingVertical: 8 }}
        data={notifications}
        keyExtractor={(item: Notification) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FF8A00']}
            tintColor='#FF8A00'
          />
        }
        renderItem={renderNotificationItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        // TODO: Implementar paginación infinita si es necesario
        // onEndReached={loadMoreNotifications}
        // onEndReachedThreshold={0.3}
      />
    </Container>
  );
};
