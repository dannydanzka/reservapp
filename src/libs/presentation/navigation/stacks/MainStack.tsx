import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MainDrawer } from '../drawers/MainDrawer';
import { MainStackParamList } from '../types';
import { ReservationDetailScreen } from '../../../../modules/mod-reservation/presentation/components/ReservationDetailScreen';
import { ReservationFlowScreen } from '../../../../modules/mod-reservation/presentation/components/ReservationFlowScreen';
import { ServiceDetailScreen } from '../../../../modules/mod-services/presentation/components/ServiceDetailScreen';

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='MainDrawer' screenOptions={{ headerShown: false }}>
      <Stack.Screen component={MainDrawer} name='MainDrawer' />
      <Stack.Screen
        component={ServiceDetailScreen}
        name='ServiceDetail'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ReservationDetailScreen}
        name='ReservationDetails'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ReservationFlowScreen}
        name='ReservationFlow'
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
