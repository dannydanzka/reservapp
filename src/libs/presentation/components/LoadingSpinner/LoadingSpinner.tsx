import React from 'react';

import { ActivityIndicator } from 'react-native';

import { LoadingSpinnerProps } from './LoadingSpinner.interface';
import { theme } from '../../styles/theme';

import { FullScreenContainer, InlineContainer, Message } from './LoadingSpinner.styled';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = theme.colors.primary[500],
  fullScreen = false,
  message = '',
  size = 'large',
}) => {
  const Container = fullScreen ? FullScreenContainer : InlineContainer;

  return (
    <Container>
      <ActivityIndicator color={color} size={size} />
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default LoadingSpinner;
