import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainStackParamList } from './types';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: true, title: 'Perfil' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: true, title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;