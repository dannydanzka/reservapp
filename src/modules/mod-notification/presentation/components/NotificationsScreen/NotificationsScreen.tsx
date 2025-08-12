import React, { useCallback, useEffect, useState } from 'react';

import { Alert, FlatList, RefreshControl } from 'react-native';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  MoreVertical,
} from 'lucide-react-native';
import styled from 'styled-components/native';

import { Badge } from '@components/Badge';
import { Button } from '@components/Form/Button';
import {
  clearNotifications,
  fetchNotifications,
  markAllAsRead,
  markAsRead,
} from '@store/slices/notificationsSlice';
import { LoadingSpinner } from '@components/LoadingSpinner';
import type { Notification, NotificationType } from '@types';
import { ScreenLayout } from '@layouts';
import { theme } from '@presentation/styles/theme';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useI18n } from '@hooks/useI18n';

interface NotificationsScreenProps {
  navigation: any;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const { error, loading, notifications, unreadCount } = useAppSelector(
    (state) => state.notifications
  );

  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>('all');

  // Load notifications
  useEffect(() => {
    handleLoadNotifications();
  }, []);

  const handleLoadNotifications = useCallback(async () => {
    try {
      await dispatch(
        fetchNotifications({
          isRead: selectedFilter === 'unread' ? false : undefined,
          limit: 50,
          page: 1,
        })
      ).unwrap();
    } catch (err) {
      Alert.alert(t('error.title'), t('notifications.errors.loadFailed'));
    }
  }, [dispatch, selectedFilter, t]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await handleLoadNotifications();
    } finally {
      setRefreshing(false);
    }
  }, [handleLoadNotifications]);

  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await dispatch(markAsRead(notificationId)).unwrap();
      } catch (err) {
        // Handle error silently
      }
    },
    [dispatch]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await dispatch(markAllAsRead()).unwrap();
    } catch (err) {
      Alert.alert(t('error.title'), t('notifications.errors.markAllReadFailed'));
    }
  }, [dispatch, t]);

  const handleNotificationPress = useCallback(
    (notification: Notification) => {
      // Mark as read if unread
      if (!notification.isRead) {
        handleMarkAsRead(notification.id);
      }

      // Navigate based on notification type and metadata
      if (notification.metadata) {
        switch (notification.type) {
          case 'RESERVATION_CONFIRMATION':
            if (notification.metadata.reservationId) {
              navigation.navigate('ReservationDetails', {
                reservationId: notification.metadata.reservationId,
              });
            }
            break;

          case 'PAYMENT_CONFIRMATION':
            if (notification.metadata.paymentId) {
              navigation.navigate('PaymentDetails', {
                paymentId: notification.metadata.paymentId,
              });
            }
            break;

          case 'VENUE_PROMOTION':
            if (notification.metadata.venueId) {
              navigation.navigate('VenueDetails', {
                venueId: notification.metadata.venueId,
              });
            }
            break;

          default:
            // For other types, show notification detail modal or screen
            break;
        }
      }
    },
    [handleMarkAsRead, navigation]
  );

  const getNotificationIcon = (type: NotificationType) => {
    const iconSize = 20;
    const iconColor = theme.colors.primary[500];

    switch (type) {
      case 'RESERVATION_CONFIRMATION':
        return <Calendar color={iconColor} size={iconSize} />;
      case 'RESERVATION_CANCELLATION':
        return <AlertCircle color={theme.colors.error[500]} size={iconSize} />;
      case 'PAYMENT_CONFIRMATION':
        return <DollarSign color={theme.colors.success[500]} size={iconSize} />;
      case 'CHECKIN_REMINDER':
        return <Clock color={theme.colors.warning[500]} size={iconSize} />;
      case 'SYSTEM_ALERT':
        return <AlertCircle color={theme.colors.error[500]} size={iconSize} />;
      case 'PROMOTION':
        return <Info color={theme.colors.info[500]} size={iconSize} />;
      default:
        return <Bell color={iconColor} size={iconSize} />;
    }
  };

  const formatNotificationTime = (createdAt: string): string => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return t('time.justNow');
    if (diffMins < 60) return t('time.minutesAgo', { count: diffMins });
    if (diffHours < 24) return t('time.hoursAgo', { count: diffHours });
    if (diffDays < 7) return t('time.daysAgo', { count: diffDays });

    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
    });
  };

  const filteredNotifications =
    selectedFilter === 'all' ? notifications : notifications.filter((n) => !n.isRead);

  const renderNotification = useCallback(
    ({ item = null }: { item: Notification }) => (
      <NotificationCard isRead={item.isRead} onPress={() => handleNotificationPress(item)}>
        <NotificationIcon>
          {getNotificationIcon(item.type)}
          {!item.isRead && <UnreadDot />}
        </NotificationIcon>

        <NotificationContent>
          <NotificationHeader>
            <NotificationTitle isRead={item.isRead} numberOfLines={2}>
              {item.title}
            </NotificationTitle>
            <NotificationTime>{formatNotificationTime(item.createdAt)}</NotificationTime>
          </NotificationHeader>

          <NotificationMessage isRead={item.isRead} numberOfLines={3}>
            {item.message}
          </NotificationMessage>

          {item.metadata && (item.metadata.venueName || item.metadata.amount) && (
            <NotificationMeta>
              {item.metadata.venueName && (
                <NotificationMetaText>
                  📍
                  {item.metadata.venueName}
                </NotificationMetaText>
              )}
              {item.metadata.amount && (
                <NotificationMetaText>💰 ${item.metadata.amount}</NotificationMetaText>
              )}
            </NotificationMeta>
          )}
        </NotificationContent>

        <NotificationActions>
          <ActionButton>
            <MoreVertical color={theme.colors.gray[400]} size={16} />
          </ActionButton>
        </NotificationActions>
      </NotificationCard>
    ),
    [handleNotificationPress, formatNotificationTime, getNotificationIcon]
  );

  const renderEmpty = useCallback(
    () => (
      <EmptyContainer>
        <EmptyIcon>
          <Bell color={theme.colors.gray[300]} size={64} />
        </EmptyIcon>
        <EmptyTitle>
          {selectedFilter === 'unread'
            ? t('notifications.empty.noUnread')
            : t('notifications.empty.noNotifications')}
        </EmptyTitle>
        <EmptyMessage>
          {selectedFilter === 'unread'
            ? t('notifications.empty.allReadMessage')
            : t('notifications.empty.defaultMessage')}
        </EmptyMessage>
      </EmptyContainer>
    ),
    [selectedFilter, t]
  );

  if (loading && notifications.length === 0) {
    return (
      <ScreenLayout>
        <LoadingSpinner />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Header>
        <HeaderLeft>
          <BackButton onPress={() => navigation.goBack()}>
            <ArrowLeft color={theme.colors.primary[500]} size={24} />
          </BackButton>
        </HeaderLeft>

        <HeaderCenter>
          <HeaderTitle>{t('notifications.title')}</HeaderTitle>
          {unreadCount > 0 && (
            <UnreadBadge>
              <Badge size='small' text={unreadCount.toString()} variant='error' />
            </UnreadBadge>
          )}
        </HeaderCenter>

        <HeaderRight />
      </Header>

      <FilterSection>
        <FilterButtons>
          <FilterButton active={selectedFilter === 'all'} onPress={() => setSelectedFilter('all')}>
            <FilterButtonText active={selectedFilter === 'all'}>
              {t('notifications.filter.all')} ({notifications.length})
            </FilterButtonText>
          </FilterButton>

          <FilterButton
            active={selectedFilter === 'unread'}
            onPress={() => setSelectedFilter('unread')}
          >
            <FilterButtonText active={selectedFilter === 'unread'}>
              {t('notifications.filter.unread')} ({unreadCount})
            </FilterButtonText>
          </FilterButton>
        </FilterButtons>

        {unreadCount > 0 && (
          <MarkAllButton onPress={handleMarkAllAsRead}>
            <CheckCircle color={theme.colors.success[500]} size={16} />
            <MarkAllButtonText>{t('notifications.markAllRead')}</MarkAllButtonText>
          </MarkAllButton>
        )}
      </FilterSection>

      <NotificationsList>
        <FlatList
          contentContainerStyle={{
            flexGrow: filteredNotifications.length === 0 ? 1 : undefined,
            paddingBottom: 20,
          }}
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary[500]]}
              refreshing={refreshing}
              tintColor={theme.colors.primary[500]}
              onRefresh={handleRefresh}
            />
          }
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
        />
      </NotificationsList>
    </ScreenLayout>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const HeaderLeft = styled.View`
  width: 44px;
`;

const HeaderCenter = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const HeaderRight = styled.View`
  width: 44px;
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const UnreadBadge = styled.View`
  margin-left: 8px;
`;

const FilterSection = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const FilterButtons = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
`;

const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 20px;
  align-items: center;
  background-color: ${({ active }) =>
    active ? theme.colors.primary[500] : theme.colors.gray[100]};
`;

const FilterButtonText = styled.Text<{ active: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${({ active }) => (active ? theme.colors.white : theme.colors.text.secondary)};
`;

const MarkAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  align-self: flex-end;
`;

const MarkAllButtonText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.success[600]};
  font-weight: 500;
`;

const NotificationsList = styled.View`
  flex: 1;
`;

const NotificationCard = styled.TouchableOpacity<{ isRead: boolean }>`
  flex-direction: row;
  background-color: ${({ isRead }) => (isRead ? theme.colors.white : theme.colors.primary[25])};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

const NotificationIcon = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  position: relative;
`;

const UnreadDot = styled.View`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${theme.colors.error[500]};
  border: 2px solid ${theme.colors.white};
`;

const NotificationContent = styled.View`
  flex: 1;
`;

const NotificationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const NotificationTitle = styled.Text<{ isRead: boolean }>`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${({ isRead }) => (isRead ? '500' : '600')};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: 8px;
`;

const NotificationTime = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.tertiary};
`;

const NotificationMessage = styled.Text<{ isRead: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${({ isRead }) => (isRead ? theme.colors.text.secondary : theme.colors.text.primary)};
  line-height: 20px;
  margin-bottom: 8px;
`;

const NotificationMeta = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const NotificationMetaText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.tertiary};
`;

const NotificationActions = styled.View`
  width: 32px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 4px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.View`
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
  text-align: center;
`;

const EmptyMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
`;

export default NotificationsScreen;
