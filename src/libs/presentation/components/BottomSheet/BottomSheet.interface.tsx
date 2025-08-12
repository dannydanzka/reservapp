import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
  value?: any;
}

export interface ActionButtonConfig {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  height?: number | string;

  // Filter Options
  filterOptions?: FilterOption[];
  onFilterChange?: (optionId: string, checked: boolean) => void;
  useCheckboxes?: boolean; // true = checkboxes, false = radio buttons
  multiSelect?: boolean;

  // Action Buttons
  primaryAction?: ActionButtonConfig;
  secondaryAction?: ActionButtonConfig;

  // Custom Content
  children?: React.ReactNode;

  // Loading State
  isLoading?: boolean;

  // Close behavior
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;

  // Animation
  animationType?: 'slide' | 'fade';
}
