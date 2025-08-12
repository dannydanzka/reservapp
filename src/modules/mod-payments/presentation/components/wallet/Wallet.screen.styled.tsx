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

// Balance Card
export const BalanceCard = styled(LinearGradient).attrs({
  colors: [theme.colors.secondary[500], theme.colors.secondary[600]],
  end: { x: 1, y: 1 },
  start: { x: 0, y: 0 },
})`
  margin: -${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  padding: ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius.xl}px;
  ${theme.shadows.lg}
`;

export const BalanceHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const BalanceLabel = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  opacity: 0.9;
`;

export const BalanceIcon = styled.TouchableOpacity`
  background-color: rgb(255 255 255 / 0.2);
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.sm}px;
`;

export const BalanceAmount = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.display}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.md}px;
`;

export const BalanceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BalanceDetail = styled.View`
  align-items: center;
`;

export const BalanceDetailLabel = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
  margin-bottom: ${theme.spacing.xs}px;
  opacity: 0.8;
`;

export const BalanceDetailAmount = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
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
  padding: ${theme.spacing.sm}px ${theme.spacing.xs}px;
`;

export const TabButtonText = styled.Text<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? theme.colors.white : theme.colors.gray[600])};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

// Content
export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 ${theme.spacing.lg}px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

// Quick Actions
export const QuickActionsContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

export const QuickActionsList = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

export const QuickActionCard = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  ${theme.shadows.sm}
`;

export const QuickActionIcon = styled.View<{ $color: string }>`
  align-items: center;
  background-color: ${({ $color }) => $color}20;
  border-radius: ${theme.borderRadius.md}px;
  height: 48px;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm}px;
  width: 48px;
`;

export const QuickActionTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  text-align: center;
`;

// Payment Methods
export const PaymentMethodCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  ${theme.shadows.sm}
`;

export const PaymentMethodIcon = styled.View<{ $color: string }>`
  align-items: center;
  background-color: ${({ $color }) => $color}20;
  border-radius: ${theme.borderRadius.md}px;
  height: 48px;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: 48px;
`;

export const PaymentMethodInfo = styled.View`
  flex: 1;
`;

export const PaymentMethodName = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const PaymentMethodDetails = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
`;

export const PaymentMethodBadge = styled.View`
  background-color: ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const PaymentMethodBadgeText = styled.Text`
  color: ${theme.colors.primary[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

// Transactions
export const TransactionCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.sm}
`;

export const TransactionHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const TransactionInfo = styled.View`
  flex: 1;
  margin-right: ${theme.spacing.sm}px;
`;

export const TransactionTitle = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const TransactionDescription = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
`;

export const TransactionAmount = styled.Text<{ $type: string }>`
  color: ${({ $type }) => {
    switch ($type) {
      case 'payment':
        return theme.colors.error[600];
      case 'refund':
      case 'credit':
        return theme.colors.success[600];
      default:
        return theme.colors.gray[900];
    }
  }};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
`;

export const TransactionFooter = styled.View`
  align-items: center;
  border-top-color: ${theme.colors.gray[100]};
  border-top-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${theme.spacing.sm}px;
  padding-top: ${theme.spacing.sm}px;
`;

export const TransactionDate = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
`;

export const TransactionStatus = styled.View<{ $status: string }>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.success[100];
      case 'pending':
        return theme.colors.warning[100];
      case 'failed':
        return theme.colors.error[100];
      default:
        return theme.colors.gray[100];
    }
  }};
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const TransactionStatusText = styled.Text<{ $status: string }>`
  color: ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.success[700];
      case 'pending':
        return theme.colors.warning[700];
      case 'failed':
        return theme.colors.error[700];
      default:
        return theme.colors.gray[700];
    }
  }};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
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

// Add Payment Method Button
export const AddPaymentButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.colors.primary[600]};
  border-radius: ${theme.borderRadius.lg}px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

export const AddPaymentButtonText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  margin-left: ${theme.spacing.sm}px;
`;
