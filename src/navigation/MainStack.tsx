import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MainStackParamList } from '@navigation/types';
import ProfileScreen from '@mod-profile/presentation/components/UserProfileScreen/UserProfileScreen';
import SettingsScreen from '@presentation/screens/main/AccountScreen';

import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerShown: false,
      }}
    >
      <Stack.Screen component={TabNavigator} name='TabNavigator' />
      <Stack.Screen
        component={ProfileScreen}
        name='Profile'
        options={{ headerShown: true, title: 'Perfil' }}
      />
      <Stack.Screen
        component={SettingsScreen}
        name='Settings'
        options={{ headerShown: true, title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
