import React, { useEffect } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Container>
      <Logo>ReservApp</Logo>
      <Subtitle>Tu plataforma de reservas</Subtitle>
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary[500]} size='large' />
      </LoadingContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Logo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 40px;
`;

const LoadingContainer = styled.View`
  margin-top: 20px;
`;

export default SplashScreen;
