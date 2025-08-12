import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Main Container
export const CardContainer = styled.View<{
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'filled':
        return theme.colors.gray[50];
      case 'outlined':
        return theme.colors.white;
      default:
        return theme.colors.white;
    }
  }};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  overflow: hidden;

  ${({ variant }) => {
    switch (variant) {
      case 'outlined':
        return `
          border-width: 1px;
          border-color: ${theme.colors.gray[200]};
        `;
      case 'filled':
        return `
          border-width: 1px;
          border-color: ${theme.colors.gray[100]};
        `;
      default:
        return `${theme.shadows.sm}`;
    }
  }}

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.6;
      background-color: ${theme.colors.gray[50]};
    `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `margin-bottom: ${theme.spacing.sm}px;`;
      case 'large':
        return `margin-bottom: ${theme.spacing.lg}px;`;
      default:
        return '';
    }
  }}
`;

export const LeftBorder = styled.View<{ color?: string }>`
  background-color: ${({ color }) => color || theme.colors.primary[500]};
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 4px;
`;

// Header
export const HeaderContainer = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  min-height: 64px;

  ${({ disabled }) => disabled && 'opacity: 0.6;'}
`;

export const IconContainer = styled.View<{
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
}>`
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.md}px;
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '40px';
      case 'large':
        return '56px';
      default:
        return '48px';
    }
  }};
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '40px';
      case 'large':
        return '56px';
      default:
        return '48px';
    }
  }};
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text<{
  size?: 'small' | 'medium' | 'large';
}>`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return `${theme.typography.fontSize.sm}px`;
      case 'large':
        return `${theme.typography.fontSize.lg}px`;
      default:
        return `${theme.typography.fontSize.md}px`;
    }
  }};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 18px;
`;

export const Description = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 18px;
  margin-top: ${theme.spacing.xs}px;
`;

// Actions
export const ActionsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
`;

export const CounterBadge = styled.View`
  align-items: center;
  background-color: ${theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.full}px;
  height: 24px;
  justify-content: center;
  min-width: 24px;
  padding: 0 ${theme.spacing.xs}px;
`;

export const CounterText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
`;

export const Badge = styled.View<{ color?: string }>`
  background-color: ${({ color }) => color || theme.colors.secondary[100]};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const BadgeText = styled.Text<{ textColor?: string }>`
  color: ${({ textColor }) => textColor || theme.colors.secondary[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

export const ExpandButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  padding: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.md}px;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => disabled && 'opacity: 0.6;'}
`;

// Expanded Content
export const ExpandedContainer = styled.View`
  background-color: ${theme.colors.gray[25]};
  border-top-color: ${theme.colors.gray[100]};
  border-top-width: 1px;
`;

export const ItemsContainer = styled.View`
  padding: ${theme.spacing.sm}px 0;
`;

export const ItemContainer = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  min-height: 48px;

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.6;
    `}
`;

export const ItemIcon = styled.View`
  align-items: center;
  margin-right: ${theme.spacing.md}px;
  width: 20px;
`;

export const ItemBullet = styled.Text`
  color: ${theme.colors.gray[400]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  margin-right: ${theme.spacing.md}px;
  text-align: center;
  width: 16px;
`;

export const ItemContent = styled.View`
  flex: 1;
`;

export const ItemText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? theme.colors.gray[400] : theme.colors.gray[700])};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  line-height: 20px;
`;

export const ItemRightContent = styled.View`
  margin-left: ${theme.spacing.sm}px;
`;

// Link
export const LinkContainer = styled.TouchableOpacity`
  align-items: flex-start;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

export const LinkText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 500;
`;

// Custom Content
export const CustomContentContainer = styled.View`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

// Loading
export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 80px;
  padding: ${theme.spacing.lg}px;
`;
