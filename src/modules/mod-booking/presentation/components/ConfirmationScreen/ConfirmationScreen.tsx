import React from 'react';

import styled from 'styled-components/native';

import { ScreenLayout } from '@layouts';
import { theme } from '@presentation/styles/theme';

const ConfirmationScreen: React.FC = () => {
  return (
    <ScreenLayout>
      <Container>
        <Title>Confirmación</Title>
        <Subtitle>Pantalla en desarrollo</Subtitle>
      </Container>
    </ScreenLayout>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[600]};
  text-align: center;
`;

export default ConfirmationScreen;
