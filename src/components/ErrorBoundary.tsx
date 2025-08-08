import React, { Component, ReactNode } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';

import { theme } from '../libs/ui/theme/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: string) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = `${error.toString()}\n\nStack trace:\n${errorInfo.componentStack}`;
    
    this.setState({
      error,
      errorInfo: errorMessage,
    });

    // Log del error
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);

    // Callback personalizado para logging
    if (this.props.onError) {
      this.props.onError(error, errorMessage);
    }

    // En desarrollo, mostrar alerta con detalles
    if (__DEV__) {
      Alert.alert(
        'Error de Desarrollo',
        `${error.message}\n\n${errorInfo.componentStack}`,
        [{ text: 'OK', style: 'cancel' }]
      );
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Si hay un fallback personalizado, usarlo
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Fallback por defecto
      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorIcon>
              <AlertTriangle size={48} color={theme.colors.error[500]} />
            </ErrorIcon>
            
            <ErrorTitle>¡Oops! Algo salió mal</ErrorTitle>
            <ErrorMessage>
              Ha ocurrido un error inesperado. Puedes intentar recargar la pantalla.
            </ErrorMessage>

            {__DEV__ && (
              <ErrorDetails>
                <ErrorDetailsTitle>Detalles del error (desarrollo):</ErrorDetailsTitle>
                <ErrorDetailsText>{this.state.error.message}</ErrorDetailsText>
              </ErrorDetails>
            )}

            <ErrorActions>
              <RetryButton onPress={this.handleRetry}>
                <RefreshCw size={20} color={theme.colors.white} />
                <RetryButtonText>Intentar de nuevo</RetryButtonText>
              </RetryButton>
            </ErrorActions>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Hook para usar en componentes funcionales
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Unhandled error:', error);
    
    if (__DEV__) {
      Alert.alert(
        'Error',
        `${error.message}\n\n${errorInfo || ''}`,
        [{ text: 'OK', style: 'cancel' }]
      );
    } else {
      // En producción, solo mostrar mensaje amigable
      Alert.alert(
        'Error',
        'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
        [{ text: 'OK', style: 'cancel' }]
      );
    }
  };

  return { handleError };
};

// Styled Components
const ErrorContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[50]};
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const ErrorContent = styled.View`
  max-width: 300px;
  align-items: center;
`;

const ErrorIcon = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const ErrorTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const ErrorMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
  line-height: 24px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const ErrorDetails = styled.View`
  background-color: ${theme.colors.error[50]};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  border-left-width: 4px;
  border-left-color: ${theme.colors.error[500]};
  margin-bottom: ${theme.spacing.xl}px;
  width: 100%;
`;

const ErrorDetailsTitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  color: ${theme.colors.error[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  margin-bottom: ${theme.spacing.sm}px;
`;

const ErrorDetailsText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.error[600]};
  font-family: 'monospace';
  line-height: 18px;
`;

const ErrorActions = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary[500]};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm}px;
  ${theme.shadows.sm}
`;

const RetryButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

export default ErrorBoundary;