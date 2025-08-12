import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Container and Layout
export const Container = styled.View`
  background-color: ${theme.colors.gray[50]};
  flex: 1;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

// Header
export const Header = styled(LinearGradient).attrs({
  colors: [theme.colors.primary[600], theme.colors.primary[500]],
  end: { x: 1, y: 1 },
  start: { x: 0, y: 0 },
})`
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
`;

export const HeaderContent = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderLeft = styled.View`
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const HeaderSubtitle = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  opacity: 0.9;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
`;

export const HeaderButton = styled.TouchableOpacity`
  align-items: center;
  background-color: rgb(255 255 255 / 0.2);
  border-radius: ${theme.borderRadius.full}px;
  height: 40px;
  justify-content: center;
  padding: ${theme.spacing.sm}px;
  width: 40px;
`;

// Stats Cards
export const StatsContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
  margin: -${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
`;

export const StatCard = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  ${theme.shadows.sm}
`;

export const StatNumber = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const StatLabel = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
  text-align: center;
`;

// Tabs
export const TabsContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.white};
  margin: 0 ${theme.spacing.lg}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.xs}px;
  ${theme.shadows.sm}
`;

export const TabButton = styled.TouchableOpacity<{ $isActive: boolean }>`
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? theme.colors.primary[500] : 'transparent')};
  border-radius: ${theme.borderRadius.md}px;
  flex: 1;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

export const TabButtonText = styled.Text<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? theme.colors.white : theme.colors.gray[600])};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
`;

// Search
export const SearchContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
  padding: 0 ${theme.spacing.lg}px;
`;

export const SearchBar = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  flex-direction: row;
  align-items: center;
  ${theme.shadows.sm}
`;

export const SearchInput = styled.TextInput`
  color: ${theme.colors.gray[900]};
  flex: 1;
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  margin-left: ${theme.spacing.sm}px;
`;

// Content
export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 ${theme.spacing.lg}px;
`;

// Notification Groups
export const NotificationsList = styled.SectionList`
  flex: 1;
`;

export const DateHeader = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px 0;
`;

export const DateHeaderText = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
`;

// Notification Cards
export const NotificationCard = styled.TouchableOpacity<{ $isRead: boolean }>`
  background-color: ${({ $isRead }) => ($isRead ? theme.colors.white : theme.colors.primary[25])};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: flex-start;
  ${theme.shadows.sm}
`;

export const NotificationIconContainer = styled.View<{ $color: string }>`
  align-items: center;
  background-color: ${({ $color }) => $color}20;
  border-radius: ${theme.borderRadius.md}px;
  height: 48px;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: 48px;
`;

export const NotificationContent = styled.View`
  flex: 1;
`;

export const NotificationHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const NotificationTitle = styled.Text<{ $isRead: boolean }>`
  color: ${theme.colors.gray[900]};
  flex: 1;
  font-family: ${({ $isRead }) =>
    $isRead
      ? theme.typography.fontFamily.primary.medium
      : theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${({ $isRead }) => ($isRead ? '500' : '600')};
  margin-bottom: ${theme.spacing.xs}px;
  margin-right: ${theme.spacing.sm}px;
`;

export const NotificationTime = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
`;

export const NotificationMessage = styled.Text<{ $isRead: boolean }>`
  color: ${({ $isRead }) => ($isRead ? theme.colors.gray[600] : theme.colors.gray[700])};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 20px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const NotificationFooter = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const NotificationBadges = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.xs}px;
`;

export const NotificationBadge = styled.View<{ $color: string }>`
  background-color: ${({ $color }) => $color}20;
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const NotificationBadgeText = styled.Text<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

export const NotificationActions = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
`;

export const NotificationAction = styled.TouchableOpacity`
  background-color: ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const NotificationActionText = styled.Text`
  color: ${theme.colors.primary[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

// Unread Indicator
export const UnreadIndicator = styled.View`
  background-color: ${theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.full}px;
  height: 8px;
  position: absolute;
  right: ${theme.spacing.sm}px;
  top: ${theme.spacing.sm}px;
  width: 8px;
`;

// Empty State
export const EmptyState = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 300px;
  padding: ${theme.spacing.xl}px;
`;

export const EmptyStateTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

export const EmptyStateText = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  line-height: 22px;
  text-align: center;
`;

// Floating Action Button
export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${theme.spacing.xl}px;
  right: ${theme.spacing.lg}px;
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.full}px;
  background-color: ${theme.colors.primary[600]};
  justify-content: center;
  align-items: center;
  ${theme.shadows.lg}
`;
