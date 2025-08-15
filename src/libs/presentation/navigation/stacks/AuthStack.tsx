import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from '../types';
import { LoginScreen } from '../../../../modules/mod-auth/presentation/components/LoginScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name='Login' />
    </Stack.Navigator>
  );
};
