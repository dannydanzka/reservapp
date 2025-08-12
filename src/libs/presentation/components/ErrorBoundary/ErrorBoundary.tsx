import React, { Component } from 'react';

import { Alert } from 'react-native';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';

import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.interface';
import { theme } from '../../styles/theme';

import {
  ErrorActions,
  ErrorContainer,
  ErrorContent,
  ErrorDetails,
  ErrorDetailsText,
  ErrorDetailsTitle,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  RetryButton,
  RetryButtonText,
} from './ErrorBoundary.styled';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error,
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = `${error.toString()}\n\nStack trace:\n${errorInfo.componentStack}`;

    this.setState({
      error,
      errorInfo: errorMessage,
    });

    // Log del error
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }

    // Callback personalizado para logging
    if (this.props.onError) {
      this.props.onError(error, errorMessage);
    }

    // En desarrollo, mostrar alerta con detalles
    if (__DEV__) {
      Alert.alert('Error de Desarrollo', `${error.message}\n\n${errorInfo.componentStack}`, [
        { style: 'cancel', text: 'OK' },
      ]);
    }
  }

  handleRetry = () => {
    this.setState({ error: undefined, errorInfo: undefined, hasError: false });
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
              <AlertTriangle color={theme.colors.error[500]} size={48} />
            </ErrorIcon>

            <ErrorTitle>¡Oops! Algo salió mal</ErrorTitle>
            <ErrorMessage>
              Ha ocurrido un error inesperado. Puedes intentar recargar la pantalla.
            </ErrorMessage>

            {__DEV__ && (
              <ErrorDetails>
                <ErrorDetailsTitle>Detalles del error (desarrollo):</ErrorDetailsTitle>
                <ErrorDetailsText>{this.state.error.message}</ErrorDetailsText>
                {this.state.errorInfo && (
                  <ErrorDetailsText>{this.state.errorInfo}</ErrorDetailsText>
                )}
              </ErrorDetails>
            )}

            <ErrorActions>
              <RetryButton onPress={this.handleRetry}>
                <RefreshCw color={theme.colors.white} size={20} />
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

export default ErrorBoundary;
