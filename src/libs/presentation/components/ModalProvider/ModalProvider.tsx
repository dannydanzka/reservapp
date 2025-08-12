import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Animated, BackHandler, Dimensions, Modal, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

const { height, width } = Dimensions.get('window');

export interface ModalOptions {
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  position?: 'center' | 'bottom' | 'top';
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnBackButton?: boolean;
  onClose?: () => void;
  animationType?: 'fade' | 'slide' | 'none';
}

interface ModalItem {
  id: string;
  content: ReactNode;
  options: ModalOptions;
}

interface ModalContextType {
  show: (content: ReactNode, options?: ModalOptions) => string;
  hide: (id?: string) => void;
  hideAll: () => void;
  update: (id: string, content: ReactNode, options?: ModalOptions) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const show = (content: ReactNode, options: ModalOptions = {}): string => {
    const id = `modal_${Date.now()}_${Math.random()}`;
    const modalItem: ModalItem = {
      content,
      id,
      options: {
        animationType: 'fade',
        closable: true,
        closeOnBackButton: true,
        closeOnBackdrop: true,
        position: 'center',
        size: 'medium',
        ...options,
      },
    };

    setModals((prev) => [...prev, modalItem]);
    return id;
  };

  const hide = (id?: string) => {
    if (id) {
      const modal = modals.find((m) => m.id === id);
      if (modal?.options.onClose) {
        modal.options.onClose();
      }
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      // Hide the topmost modal
      const topModal = modals[modals.length - 1];
      if (topModal) {
        if (topModal.options.onClose) {
          topModal.options.onClose();
        }
        setModals((prev) => prev.slice(0, -1));
      }
    }
  };

  const hideAll = () => {
    modals.forEach((modal) => {
      if (modal.options.onClose) {
        modal.options.onClose();
      }
    });
    setModals([]);
  };

  const update = (id: string, content: ReactNode, options?: ModalOptions) => {
    setModals((prev) =>
      prev.map((modal) =>
        modal.id === id ? { ...modal, content, options: { ...modal.options, ...options } } : modal
      )
    );
  };

  return (
    <ModalContext.Provider value={{ hide, hideAll, show, update }}>
      {children}
      {modals.map((modal, index) => (
        <ModalComponent
          isTopmost={index === modals.length - 1}
          key={modal.id}
          modal={modal}
          onRequestClose={() => hide(modal.id)}
        />
      ))}
    </ModalContext.Provider>
  );
};

interface ModalComponentProps {
  modal: ModalItem;
  isTopmost: boolean;
  onRequestClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isTopmost = false,
  modal = null,
  onRequestClose = () => {},
}) => {
  const { content, options } = modal;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  React.useEffect(() => {
    if (isTopmost && options.closeOnBackButton) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onRequestClose();
        return true;
      });
      return () => backHandler.remove();
    }
  }, [isTopmost, options.closeOnBackButton, onRequestClose]);

  const handleBackdropPress = () => {
    if (options.closeOnBackdrop) {
      onRequestClose();
    }
  };

  const getContainerStyle = () => {
    const baseStyle: any = {};

    switch (options.position) {
      case 'bottom':
        baseStyle.justifyContent = 'flex-end';
        break;
      case 'top':
        baseStyle.justifyContent = 'flex-start';
        baseStyle.paddingTop = 50;
        break;
      default:
        baseStyle.justifyContent = 'center';
        break;
    }

    return baseStyle;
  };

  const getModalStyle = () => {
    const baseStyle: any = {
      opacity: opacityAnim,
      transform: [{ scale: scaleAnim }],
    };

    switch (options.size) {
      case 'small':
        baseStyle.width = Math.min(width * 0.8, 300);
        baseStyle.maxHeight = height * 0.4;
        break;
      case 'large':
        baseStyle.width = Math.min(width * 0.95, 500);
        baseStyle.maxHeight = height * 0.8;
        break;
      case 'fullscreen':
        baseStyle.width = width;
        baseStyle.height = height;
        baseStyle.margin = 0;
        break;
      default:
        baseStyle.width = Math.min(width * 0.9, 400);
        baseStyle.maxHeight = height * 0.7;
        break;
    }

    if (options.position === 'bottom') {
      baseStyle.borderTopLeftRadius = theme.borderRadius.xl;
      baseStyle.borderTopRightRadius = theme.borderRadius.xl;
      baseStyle.borderBottomLeftRadius = 0;
      baseStyle.borderBottomRightRadius = 0;
      baseStyle.marginBottom = 0;
    }

    return baseStyle;
  };

  return (
    <Modal
      animationType={options.animationType}
      transparent
      visible
      onRequestClose={onRequestClose}
    >
      <ModalOverlay style={getContainerStyle()}>
        <Pressable style={{ flex: 1 }} onPress={handleBackdropPress}>
          <ModalBackdrop />
        </Pressable>

        <AnimatedModalContent style={getModalStyle()}>
          <ModalContainer>
            {/* Header */}
            {(options.title || options.closable) && (
              <ModalHeader>
                {options.title && <ModalTitle numberOfLines={1}>{options.title}</ModalTitle>}
                {options.closable && (
                  <CloseButton onPress={onRequestClose}>
                    <X color={theme.colors.gray[500]} size={24} />
                  </CloseButton>
                )}
              </ModalHeader>
            )}

            {/* Content */}
            <ModalBody>{content}</ModalBody>
          </ModalContainer>
        </AnimatedModalContent>
      </ModalOverlay>
    </Modal>
  );
};

// Styled Components
const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgb(0 0 0 / 0.5);
  align-items: center;
  padding: ${theme.spacing.lg}px;
`;

const ModalBackdrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AnimatedModalContent = styled(Animated.View)`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  ${theme.shadows.xl}
  overflow: hidden;
`;

const ModalContainer = styled.View`
  flex: 1;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[200]};
`;

const ModalTitle = styled.Text`
  flex: 1;
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-right: ${theme.spacing.md}px;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.full}px;
`;

const ModalBody = styled.View`
  flex: 1;
`;

// Convenience components for common modal types
export const AlertModal: React.FC<{
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: 'info' | 'warning' | 'error' | 'success';
}> = ({
  cancelText = '',
  confirmText = 'Aceptar',
  message = '',
  onCancel = () => {},
  onConfirm = () => {},
  title = '',
  type = 'info',
}) => {
  const { hide } = useModal();

  const getIcon = () => {
    const iconProps = { size: 48 };
    switch (type) {
      case 'warning':
        return <X {...iconProps} color={theme.colors.warning[500]} />;
      case 'error':
        return <X {...iconProps} color={theme.colors.error[500]} />;
      case 'success':
        return <X {...iconProps} color={theme.colors.success[500]} />;
      default:
        return <X {...iconProps} color={theme.colors.info[500]} />;
    }
  };

  return (
    <AlertContainer>
      <AlertIcon>{getIcon()}</AlertIcon>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertMessage>{message}</AlertMessage>
      <AlertActions>
        {cancelText && onCancel && (
          <AlertButton variant='secondary' onPress={onCancel}>
            <AlertButtonText variant='secondary'>{cancelText}</AlertButtonText>
          </AlertButton>
        )}
        <AlertButton variant='primary' onPress={() => (onConfirm || hide)()}>
          <AlertButtonText variant='primary'>{confirmText}</AlertButtonText>
        </AlertButton>
      </AlertActions>
    </AlertContainer>
  );
};

const AlertContainer = styled.View`
  padding: ${theme.spacing.xl}px;
  align-items: center;
`;

const AlertIcon = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const AlertTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const AlertMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
  line-height: 24px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const AlertActions = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const AlertButton = styled.TouchableOpacity<{
  variant: 'primary' | 'secondary';
}>`
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${(props) =>
    props.variant === 'primary' ? theme.colors.primary[500] : theme.colors.gray[100]};
  border-width: ${(props) => (props.variant === 'secondary' ? '1px' : '0')};
  border-color: ${(props) =>
    props.variant === 'secondary' ? theme.colors.gray[300] : 'transparent'};
`;

const AlertButtonText = styled.Text<{ variant: 'primary' | 'secondary' }>`
  color: ${(props) => (props.variant === 'primary' ? theme.colors.white : theme.colors.gray[700])};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.primary.bold};
  text-align: center;
`;
