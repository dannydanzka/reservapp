import styled from 'styled-components/native';

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

interface StyledButtonTextProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const getButtonStyles = (variant: string, disabled: boolean) => {
  const baseColors = {
    outline: 'transparent',
    primary: '#007AFF',
    secondary: '#5856D6',
  };

  const color = baseColors[variant as keyof typeof baseColors];

  if (variant === 'outline') {
    return `
      background-color: transparent;
      border: 1px solid ${baseColors.primary};
      opacity: ${disabled ? 0.5 : 1};
    `;
  }

  return `
    background-color: ${color};
    opacity: ${disabled ? 0.5 : 1};
  `;
};

const getButtonSize = (size: string) => {
  const sizes = {
    large: 'padding: 16px 32px;',
    medium: 'padding: 12px 24px;',
    small: 'padding: 8px 16px;',
  };

  return sizes[size as keyof typeof sizes];
};

const getTextColor = (variant: string) => {
  if (variant === 'outline') {
    return '#007AFF';
  }
  return '#FFFFFF';
};

const getTextSize = (size: string) => {
  const sizes = {
    large: '18px',
    medium: '16px',
    small: '14px',
  };

  return sizes[size as keyof typeof sizes];
};

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-direction: row;
  ${({ disabled, variant }) => getButtonStyles(variant, disabled || false)}
  ${({ size }) => getButtonSize(size)}
`;

export const StyledButtonText = styled.Text<StyledButtonTextProps>`
  color: ${({ variant }) => getTextColor(variant)};
  font-family: System;
  font-size: ${({ size }) => getTextSize(size)};
  font-weight: 600;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const IconContainer = styled.View<{ position: 'left' | 'right' }>`
  ${({ position }) => (position === 'left' ? 'margin-right: 8px;' : 'margin-left: 8px;')}
`;
