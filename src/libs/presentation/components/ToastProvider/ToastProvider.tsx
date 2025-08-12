import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';

import { AlertCircle, AlertTriangle, CheckCircle, X } from 'lucide-react-native';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  onDismiss?: () => void;
}

interface Toast extends ToastOptions {
  id: string;
  timestamp: number;
}

interface ToastContextType {
  show: (options: ToastOptions) => string;
  hide: (id: string) => void;
  hideAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (options: ToastOptions): string => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const toast: Toast = {
      ...options,
      duration: options.duration || 4000,
      id,
      timestamp: Date.now(),
      type: options.type || 'info',
    };

    setToasts((prev) => {
      const newToasts = [toast, ...prev];
      // Limitar número máximo de toasts
      return newToasts.slice(0, maxToasts);
    });

    // Auto dismiss si tiene duración
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        hide(id);
      }, toast.duration);
    }

    return id;
  };

  const hide = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const hideAll = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ hide, hideAll, show }}>
      {children}
      <ToastContainer>
        {toasts.map((toast, index) => (
          <ToastItem index={index} key={toast.id} toast={toast} onDismiss={() => hide(toast.id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  index: number;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ index = 0, onDismiss = () => {}, toast = null }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(translateY, {
        friction: 8,
        tension: 100,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        duration: 250,
        toValue: -100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 250,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (toast.onDismiss) {
        toast.onDismiss();
      }
      onDismiss();
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > width * 0.3) {
        // Swipe para dismissar
        Animated.timing(translateX, {
          duration: 200,
          toValue: gestureState.dx > 0 ? width : -width,
          useNativeDriver: true,
        }).start(dismissToast);
      } else {
        // Volver a posición original
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const getIcon = () => {
    const iconProps = { color: theme.colors.white, size: 20 };
    switch (toast.type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <AlertCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      default:
        return <AlertCircle {...iconProps} />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return theme.colors.success[500];
      case 'error':
        return theme.colors.error[500];
      case 'warning':
        return theme.colors.warning[500];
      default:
        return theme.colors.info[500];
    }
  };

  return (
    <AnimatedToast
      style={{
        opacity,
        top: index * (TOAST_HEIGHT + TOAST_SPACING),
        transform: [{ translateY }, { translateX }],
        zIndex: 1000 - index,
      }}
      {...panResponder.panHandlers}
    >
      <ToastContent $backgroundColor={getBackgroundColor()}>
        <ToastIcon>{getIcon()}</ToastIcon>

        <ToastTextContainer>
          {toast.title && <ToastTitle numberOfLines={1}>{toast.title}</ToastTitle>}
          <ToastMessage numberOfLines={2}>{toast.message}</ToastMessage>
        </ToastTextContainer>

        <ToastActions>
          {toast.action && (
            <ActionButton onPress={toast.action.onPress}>
              <ActionButtonText>{toast.action.label}</ActionButtonText>
            </ActionButton>
          )}
          <CloseButton onPress={dismissToast}>
            <X color={theme.colors.white} size={16} />
          </CloseButton>
        </ToastActions>
      </ToastContent>
    </AnimatedToast>
  );
};

// Constants
const TOAST_HEIGHT = 80;
const TOAST_SPACING = 8;

// Styled Components
const ToastContainer = styled.View`
  position: absolute;
  top: 60px;
  left: ${theme.spacing.md}px;
  right: ${theme.spacing.md}px;
  z-index: 1000;
`;

const AnimatedToast = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
`;

const ToastContent = styled.View<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  min-height: ${TOAST_HEIGHT}px;
  ${theme.shadows.lg}
`;

const ToastIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const ToastTextContainer = styled.View`
  flex: 1;
`;

const ToastTitle = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: bold;
  font-family: ${theme.typography.fontFamily.primary.bold};
  margin-bottom: 2px;
`;

const ToastMessage = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  opacity: 0.9;
  line-height: 18px;
`;

const ToastActions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${theme.spacing.sm}px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: rgb(255 255 255 / 0.2);
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-right: ${theme.spacing.sm}px;
`;

const ActionButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
`;
