import { ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
  testID?: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;

  // Style variants
  variant?: 'default' | 'pills' | 'underlined' | 'segmented';
  size?: 'small' | 'medium' | 'large';

  // Layout
  scrollable?: boolean;
  centered?: boolean;
  fullWidth?: boolean;

  // Colors
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;

  // Badge
  showBadges?: boolean;

  // Icons
  showIcons?: boolean;
  iconPosition?: 'left' | 'top';

  // Loading
  loading?: boolean;

  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}
