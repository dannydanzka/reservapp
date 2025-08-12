import React from 'react';

import { AlertCircle } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Interfaces
interface FormProps {
  onSubmit?: () => void;
  children: React.ReactNode;
}

interface FormFieldProps {
  name?: string;
  children: React.ReactNode;
}

// Simple Form Component
export const Form: React.FC<FormProps> = ({ children }) => {
  return <FormContainer>{children}</FormContainer>;
};

// Simple Form Field Component
export const FormField: React.FC<FormFieldProps> = ({ children }) => {
  return <FormFieldContainer>{children}</FormFieldContainer>;
};

// Simple Form Submit Button
export const FormSubmitButton: React.FC<{
  title: string;
  onPress: () => void;
}> = ({ onPress = () => {}, title = '' }) => {
  return (
    <SubmitButton onPress={onPress}>
      <SubmitButtonText>{title}</SubmitButtonText>
    </SubmitButton>
  );
};

// Simple Form Error Summary
export const FormErrorSummary: React.FC<{ errors: string[] }> = ({ errors = [] }) => {
  if (!errors.length) return null;

  return (
    <ErrorContainer>
      <AlertCircle color={theme.colors.error[500]} size={16} />
      <ErrorText>
        {errors.map((error, index) => (
          <ErrorItem key={index}>{error}</ErrorItem>
        ))}
      </ErrorText>
    </ErrorContainer>
  );
};

// Simple Form Section
export const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ children, title = '' }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
};

// Styled Components
const FormContainer = styled.View`
  padding: ${theme.spacing.md}px;
`;

const FormFieldContainer = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary[500]};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
`;

const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: ${theme.spacing.sm}px;
  background-color: ${theme.colors.error[50]};
  border-radius: ${theme.borderRadius.sm}px;
  border-left-width: 4px;
  border-left-color: ${theme.colors.error[500]};
  margin-bottom: ${theme.spacing.md}px;
`;

const ErrorText = styled.View`
  margin-left: ${theme.spacing.sm}px;
`;

const ErrorItem = styled.Text`
  color: ${theme.colors.error[700]};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

const SectionContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;
