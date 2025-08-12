import React from 'react';

import { TextInputProps } from 'react-native';

export interface AutoCompleteSuggestion {
  id: string;
  text: string;
  subtitle?: string;
  icon?: React.ReactNode;
  data?: any;
}

export interface AutoCompleteFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  // Basic props
  label: string;
  value?: string;
  placeholder?: string;

  // Required field
  required?: boolean;

  // Error state
  error?: string;
  supportingText?: string;

  // Suggestions
  suggestions?: AutoCompleteSuggestion[];
  onSearch?: (query: string) => void;
  onSelect?: (suggestion: AutoCompleteSuggestion | string) => void;

  // Loading state
  loading?: boolean;

  // Debounce
  debounceMs?: number;
  minLength?: number;

  // Styling
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';

  // Clear functionality
  showClearButton?: boolean;

  // Dropdown behavior
  maxSuggestions?: number;
  showDropdownOnFocus?: boolean;
  closeOnSelect?: boolean;

  // Custom rendering
  renderSuggestion?: (suggestion: AutoCompleteSuggestion, index: number) => React.ReactNode;

  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}
