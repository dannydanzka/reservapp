import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Container
export const TabsContainer = styled.View<{
  variant?: 'default' | 'pills' | 'underlined' | 'segmented';
  scrollable?: boolean;
  centered?: boolean;
  backgroundColor?: string;
}>`
  ${({ backgroundColor, variant }) => {
    switch (variant) {
      case 'pills':
        return `
          background-color: ${backgroundColor || theme.colors.surface.secondary};
          border-radius: ${theme.borderRadius.xl}px;
          padding: ${theme.spacing.xs}px;
        `;
      case 'segmented':
        return `
          background-color: ${backgroundColor || theme.colors.surface.secondary};
          border-radius: ${theme.borderRadius.lg}px;
          padding: ${theme.spacing.xs}px;
          border-width: 1px;
          border-color: ${theme.colors.border.default};
        `;
      case 'underlined':
        return `
          background-color: ${backgroundColor || 'transparent'};
          border-bottom-width: 1px;
          border-bottom-color: ${theme.colors.border.default};
        `;
      default:
        return `
          background-color: ${backgroundColor || theme.colors.surface.primary};
          ${theme.shadows.sm}
        `;
    }
  }}

  ${({ centered, scrollable }) => {
    if (scrollable) {
      return `flex-direction: row;`;
    }
    return `
      flex-direction: row;
      ${centered ? 'justify-content: center;' : ''}
    `;
  }}
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-grow: 0;
`;

// Tab Button
export const TabButton = styled.TouchableOpacity<{
  active: boolean;
  variant?: 'default' | 'pills' | 'underlined' | 'segmented';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  isLast?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}>`
  ${({ fullWidth }) => fullWidth && 'flex: 1;'}
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ size, variant }) => {
    const baseHeight = size === 'small' ? 32 : size === 'large' ? 48 : 40;
    const verticalPadding =
      size === 'small' ? theme.spacing.xs : size === 'large' ? theme.spacing.md : theme.spacing.sm;
    const horizontalPadding =
      size === 'small' ? theme.spacing.sm : size === 'large' ? theme.spacing.xl : theme.spacing.lg;

    return `
      min-height: ${baseHeight}px;
      padding: ${verticalPadding}px ${horizontalPadding}px;
      ${
        variant === 'underlined'
          ? `border-radius: 0;`
          : `border-radius: ${theme.borderRadius.md}px;`
      }
    `;
  }}

  ${({ active, activeColor, inactiveColor, variant }) => {
    const defaultActiveColor = activeColor || theme.colors.primary[500];
    const defaultInactiveColor = inactiveColor || 'transparent';

    switch (variant) {
      case 'pills':
        return `
          background-color: ${active ? defaultActiveColor : defaultInactiveColor};
          margin-right: ${theme.spacing.xs}px;
        `;
      case 'segmented':
        return `
          background-color: ${active ? theme.colors.surface.primary : defaultInactiveColor};
          margin-right: ${theme.spacing.xs}px;
          ${active ? theme.shadows.sm : ''}
        `;
      case 'underlined':
        return `
          background-color: transparent;
          border-bottom-width: 2px;
          border-bottom-color: ${active ? defaultActiveColor : 'transparent'};
          margin-bottom: -1px;
        `;
      default:
        return `
          background-color: ${active ? `${defaultActiveColor}20` : defaultInactiveColor};
        `;
    }
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}

  ${({ isLast, variant }) => {
    if (isLast && (variant === 'pills' || variant === 'segmented')) {
      return 'margin-right: 0;';
    }
    return '';
  }}
`;

// Tab Content
export const TabContent = styled.View<{
  iconPosition?: 'left' | 'top';
}>`
  align-items: center;
  justify-content: center;

  ${({ iconPosition }) => {
    if (iconPosition === 'top') {
      return 'flex-direction: column;';
    }
    return 'flex-direction: row;';
  }}
`;

export const TabIcon = styled.View<{
  iconPosition?: 'left' | 'top';
}>`
  ${({ iconPosition }) => {
    if (iconPosition === 'top') {
      return `margin-bottom: ${theme.spacing.xs}px;`;
    }
    return `margin-right: ${theme.spacing.sm}px;`;
  }}
`;

// Tab Text
export const TabText = styled.Text<{
  active: boolean;
  variant?: 'default' | 'pills' | 'underlined' | 'segmented';
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
}>`
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-weight: 500;
  text-align: center;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `font-size: ${theme.typography.fontSize.sm}px;`;
      case 'large':
        return `font-size: ${theme.typography.fontSize.lg}px;`;
      default:
        return `font-size: ${theme.typography.fontSize.md}px;`;
    }
  }}

  ${({ active, activeColor, inactiveColor, variant }) => {
    const defaultActiveColor =
      activeColor ||
      (variant === 'pills' || variant === 'segmented'
        ? theme.colors.white
        : theme.colors.primary[600]);
    const defaultInactiveColor = inactiveColor || theme.colors.text.tertiary;

    return `color: ${active ? defaultActiveColor : defaultInactiveColor};`;
  }}
`;

// Badge
export const TabBadge = styled.View`
  align-items: center;
  background-color: ${theme.colors.error[500]};
  border-radius: ${theme.borderRadius.full}px;
  height: 18px;
  justify-content: center;
  min-width: 18px;
  padding: 0 ${theme.spacing.xs}px;
  position: absolute;
  right: -${theme.spacing.xs}px;
  top: -${theme.spacing.xs}px;
`;

export const TabBadgeText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
`;

// Loading
export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.md}px;
`;

// Indicator (for underlined variant)
export const TabIndicator = styled.View<{
  active: boolean;
  activeColor?: string;
}>`
  background-color: ${({ active, activeColor }) =>
    active ? activeColor || theme.colors.primary[500] : 'transparent'};
  border-radius: ${theme.borderRadius.full}px;
  bottom: 0;
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
`;
