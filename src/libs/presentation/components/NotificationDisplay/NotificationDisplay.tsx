import React from 'react';

import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react-native';
import { Animated, Dimensions, PanGestureHandler, State } from 'react-native';
import styled from 'styled-components/native';

import { NotificationItem, useNotifications } from '@components';
import { theme } from '@styles/theme';

const { width: screenWidth } = Dimensions.get('window');

interface NotificationDisplayProps {
  notification: NotificationItem;
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  notification = { id: '', message: '', title: '', type: 'info' },
}) => {
  const { removeNotification } = useNotifications();
  const translateX = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(translateX, {
        duration: 300,
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

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        duration: 200,
        toValue: screenWidth,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      removeNotification(notification.id);
    });
  };

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: true,
  });

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;

      if (translationX > screenWidth * 0.3) {
        // Dismiss if swiped more than 30% of screen width
        handleDismiss();
      } else {
        // Snap back to original position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle color={theme.colors.success[500]} size={20} />;
      case 'error':
        return <XCircle color={theme.colors.error[500]} size={20} />;
      case 'warning':
        return <AlertTriangle color={theme.colors.warning[500]} size={20} />;
      case 'info':
      default:
        return <Info color={theme.colors.primary[500]} size={20} />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return theme.colors.success[50];
      case 'error':
        return theme.colors.error[50];
      case 'warning':
        return theme.colors.warning[50];
      case 'info':
      default:
        return theme.colors.primary[50];
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return theme.colors.success[200];
      case 'error':
        return theme.colors.error[200];
      case 'warning':
        return theme.colors.warning[200];
      case 'info':
      default:
        return theme.colors.primary[200];
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <NotificationContainer
        backgroundColor={getBackgroundColor()}
        borderColor={getBorderColor()}
        style={{
          opacity,
          transform: [{ translateX }],
        }}
      >
        <NotificationContent>
          <NotificationIcon>{getIcon()}</NotificationIcon>

          <NotificationText>
            {notification.title && <NotificationTitle>{notification.title}</NotificationTitle>}
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationText>

          <DismissButton onPress={handleDismiss}>
            <X color={theme.colors.gray[500]} size={16} />
          </DismissButton>
        </NotificationContent>

        {notification.action && (
          <NotificationAction onPress={notification.action.onPress}>
            <NotificationActionText>{notification.action.text}</NotificationActionText>
          </NotificationAction>
        )}
      </NotificationContainer>
    </PanGestureHandler>
  );
};

// Container component to display all notifications
export const NotificationsContainer: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <NotificationsWrapper>
      {notifications.map((notification) => (
        <NotificationDisplay key={notification.id} notification={notification} />
      ))}
    </NotificationsWrapper>
  );
};

// Styled Components
const NotificationsWrapper = styled.View`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 10000;
  pointer-events: box-none;
`;

const NotificationContainer = styled(Animated.View)<{
  backgroundColor: string;
  borderColor: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: ${theme.borderRadius.lg}px;
  margin: ${theme.spacing.sm}px ${theme.spacing.lg}px;
  ${theme.shadows.md}
  overflow: hidden;
`;

const NotificationContent = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: ${theme.spacing.lg}px;
`;

const NotificationIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.xs}px;
`;

const NotificationText = styled.View`
  flex: 1;
`;

const NotificationTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const NotificationMessage = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 18px;
`;

const DismissButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
  margin-left: ${theme.spacing.sm}px;
`;

const NotificationAction = styled.TouchableOpacity`
  border-top-width: 1px;
  border-top-color: ${theme.colors.border.light};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  align-items: center;
`;

const NotificationActionText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  color: ${theme.colors.primary[600]};
`;

export default NotificationsContainer;
