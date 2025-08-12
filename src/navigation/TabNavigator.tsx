import React from 'react';

import { Calendar, Home, List, User } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '@utils/constants';
import { TabParamList } from '@navigation/types';
import { theme } from '@styles/theme';
import AccountScreen from '@presentation/screens/main/AccountScreen';
import HomeScreen from '@presentation/screens/main/HomeScreen';
import ReservationsScreen from '@presentation/screens/main/ReservationsScreen';
import ServicesScreen from '@presentation/screens/main/ServicesScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.backgroundSecondary,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name='Home'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <Home color={color} size={size} />
          ),
          title: 'Inicio',
        }}
      />
      <Tab.Screen
        component={ReservationsScreen}
        name='Reservations'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <Calendar color={color} size={size} />
          ),
          title: 'Reservas',
        }}
      />
      <Tab.Screen
        component={ServicesScreen}
        name='Services'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <List color={color} size={size} />
          ),
          title: 'Servicios',
        }}
      />
      <Tab.Screen
        component={AccountScreen}
        name='Account'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <User color={color} size={size} />
          ),
          title: 'Cuenta',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
