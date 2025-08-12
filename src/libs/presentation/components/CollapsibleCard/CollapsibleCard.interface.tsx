import { ReactNode } from 'react';

export interface CollapsibleCardItem {
  id: string;
  text: string;
  onPress?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
  rightContent?: ReactNode;
}

export interface CollapsibleCardProps {
  // Basic Info
  title: string;
  subtitle?: string;
  description?: string;

  // Icon
  icon?: ReactNode;
  iconColor?: string;
  iconBackgroundColor?: string;

  // State
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;

  // Counter/Badge
  counter?: number;
  badge?: string | number;
  badgeColor?: string;

  // Items (for expandable content)
  items?: CollapsibleCardItem[];

  // Actions
  onToggle?: (expanded: boolean) => void;
  onPress?: () => void;
  onLongPress?: () => void;

  // Link (alternative to items)
  linkText?: string;
  onLinkPress?: () => void;

  // Custom content
  children?: ReactNode;
  expandedContent?: ReactNode;

  // Styling
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  leftBorderColor?: string;

  // Animation
  animationDuration?: number;

  // Loading state
  isLoading?: boolean;
}
