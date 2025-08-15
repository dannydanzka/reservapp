import React, { Component, ReactNode } from 'react';

import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

const ErrorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #dc3545;
  margin-bottom: 10px;
  text-align: center;
`;

const ErrorMessage = styled.Text`
  font-size: 16px;
  color: #666666;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorDetails = styled.Text`
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin-bottom: 30px;
  font-family: monospace;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo: errorInfo.componentStack,
    });
  }

  handleReset = () => {
    this.setState({ error: null, errorInfo: null, hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <ErrorTitle>¡Oops! Algo salió mal</ErrorTitle>
          <ErrorMessage>
            La aplicación encontró un error inesperado. Por favor, intenta reiniciar la app.
          </ErrorMessage>
          {__DEV__ && this.state.error && (
            <ErrorDetails>
              {this.state.error.toString()}
              {this.state.errorInfo}
            </ErrorDetails>
          )}
          <Button color='#007bff' title='Reintentar' onPress={this.handleReset} />
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
