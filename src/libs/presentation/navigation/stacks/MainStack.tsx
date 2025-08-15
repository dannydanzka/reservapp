import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MainDrawer } from '../drawers/MainDrawer';
import { MainStackParamList } from '../types';
import { ReservationFlowScreen } from '../../../../modules/mod-reservation/presentation/components/ReservationFlowScreen';
import { VenueDetailsScreen } from '../../components/VenueDetailsScreen';

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='MainDrawer' screenOptions={{ headerShown: false }}>
      <Stack.Screen component={MainDrawer} name='MainDrawer' />
      <Stack.Screen
        component={VenueDetailsScreen}
        name='VenueDetails'
        options={{ headerShown: true }}
      />
      <Stack.Screen
        component={ReservationFlowScreen}
        name='ReservationFlow'
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
