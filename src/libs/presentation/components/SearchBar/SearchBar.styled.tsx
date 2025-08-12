import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Main Container
export const SearchContainer = styled.View<{
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm}px;

  ${({ disabled }) => disabled && 'opacity: 0.6;'}
`;

// Input Container
export const InputContainer = styled.View<{
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  hasFilter?: boolean;
  isFocused?: boolean;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: ${theme.borderRadius.lg}px;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 40px;
          padding: 0 ${theme.spacing.sm}px;
        `;
      case 'large':
        return `
          height: 56px;
          padding: 0 ${theme.spacing.lg}px;
        `;
      default:
        return `
          height: 48px;
          padding: 0 ${theme.spacing.md}px;
        `;
    }
  }}

  ${({ isFocused, variant }) => {
    const focusedBorderColor = theme.colors.primary[500];
    const normalBorderColor = theme.colors.gray[300];
    const borderColor = isFocused ? focusedBorderColor : normalBorderColor;

    switch (variant) {
      case 'filled':
        return `
          background-color: ${theme.colors.gray[100]};
          border-width: 2px;
          border-color: ${isFocused ? focusedBorderColor : 'transparent'};
        `;
      case 'outlined':
        return `
          background-color: ${theme.colors.white};
          border-width: 2px;
          border-color: ${borderColor};
        `;
      default:
        return `
          background-color: ${theme.colors.white};
          ${theme.shadows.sm}
          border-width: 1px;
          border-color: ${theme.colors.gray[200]};
          ${
            isFocused &&
            `
            border-color: ${focusedBorderColor};
            ${theme.shadows.md}
          `
          }
        `;
    }
  }}
`;

// Search Icon
export const SearchIconContainer = styled.View<{
  size?: 'small' | 'medium' | 'large';
}>`
  margin-right: ${({ size }) => {
    switch (size) {
      case 'small':
        return `${theme.spacing.xs}px`;
      case 'large':
        return `${theme.spacing.md}px`;
      default:
        return `${theme.spacing.sm}px`;
    }
  }};
`;

// Text Input
export const TextInput = styled.TextInput<{
  size?: 'small' | 'medium' | 'large';
}>`
  flex: 1;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.regular};

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
`;

// Action Buttons Container
export const ActionsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${theme.spacing.xs}px;
`;

// Clear Button
export const ClearButton = styled.TouchableOpacity<{
  size?: 'small' | 'medium' | 'large';
}>`
  padding: ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.full}px;
  justify-content: center;
  align-items: center;

  ${({ size }) => {
    const buttonSize = size === 'small' ? 24 : size === 'large' ? 32 : 28;
    return `
      width: ${buttonSize}px;
      height: ${buttonSize}px;
    `;
  }}
`;

// Filter Button
export const FilterButton = styled.TouchableOpacity<{
  hasActiveFilters?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  border-radius: ${theme.borderRadius.lg}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: ${theme.spacing.xs}px;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 40px;
          padding: 0 ${theme.spacing.sm}px;
        `;
      case 'large':
        return `
          height: 56px;
          padding: 0 ${theme.spacing.lg}px;
        `;
      default:
        return `
          height: 48px;
          padding: 0 ${theme.spacing.md}px;
        `;
    }
  }}

  ${({ hasActiveFilters }) => {
    if (hasActiveFilters) {
      return `
        background-color: ${theme.colors.primary[500]};
        ${theme.shadows.md}
      `;
    }
    return `
        background-color: ${theme.colors.gray[100]};
        border-width: 1px;
        border-color: ${theme.colors.gray[200]};
      `;
  }}
`;

export const FilterCount = styled.View`
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.full}px;
  height: 18px;
  justify-content: center;
  min-width: 18px;
  padding: 0 ${theme.spacing.xs}px;
`;

export const FilterCountText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
`;

// Voice Button
export const VoiceButton = styled.TouchableOpacity<{
  size?: 'small' | 'medium' | 'large';
}>`
  padding: ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.full}px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secondary[100]};

  ${({ size }) => {
    const buttonSize = size === 'small' ? 32 : size === 'large' ? 40 : 36;
    return `
      width: ${buttonSize}px;
      height: ${buttonSize}px;
    `;
  }}
`;

// Loading Indicator
export const LoadingContainer = styled.View`
  padding: ${theme.spacing.xs}px;
`;

// Suggestions Container
export const SuggestionsContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  margin-top: ${theme.spacing.xs}px;
  max-height: 300px;
  ${theme.shadows.lg}
  z-index: 1000;
`;

export const SuggestionsList = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})`
  max-height: 300px;
`;

export const SuggestionItem = styled.TouchableOpacity`
  align-items: center;
  border-bottom-color: ${theme.colors.gray[100]};
  border-bottom-width: 1px;
  flex-direction: row;
  padding: ${theme.spacing.md}px;
`;

export const SuggestionIcon = styled.View`
  align-items: center;
  margin-right: ${theme.spacing.md}px;
  width: 20px;
`;

export const SuggestionContent = styled.View`
  flex: 1;
`;

export const SuggestionText = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
`;

export const SuggestionCategory = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-top: ${theme.spacing.xs}px;
`;

export const SuggestionBadge = styled.View<{
  type: 'suggestion' | 'recent' | 'popular';
}>`
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.md}px;

  ${({ type }) => {
    switch (type) {
      case 'popular':
        return `background-color: ${theme.colors.warning[100]};`;
      case 'recent':
        return `background-color: ${theme.colors.gray[100]};`;
      default:
        return `background-color: ${theme.colors.primary[100]};`;
    }
  }}
`;

export const SuggestionBadgeText = styled.Text<{
  type: 'suggestion' | 'recent' | 'popular';
}>`
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};

  ${({ type }) => {
    switch (type) {
      case 'popular':
        return `color: ${theme.colors.warning[700]};`;
      case 'recent':
        return `color: ${theme.colors.gray[600]};`;
      default:
        return `color: ${theme.colors.primary[700]};`;
    }
  }}
`;

// Recent Searches
export const RecentSearchesContainer = styled.View`
  padding: ${theme.spacing.md}px;
`;

export const RecentSearchesTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const RecentSearchItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: ${theme.spacing.sm}px 0;
`;

export const RecentSearchText = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  margin-left: ${theme.spacing.sm}px;
`;
