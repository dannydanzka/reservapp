import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../libs/ui/theme/theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary[500],
  message,
  fullScreen = false,
}) => {
  const Container = fullScreen ? FullScreenContainer : InlineContainer;

  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
      {message && <Message>{message}</Message>}
    </Container>
  );
};

const FullScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
`;

const InlineContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const Message = styled.Text`
  margin-top: ${theme.spacing.md}px;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.md}px;
  text-align: center;
`;

export { LoadingSpinner };