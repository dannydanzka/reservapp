import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { BookingFlowParamList } from '@navigation/types';
import ConfirmationScreen from '@mod-booking/presentation/components/ConfirmationScreen/ConfirmationScreen';
import DateTimeSelectionScreen from '@mod-booking/presentation/components/DateTimeSelectionScreen/DateTimeSelectionScreen';
import GuestInfoScreen from '@mod-booking/presentation/components/GuestInfoScreen/GuestInfoScreen';
import PaymentScreen from '@mod-booking/presentation/components/PaymentScreen/PaymentScreen';
import ServiceSelectionScreen from '@mod-booking/presentation/components/ServiceSelectionScreen/ServiceSelectionScreen';

const Stack = createStackNavigator<BookingFlowParamList>();

const BookingFlow: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerShown: true,
      }}
    >
      <Stack.Screen
        component={ServiceSelectionScreen}
        name='ServiceSelection'
        options={{ title: 'Seleccionar Servicio' }}
      />
      <Stack.Screen
        component={DateTimeSelectionScreen}
        name='DateTimeSelection'
        options={{ title: 'Fecha y Hora' }}
      />
      <Stack.Screen
        component={GuestInfoScreen}
        name='GuestInfo'
        options={{ title: 'Información de Huéspedes' }}
      />
      <Stack.Screen component={PaymentScreen} name='Payment' options={{ title: 'Pago' }} />
      <Stack.Screen
        component={ConfirmationScreen}
        name='Confirmation'
        options={{
          headerLeft: () => null,
          title: 'Confirmación', // No back button on confirmation
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingFlow;
