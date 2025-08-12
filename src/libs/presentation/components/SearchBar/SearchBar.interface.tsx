import { ReactNode } from 'react';

import { TextInputProps, ViewStyle } from 'react-native';

export interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  // Basic props
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;

  // Filter functionality
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  filterIcon?: ReactNode;
  hasActiveFilters?: boolean;
  filterCount?: number;

  // Search functionality
  onSearch?: (text: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;

  // Loading state
  isLoading?: boolean;

  // Style variants
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';

  // Custom styling
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;

  // Icons
  searchIcon?: ReactNode;
  clearIcon?: ReactNode;

  // Voice search (future enhancement)
  showVoiceButton?: boolean;
  onVoicePress?: () => void;

  // Auto-complete/suggestions
  suggestions?: SearchSuggestion[];
  showSuggestions?: boolean;
  onSuggestionPress?: (suggestion: SearchSuggestion) => void;
  maxSuggestions?: number;

  // Recent searches
  recentSearches?: string[];
  showRecentSearches?: boolean;
  onRecentSearchPress?: (search: string) => void;
  maxRecentSearches?: number;

  // Disabled state
  disabled?: boolean;

  // Focus management
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type?: 'suggestion' | 'recent' | 'popular';
  icon?: ReactNode;
  category?: string;
  metadata?: any;
}
