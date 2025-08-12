import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Helper function for min-height calculation
const getMinHeight = (height?: number | string) => {
  if (typeof height === 'number') return `${height}px`;
  if (typeof height === 'string') return height;
  return '400px';
};

// Container and Layout
export const Overlay = styled.View`
  background-color: rgb(0 0 0 / 0.5);
  flex: 1;
  justify-content: flex-end;
`;

export const AnimatedOverlay = styled(Animated.View)`
  flex: 1;
`;

export const Container = styled(Animated.View)<{ height?: number | string }>`
  background-color: ${theme.colors.white};
  border-top-left-radius: ${theme.borderRadius.xl}px;
  border-top-right-radius: ${theme.borderRadius.xl}px;
  max-height: 90%;
  min-height: ${({ height }) => getminheight(height)};
  ${theme.shadows.xl}
`;

export const Handle = styled.View`
  align-self: center;
  background-color: ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.full}px;
  height: 4px;
  margin-bottom: ${theme.spacing.lg}px;
  margin-top: ${theme.spacing.md}px;
  width: 40px;
`;

// Header
export const Header = styled.View`
  border-bottom-color: ${theme.colors.gray[100]};
  border-bottom-width: 1px;
  margin-bottom: ${theme.spacing.lg}px;
  padding: 0 ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.lg}px;
`;

export const HeaderContent = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderText = styled.View`
  flex: 1;
  margin-right: ${theme.spacing.md}px;
`;

export const Title = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.full}px;
  height: 32px;
  justify-content: center;
  padding: ${theme.spacing.sm}px;
  width: 32px;
`;

// Content
export const Content = styled.View`
  flex: 1;
  padding: 0 ${theme.spacing.lg}px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  bounces: false,
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

// Filter Options
export const FilterOptionContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  min-height: 48px;
  padding: ${theme.spacing.md}px 0;
`;

export const FilterCheckbox = styled.View<{ checked: boolean }>`
  align-items: center;
  background-color: ${({ checked }) => (checked ? theme.colors.primary[500] : theme.colors.white)};
  border-color: ${({ checked }) => (checked ? theme.colors.primary[500] : theme.colors.gray[300])};
  border-radius: ${theme.borderRadius.sm}px;
  border-width: 2px;
  height: 20px;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: 20px;
`;

export const FilterCheckmark = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: bold;
`;

export const FilterRadioButton = styled.View<{ checked: boolean }>`
  align-items: center;
  border-color: ${({ checked }) => (checked ? theme.colors.primary[500] : theme.colors.gray[300])};
  border-radius: ${theme.borderRadius.full}px;
  border-width: 2px;
  height: 20px;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: 20px;
`;

export const FilterRadioDot = styled.View<{ checked: boolean }>`
  background-color: ${({ checked }) => (checked ? theme.colors.primary[500] : 'transparent')};
  border-radius: ${theme.borderRadius.full}px;
  height: 10px;
  width: 10px;
`;

export const FilterLabel = styled.Text`
  color: ${theme.colors.gray[900]};
  flex: 1;
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
`;

export const FilterCount = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
`;

// Actions
export const ActionsContainer = styled.View`
  border-top-color: ${theme.colors.gray[100]};
  border-top-width: 1px;
  flex-direction: row;
  gap: ${theme.spacing.md}px;
  padding: ${theme.spacing.lg}px;
`;

export const ActionButton = styled.TouchableOpacity<{
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  flex?: boolean;
}>`
  ${({ flex }) => (flex ? 'flex: 1;' : '')}
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  min-height: 48px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${({ disabled, variant }) => {
    if (disabled) {
      return `
        background-color: ${theme.colors.gray[100]};
        border-width: 0;
      `;
    }

    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          border-width: 0;
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-width: 1px;
          border-color: ${theme.colors.primary[500]};
        `;
      default: // primary
        return `
          background-color: ${theme.colors.primary[500]};
          border-width: 0;
        `;
    }
  }}
`;

export const ActionButtonText = styled.Text<{
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}>`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.primary.bold};

  ${({ disabled, variant }) => {
    if (disabled) {
      return `color: ${theme.colors.gray[400]};`;
    }

    switch (variant) {
      case 'secondary':
        return `color: ${theme.colors.gray[700]};`;
      case 'outline':
        return `color: ${theme.colors.primary[500]};`;
      default: // primary
        return `color: ${theme.colors.white};`;
    }
  }}
`;

// Loading
export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 100px;
`;

// Empty State
export const EmptyState = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 150px;
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
