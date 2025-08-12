import React from 'react';

import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  loading = false,
  onPress = () => {},
  rightIcon = null,
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const handlePress = (e: any) => {
    if (!isDisabled && onPress) {
      onPress(e);
    }
  };

  return (
    <StyledButton
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $loading={loading}
      $size={size}
      $variant={variant}
      activeOpacity={isDisabled ? 1 : 0.7}
      onPress={handlePress}
      {...props}
    >
      <ButtonContent $loading={loading}>
        {loading && (
          <LoadingContainer>
            <ActivityIndicator color={getLoadingColor(variant)} size='small' />
          </LoadingContainer>
        )}

        {!loading && leftIcon && <IconContainer position='left'>{leftIcon}</IconContainer>}

        <ButtonText $disabled={isDisabled} $loading={loading} $size={size} $variant={variant}>
          {children}
        </ButtonText>

        {!loading && rightIcon && <IconContainer position='right'>{rightIcon}</IconContainer>}
      </ButtonContent>
    </StyledButton>
  );
};

const getLoadingColor = (variant: string) => {
  switch (variant) {
    case 'primary':
    case 'danger':
      return theme.colors.white;
    case 'secondary':
      return theme.colors.white;
    default:
      return theme.colors.primary[500];
  }
};

// Styled Components
const StyledButton = styled(TouchableOpacity)<{
  $variant: string;
  $size: string;
  $disabled: boolean;
  $fullWidth: boolean;
  $loading: boolean;
}>`
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.lg}px ${theme.spacing.xl}px;
          min-height: 56px;
        `;
      default:
        return `
          padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
          min-height: 44px;
        `;
    }
  }}

  ${({ $disabled, $loading, $variant }) => {
    const opacity = $disabled && !$loading ? 0.5 : 1;

    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary[500]};
          border-width: 0;
          opacity: ${opacity};
          ${theme.shadows.sm}
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary[500]};
          border-width: 0;
          opacity: ${opacity};
          ${theme.shadows.sm}
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-width: 1px;
          border-color: ${theme.colors.primary[500]};
          opacity: ${opacity};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          border-width: 0;
          opacity: ${opacity};
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.error[500]};
          border-width: 0;
          opacity: ${opacity};
          ${theme.shadows.sm}
        `;
      default:
        return `
          background-color: ${theme.colors.primary[500]};
          border-width: 0;
          opacity: ${opacity};
          ${theme.shadows.sm}
        `;
    }
  }}
`;

const ButtonContent = styled.View<{ $loading: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
`;

const LoadingContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View<{ position: 'left' | 'right' }>`
  ${({ position }) =>
    position === 'left'
      ? `margin-right: ${theme.spacing.sm}px;`
      : `margin-left: ${theme.spacing.sm}px;`}
`;

const ButtonText = styled.Text<{
  $variant: string;
  $size: string;
  $disabled: boolean;
  $loading: boolean;
}>`
  font-weight: 600;
  text-align: center;
  font-family: ${theme.typography.fontFamily.primary.bold};

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `font-size: ${theme.typography.fontSize.sm}px;`;
      case 'lg':
        return `font-size: ${theme.typography.fontSize.lg}px;`;
      default:
        return `font-size: ${theme.typography.fontSize.md}px;`;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return `color: ${theme.colors.white};`;
      case 'outline':
        return `color: ${theme.colors.primary[500]};`;
      case 'ghost':
        return `color: ${theme.colors.primary[600]};`;
      default:
        return `color: ${theme.colors.white};`;
    }
  }}

  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
`;

export default Button;
