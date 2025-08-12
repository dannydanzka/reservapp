import styled from 'styled-components/native';

import { theme } from '@styles/theme';

export const FormContainer = styled.View`
  flex: 1;
`;

export const FormFieldContainer = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

export const FormFieldLabel = styled.Text`
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const FormFieldError = styled.Text`
  color: ${theme.colors.error[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
  line-height: 16px;
  margin-top: ${theme.spacing.xs}px;
`;

export const FormFieldRequiredIndicator = styled.Text`
  color: ${theme.colors.error[500]};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-left: ${theme.spacing.xs}px;
`;

export const FormSubmitButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.lg}px;
  min-height: 48px;

  ${({ disabled }) => disabled && 'opacity: 0.6;'}
`;

export const FormSubmitButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
`;

export const FormErrorSummary = styled.View`
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
`;

export const FormErrorSummaryTitle = styled.Text`
  color: ${theme.colors.error[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const FormErrorSummaryItem = styled.Text`
  color: ${theme.colors.error[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-bottom: ${theme.spacing.xs}px;
  padding-left: ${theme.spacing.sm}px;
`;

export const FormSection = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

export const FormSectionTitle = styled.Text`
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const FormSectionDescription = styled.Text`
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 20px;
  margin-bottom: ${theme.spacing.lg}px;
`;
