import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BookingFlowParamList } from '../types';
import ServiceSelectionScreen from '../../screens/booking/ServiceSelectionScreen';
import DateTimeSelectionScreen from '../../screens/booking/DateTimeSelectionScreen';
import GuestInfoScreen from '../../screens/booking/GuestInfoScreen';
import PaymentScreen from '../../screens/booking/PaymentScreen';
import ConfirmationScreen from '../../screens/booking/ConfirmationScreen';

const Stack = createStackNavigator<BookingFlowParamList>();

const BookingFlow: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen 
        name="ServiceSelection" 
        component={ServiceSelectionScreen}
        options={{ title: 'Seleccionar Servicio' }}
      />
      <Stack.Screen 
        name="DateTimeSelection" 
        component={DateTimeSelectionScreen}
        options={{ title: 'Fecha y Hora' }}
      />
      <Stack.Screen 
        name="GuestInfo" 
        component={GuestInfoScreen}
        options={{ title: 'Información de Huéspedes' }}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{ title: 'Pago' }}
      />
      <Stack.Screen 
        name="Confirmation" 
        component={ConfirmationScreen}
        options={{ 
          title: 'Confirmación',
          headerLeft: () => null, // No back button on confirmation
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingFlow;