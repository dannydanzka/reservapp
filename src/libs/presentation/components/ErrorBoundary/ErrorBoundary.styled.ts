import styled from 'styled-components/native';

import { theme } from '../../styles/theme';

export const ErrorContainer = styled.View`
  align-items: center;
  background-color: ${theme.colors.gray[50]};
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

export const ErrorContent = styled.View`
  align-items: center;
  max-width: 300px;
`;

export const ErrorIcon = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

export const ErrorTitle = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

export const ErrorMessage = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  line-height: 24px;
  margin-bottom: ${theme.spacing.xl}px;
  text-align: center;
`;

export const ErrorDetails = styled.View`
  background-color: ${theme.colors.error[50]};
  border-left-color: ${theme.colors.error[500]};
  border-left-width: 4px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.xl}px;
  padding: ${theme.spacing.md}px;
  width: 100%;
`;

export const ErrorDetailsTitle = styled.Text`
  color: ${theme.colors.error[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const ErrorDetailsText = styled.Text`
  color: ${theme.colors.error[600]};
  font-family: monospace;
  font-size: ${theme.typography.fontSize.xs}px;
  line-height: 18px;
`;

export const ErrorActions = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

export const RetryButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

export const RetryButtonText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
`;
