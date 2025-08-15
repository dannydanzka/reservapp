import React from 'react';

import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const Logo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #666666;
  margin-top: 10px;
`;

export const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <Logo>ReservApp</Logo>
      <ActivityIndicator color='#007bff' size='large' />
      <LoadingText>Cargando...</LoadingText>
    </Container>
  );
};
