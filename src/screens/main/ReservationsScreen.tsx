import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { COLORS } from '../../utils/constants';

const ReservationsScreen: React.FC = () => {
  return (
    <Container>
      <Title>Mis Reservas</Title>
      <Subtitle>Aquí aparecerán tus reservas</Subtitle>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.background};
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.textSecondary};
  text-align: center;
`;

export default ReservationsScreen;