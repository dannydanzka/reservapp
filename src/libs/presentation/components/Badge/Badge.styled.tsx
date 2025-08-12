import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Badge Container
export const BadgeContainer = styled.View<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outlined?: boolean;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  dot?: boolean;
  onPress?: () => void;
}>`
  ${({ dot }) => {
    if (dot) {
      return `
        width: 8px;
        height: 8px;
        border-radius: ${theme.borderRadius.full}px;
      `;
    }

    return `
      border-radius: ${theme.borderRadius.full}px;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    `;
  }}

  ${({ dot, size }) => {
    if (dot) return '';

    switch (size) {
      case 'small':
        return `
          min-height: 18px;
          min-width: 18px;
          padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
        `;
      case 'large':
        return `
          min-height: 32px;
          min-width: 32px;
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        `;
      default:
        return `
          min-height: 24px;
          min-width: 24px;
          padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
        `;
    }
  }}

  ${({ backgroundColor, borderColor, color: _color, outlined, variant }) => {
    if (backgroundColor) {
      return `
        background-color: ${backgroundColor};
        ${outlined ? `border-width: 1px; border-color: ${borderColor || backgroundColor};` : ''}
      `;
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            bg: theme.colors.primary[500],
            border: theme.colors.primary[600],
          };
        case 'secondary':
          return {
            bg: theme.colors.secondary[500],
            border: theme.colors.secondary[600],
          };
        case 'success':
          return {
            bg: theme.colors.success[500],
            border: theme.colors.success[600],
          };
        case 'warning':
          return {
            bg: theme.colors.warning[500],
            border: theme.colors.warning[600],
          };
        case 'error':
          return {
            bg: theme.colors.error[500],
            border: theme.colors.error[600],
          };
        case 'info':
          return {
            bg: theme.colors.info[500],
            border: theme.colors.info[600],
          };
        default:
          return {
            bg: theme.colors.gray[500],
            border: theme.colors.gray[600],
          };
      }
    };

    const styles = getVariantStyles();

    if (outlined) {
      return `
        background-color: transparent;
        border-width: 1px;
        border-color: ${borderColor || styles.border};
      `;
    }

    return `background-color: ${styles.bg};`;
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}

  ${({ onPress }) =>
    onPress &&
    `
    opacity: 1;
  `}
`;

export const BadgeButton = styled.TouchableOpacity<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outlined?: boolean;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}>`
  border-radius: ${theme.borderRadius.full}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          min-height: 18px;
          min-width: 18px;
          padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
        `;
      case 'large':
        return `
          min-height: 32px;
          min-width: 32px;
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        `;
      default:
        return `
          min-height: 24px;
          min-width: 24px;
          padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
        `;
    }
  }}

  ${({ backgroundColor, borderColor, color: _color, outlined, variant }) => {
    if (backgroundColor) {
      return `
        background-color: ${backgroundColor};
        ${outlined ? `border-width: 1px; border-color: ${borderColor || backgroundColor};` : ''}
      `;
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            bg: theme.colors.primary[500],
            border: theme.colors.primary[600],
          };
        case 'secondary':
          return {
            bg: theme.colors.secondary[500],
            border: theme.colors.secondary[600],
          };
        case 'success':
          return {
            bg: theme.colors.success[500],
            border: theme.colors.success[600],
          };
        case 'warning':
          return {
            bg: theme.colors.warning[500],
            border: theme.colors.warning[600],
          };
        case 'error':
          return {
            bg: theme.colors.error[500],
            border: theme.colors.error[600],
          };
        case 'info':
          return {
            bg: theme.colors.info[500],
            border: theme.colors.info[600],
          };
        default:
          return {
            bg: theme.colors.gray[500],
            border: theme.colors.gray[600],
          };
      }
    };

    const styles = getVariantStyles();

    if (outlined) {
      return `
        background-color: transparent;
        border-width: 1px;
        border-color: ${borderColor || styles.border};
      `;
    }

    return `background-color: ${styles.bg};`;
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}
`;

// Badge Text
export const BadgeText = styled.Text<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outlined?: boolean;
  color?: string;
}>`
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-weight: 600;
  text-align: center;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `font-size: ${theme.typography.fontSize.xs}px;`;
      case 'large':
        return `font-size: ${theme.typography.fontSize.md}px;`;
      default:
        return `font-size: ${theme.typography.fontSize.sm}px;`;
    }
  }}

  ${({ color, outlined, variant }) => {
    if (color) {
      return `color: ${color};`;
    }

    if (outlined) {
      const getTextColor = () => {
        switch (variant) {
          case 'primary':
            return theme.colors.primary[600];
          case 'secondary':
            return theme.colors.secondary[600];
          case 'success':
            return theme.colors.success[600];
          case 'warning':
            return theme.colors.warning[600];
          case 'error':
            return theme.colors.error[600];
          case 'info':
            return theme.colors.info[600];
          default:
            return theme.colors.gray[600];
        }
      };

      return `color: ${getTextColor()};`;
    }

    return `color: ${theme.colors.white};`;
  }}
`;

// Icon Container
export const BadgeIcon = styled.View<{
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
}>`
  ${({ iconPosition, size }) => {
    const margin = size === 'small' ? theme.spacing.xs : theme.spacing.sm;

    if (iconPosition === 'right') {
      return `margin-left: ${margin}px;`;
    }
    return `margin-right: ${margin}px;`;
  }}
`;

// Close Button
export const CloseButton = styled.TouchableOpacity<{
  size?: 'small' | 'medium' | 'large';
}>`
  ${({ size }) => {
    const margin = size === 'small' ? theme.spacing.xs : theme.spacing.sm;
    return `margin-left: ${margin}px;`;
  }}
`;

// Positioned Container for relative positioning
export const PositionedContainer = styled.View`
  position: relative;
`;

// Positioned Badge Wrapper
export const PositionedBadgeWrapper = styled.View<{
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: { x?: number; y?: number };
}>`
  position: absolute;

  ${({ offset, position }) => {
    const offsetX = offset?.x || 0;
    const offsetY = offset?.y || 0;

    switch (position) {
      case 'top-left':
        return `
          top: ${-8 + offsetY}px;
          left: ${-8 + offsetX}px;
        `;
      case 'bottom-right':
        return `
          bottom: ${-8 + offsetY}px;
          right: ${-8 + offsetX}px;
        `;
      case 'bottom-left':
        return `
          bottom: ${-8 + offsetY}px;
          left: ${-8 + offsetX}px;
        `;
      default: // top-right
        return `
          top: ${-8 + offsetY}px;
          right: ${-8 + offsetX}px;
        `;
    }
  }}
`;

// Chip Container (extends Badge for chips)
export const ChipContainer = styled.TouchableOpacity<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outlined?: boolean;
  selected?: boolean;
  disabled?: boolean;
  elevated?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}>`
  border-radius: ${theme.borderRadius.full}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 24px;
          padding: 0 ${theme.spacing.sm}px;
        `;
      case 'large':
        return `
          height: 40px;
          padding: 0 ${theme.spacing.md}px;
        `;
      default:
        return `
          height: 32px;
          padding: 0 ${theme.spacing.md}px;
        `;
    }
  }}

  ${({ elevated }) => elevated && theme.shadows.sm}

  ${({ backgroundColor, borderColor, color: _color, outlined, selected, variant }) => {
    if (backgroundColor) {
      return `
        background-color: ${backgroundColor};
        ${outlined ? `border-width: 1px; border-color: ${borderColor || backgroundColor};` : ''}
      `;
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            bg: selected ? theme.colors.primary[500] : theme.colors.primary[100],
            border: theme.colors.primary[500],
          };
        case 'secondary':
          return {
            bg: selected ? theme.colors.secondary[500] : theme.colors.secondary[100],
            border: theme.colors.secondary[500],
          };
        case 'success':
          return {
            bg: selected ? theme.colors.success[500] : theme.colors.success[100],
            border: theme.colors.success[500],
          };
        case 'warning':
          return {
            bg: selected ? theme.colors.warning[500] : theme.colors.warning[100],
            border: theme.colors.warning[500],
          };
        case 'error':
          return {
            bg: selected ? theme.colors.error[500] : theme.colors.error[100],
            border: theme.colors.error[500],
          };
        case 'info':
          return {
            bg: selected ? theme.colors.info[500] : theme.colors.info[100],
            border: theme.colors.info[500],
          };
        default:
          return {
            bg: selected ? theme.colors.gray[500] : theme.colors.gray[100],
            border: theme.colors.gray[400],
          };
      }
    };

    const styles = getVariantStyles();

    if (outlined) {
      return `
        background-color: ${selected ? styles.bg : 'transparent'};
        border-width: 1px;
        border-color: ${borderColor || styles.border};
      `;
    }

    return `background-color: ${styles.bg};`;
  }}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}
`;

// Chip Avatar
export const ChipAvatar = styled.View<{
  size?: 'small' | 'medium' | 'large';
}>`
  border-radius: ${theme.borderRadius.full}px;
  overflow: hidden;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 16px;
          height: 16px;
          margin-right: ${theme.spacing.xs}px;
        `;
      case 'large':
        return `
          width: 24px;
          height: 24px;
          margin-right: ${theme.spacing.sm}px;
        `;
      default:
        return `
          width: 20px;
          height: 20px;
          margin-right: ${theme.spacing.xs}px;
        `;
    }
  }}
`;

export const ChipAvatarImage = styled.Image`
  height: 100%;
  width: 100%;
`;

// Chip Text
export const ChipText = styled.Text<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outlined?: boolean;
  selected?: boolean;
  color?: string;
}>`
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-weight: 500;
  text-align: center;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `font-size: ${theme.typography.fontSize.xs}px;`;
      case 'large':
        return `font-size: ${theme.typography.fontSize.md}px;`;
      default:
        return `font-size: ${theme.typography.fontSize.sm}px;`;
    }
  }}

  ${({ color, outlined, selected, variant }) => {
    if (color) {
      return `color: ${color};`;
    }

    const getTextColor = () => {
      switch (variant) {
        case 'primary':
          return selected && !outlined ? theme.colors.white : theme.colors.primary[700];
        case 'secondary':
          return selected && !outlined ? theme.colors.white : theme.colors.secondary[700];
        case 'success':
          return selected && !outlined ? theme.colors.white : theme.colors.success[700];
        case 'warning':
          return selected && !outlined ? theme.colors.white : theme.colors.warning[700];
        case 'error':
          return selected && !outlined ? theme.colors.white : theme.colors.error[700];
        case 'info':
          return selected && !outlined ? theme.colors.white : theme.colors.info[700];
        default:
          return selected && !outlined ? theme.colors.white : theme.colors.gray[700];
      }
    };

    return `color: ${getTextColor()};`;
  }}
`;
