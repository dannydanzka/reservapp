import React from 'react';

import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const VenueListScreen: React.FC = () => {
  return (
    <Container>
      <Text>VenueList Screen</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default VenueListScreen;
