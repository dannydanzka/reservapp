export { default } from './ErrorBoundary';
export type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.interface';

// Hook para usar en componentes funcionales
import { Alert } from 'react-native';

export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    if (__DEV__) {
      console.error('Unhandled error:', error);
    }

    if (__DEV__) {
      Alert.alert('Error', `${error.message}\n\n${errorInfo || ''}`, [
        { style: 'cancel', text: 'OK' },
      ]);
    } else {
      // En producción, solo mostrar mensaje amigable
      Alert.alert('Error', 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.', [
        { style: 'cancel', text: 'OK' },
      ]);
    }
  };

  return { handleError };
};
