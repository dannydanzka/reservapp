import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { COLORS } from '../../utils/constants';

const ServicesScreen: React.FC = () => {
  return (
    <Container>
      <Title>Servicios</Title>
      <Subtitle>Explora nuestros servicios disponibles</Subtitle>
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

export default ServicesScreen;