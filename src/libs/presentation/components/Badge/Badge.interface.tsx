import { ReactNode } from 'react';

export interface BadgeProps {
  // Content
  children?: ReactNode;
  text?: string;
  number?: number;

  // Variants
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';

  // Styles
  color?: string;
  backgroundColor?: string;
  borderColor?: string;

  // States
  outlined?: boolean;
  disabled?: boolean;

  // Icon
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';

  // Positioning (for notification badges)
  dot?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: { x?: number; y?: number };

  // Actions
  onPress?: () => void;
  onClose?: () => void;
  closable?: boolean;

  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}

export interface ChipProps extends Omit<BadgeProps, 'dot' | 'position' | 'offset'> {
  // Chip-specific props
  selected?: boolean;
  selectable?: boolean;

  // Avatar/Image
  avatar?: ReactNode;
  image?: string;

  // Additional styling for chips
  elevated?: boolean;
  outlined?: boolean;
}
