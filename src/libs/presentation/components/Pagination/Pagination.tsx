import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showText?: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const Text = styled.Text<{ size?: 'small' | 'medium' | 'large' }>`
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return `${theme.typography.fontSize.sm}px`;
      case 'large':
        return `${theme.typography.fontSize.lg}px`;
      default:
        return `${theme.typography.fontSize.md}px`;
    }
  }};
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  flex: 1;
  text-align: center;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
`;

const PaginationButton = styled.TouchableOpacity<{
  disabled: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  ${({ size }) => {
    const buttonSize = size === 'small' ? 32 : size === 'large' ? 44 : 38;
    return `
      width: ${buttonSize}px;
      height: ${buttonSize}px;
    `;
  }}
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.surface.disabled : theme.colors.surface.primary};
  border-width: 1px;
  border-color: ${({ disabled }) =>
    disabled ? theme.colors.border.light : theme.colors.border.default};
  justify-content: center;
  align-items: center;
  ${theme.shadows.sm}

  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  loading = false,
  onPageChange = () => {},
  showText = true,
  size = 'medium',
  text = '',
  totalPages = 1,
}) => {
  const canGoPrev = currentPage > 1 && !loading;
  const canGoNext = currentPage < totalPages && !loading;

  const displayText = text || `Página ${currentPage} de ${totalPages}`;

  return (
    <Container>
      {showText && <Text size={size}>{displayText}</Text>}

      <ButtonsContainer>
        <PaginationButton
          disabled={!canGoPrev}
          size={size}
          onPress={canGoPrev ? () => onPageChange(currentPage - 1) : undefined}
        >
          <ChevronLeft
            color={canGoPrev ? theme.colors.text.primary : theme.colors.text.disabled}
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          />
        </PaginationButton>

        <PaginationButton
          disabled={!canGoNext}
          size={size}
          onPress={canGoNext ? () => onPageChange(currentPage + 1) : undefined}
        >
          <ChevronRight
            color={canGoNext ? theme.colors.text.primary : theme.colors.text.disabled}
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          />
        </PaginationButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Pagination;
