import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f8f9fa;
  flex: 1;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const LoadingText = styled.Text`
  color: #666;
  font-size: 16px;
  margin-top: 10px;
`;

export const ErrorContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const ErrorText = styled.Text`
  color: #dc3545;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: #ff8a00;
  border-radius: 8px;
  padding: 12px 24px;
`;

export const RetryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 40px 20px;
`;

export const EmptyIcon = styled.View`
  margin-bottom: 16px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
`;

export const EmptyText = styled.Text`
  color: #666;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const NotificationsList = styled.FlatList`
  flex: 1;
` as any;

export const NotificationItem = styled.TouchableOpacity<{ isRead: boolean }>`
  background-color: ${(props) => (props.isRead ? '#ffffff' : '#f0f8ff')};
  border-left-color: ${(props) => (props.isRead ? 'transparent' : '#ff8a00')};
  border-left-width: 4px;
  border-radius: 12px;
  elevation: 2;
  margin-bottom: 16px;
  margin-horizontal: 16px;
  margin-vertical: 4px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const NotificationHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const NotificationTitle = styled.Text<{ isRead: boolean }>`
  color: ${(props) => (props.isRead ? '#333' : '#1a1a1a')};
  flex: 1;
  font-size: 16px;
  font-weight: ${(props) => (props.isRead ? '500' : '600')};
  margin-right: 8px;
`;

export const NotificationTime = styled.Text`
  color: #999;
  font-size: 12px;
  font-weight: 400;
`;

export const NotificationMessage = styled.Text<{ isRead: boolean }>`
  color: ${(props) => (props.isRead ? '#666' : '#333')};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const NotificationFooter = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const NotificationBadge = styled.View<{ type: string }>`
  align-self: flex-start;
  background-color: ${(props) => {
    switch (props.type) {
      case 'RESERVATION_CONFIRMATION':
        return '#28a745';
      case 'RESERVATION_CANCELLATION':
        return '#dc3545';
      case 'PAYMENT_CONFIRMATION':
        return '#17a2b8';
      case 'CHECKIN_REMINDER':
        return '#ffc107';
      case 'SYSTEM_ALERT':
        return '#6f42c1';
      case 'PROMOTION':
        return '#fd7e14';
      default:
        return '#6c757d';
    }
  }};
  border-radius: 12px;
  padding: 4px 8px;
`;

export const NotificationBadgeText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const UnreadIndicator = styled.View`
  background-color: #ff8a00;
  border-radius: 4px;
  height: 8px;
  width: 8px;
`;

export const Header = styled.View`
  background-color: white;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  elevation: 2;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const HeaderTitle = styled.Text`
  color: #333;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

export const HeaderSubtitle = styled.Text`
  color: #666;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
`;
