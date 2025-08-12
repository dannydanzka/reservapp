import React from 'react';

import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const VenueDetailsScreen: React.FC = () => {
  return (
    <Container>
      <Text>VenueDetails Screen</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default VenueDetailsScreen;
