import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Container
export const Container = styled.View`
  margin-bottom: ${theme.spacing.md}px;
  position: relative;
`;

// Input Wrapper
export const InputWrapper = styled.View<{
  hasError?: boolean;
  isFocused?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}>`
  position: relative;
  border-radius: ${theme.borderRadius.lg}px;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          min-height: 40px;
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        `;
      case 'large':
        return `
          min-height: 56px;
          padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
        `;
      default:
        return `
          min-height: 48px;
          padding: ${theme.spacing.md}px;
        `;
    }
  }}

  ${({ hasError, isFocused, variant }) => {
    const focusedBorderColor = hasError ? theme.colors.error[500] : theme.colors.primary[500];
    const normalBorderColor = hasError ? theme.colors.error[300] : theme.colors.border.default;

    switch (variant) {
      case 'filled':
        return `
          background-color: ${theme.colors.surface.secondary};
          border-width: 2px;
          border-color: ${isFocused ? focusedBorderColor : 'transparent'};
        `;
      case 'outlined':
        return `
          background-color: ${theme.colors.surface.primary};
          border-width: 2px;
          border-color: ${isFocused ? focusedBorderColor : normalBorderColor};
        `;
      default:
        return `
          background-color: ${theme.colors.surface.primary};
          border-width: 1px;
          border-color: ${normalBorderColor};
          ${theme.shadows.sm}
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

// Animated Label
export const AnimatedLabel = styled(Animated.Text)<{
  hasError?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  position: absolute;
  left: ${theme.spacing.md}px;
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-weight: 500;
  background-color: ${theme.colors.surface.primary};
  padding: 0 ${theme.spacing.xs}px;
  z-index: 1;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `left: ${theme.spacing.sm}px;`;
      case 'large':
        return `left: ${theme.spacing.lg}px;`;
      default:
        return `left: ${theme.spacing.md}px;`;
    }
  }}
`;

// Text Input
export const StyledTextInput = styled.TextInput<{
  size?: 'small' | 'medium' | 'large';
}>`
  flex: 1;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  padding-right: 40px; /* Space for clear button */

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          font-size: ${theme.typography.fontSize.sm}px;
          margin-top: ${theme.spacing.xs}px;
        `;
      case 'large':
        return `
          font-size: ${theme.typography.fontSize.lg}px;
          margin-top: ${theme.spacing.sm}px;
        `;
      default:
        return `
          font-size: ${theme.typography.fontSize.md}px;
          margin-top: ${theme.spacing.xs}px;
        `;
    }
  }}
`;

// Clear Button
export const ClearButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.full}px;
  height: 24px;
  justify-content: center;
  position: absolute;
  right: ${theme.spacing.sm}px;
  top: 50%;
  transform: translateY(-12px);
  width: 24px;
`;

// Loading Container
export const LoadingContainer = styled.View`
  position: absolute;
  right: ${theme.spacing.md}px;
  top: 50%;
  transform: translateY(-12px);
`;

// Error Text
export const ErrorText = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: ${theme.spacing.xs}px;
`;

export const ErrorTextContent = styled.Text`
  color: ${theme.colors.error[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-left: ${theme.spacing.xs}px;
`;

// Supporting Text
export const SupportingText = styled.Text`
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-top: ${theme.spacing.xs}px;
`;

// Suggestions Container
export const SuggestionsContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${theme.colors.surface.elevated};
  border-radius: ${theme.borderRadius.lg}px;
  margin-top: ${theme.spacing.xs}px;
  max-height: 200px;
  ${theme.shadows.lg}
  z-index: 1000;
  border-width: 1px;
  border-color: ${theme.colors.border.light};
`;

export const SuggestionsScrollView = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  nestedScrollEnabled: true,
  showsVerticalScrollIndicator: false,
})`
  max-height: 200px;
`;

// Suggestion Item
export const SuggestionItem = styled.TouchableOpacity`
  align-items: center;
  border-bottom-color: ${theme.colors.border.light};
  border-bottom-width: 1px;
  flex-direction: row;
  padding: ${theme.spacing.md}px;
`;

export const SuggestionIcon = styled.View`
  align-items: center;
  height: 24px;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
  width: 24px;
`;

export const SuggestionContent = styled.View`
  flex: 1;
`;

export const SuggestionText = styled.Text`
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const SuggestionSubtitle = styled.Text`
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
`;

// Empty State
export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg}px;
`;

export const EmptyStateText = styled.Text`
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  text-align: center;
`;
