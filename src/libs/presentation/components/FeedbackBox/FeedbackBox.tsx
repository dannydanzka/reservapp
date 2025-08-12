import React from 'react';

import styled from 'styled-components/native';

import { theme } from '@styles/theme';

interface FeedbackBoxProps {
  question: string;
  description?: string;
  positiveText?: string;
  negativeText?: string;
  onPositive?: () => void;
  onNegative?: () => void;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

const Container = styled.View<{ variant?: 'default' | 'destructive' }>`
  background-color: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm}

  ${({ variant }) =>
    variant === 'destructive' &&
    `
    border-left-width: 4px;
    border-left-color: ${theme.colors.error[500]};
  `}
`;

const Question = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.bold};
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
  line-height: 22px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const Button = styled.TouchableOpacity<{
  variant?: 'positive' | 'negative';
  disabled?: boolean;
}>`
  flex: 1;
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  min-height: 44px;

  ${({ variant }) => {
    switch (variant) {
      case 'positive':
        return `
          background-color: ${theme.colors.primary[500]};
        `;
      case 'negative':
        return `
          background-color: transparent;
          border-width: 1px;
          border-color: ${theme.colors.border.default};
        `;
      default:
        return `
          background-color: ${theme.colors.gray[100]};
        `;
    }
  }}

  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const ButtonText = styled.Text<{ variant?: 'positive' | 'negative' }>`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.primary.bold};

  ${({ variant }) => {
    switch (variant) {
      case 'positive':
        return `color: ${theme.colors.white};`;
      case 'negative':
        return `color: ${theme.colors.text.secondary};`;
      default:
        return `color: ${theme.colors.text.primary};`;
    }
  }}
`;

const FeedbackBox: React.FC<FeedbackBoxProps> = ({
  description = '',
  loading = false,
  negativeText = 'No',
  onNegative = () => {},
  onPositive = () => {},
  positiveText = 'Sí',
  question = '',
  variant = 'default',
}) => {
  return (
    <Container variant={variant}>
      <Question>{question}</Question>
      {description && <Description>{description}</Description>}

      <ButtonsContainer>
        <Button disabled={loading} variant='negative' onPress={onNegative}>
          <ButtonText variant='negative'>{negativeText}</ButtonText>
        </Button>

        <Button disabled={loading} variant='positive' onPress={onPositive}>
          <ButtonText variant='positive'>{positiveText}</ButtonText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default FeedbackBox;
