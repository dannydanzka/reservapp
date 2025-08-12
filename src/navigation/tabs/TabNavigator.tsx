import React from 'react';

import { Calendar, Home as HomeIcon, Settings, ShoppingBag, Wallet } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabParamList } from '@navigation/types';
import { theme } from '@styles/theme';
import HomeScreen from '@presentation/screens/main/HomeScreen';
import ReservationsScreen from '@presentation/screens/main/ReservationsScreen';
import ServicesScreen from '@presentation/screens/main/ServicesScreen';
import SettingsScreen from '@presentation/screens/main/AccountScreen';
import WalletScreen from '@mod-payments/presentation/components/wallet/Wallet.screen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.primary.medium,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.gray[200],
          elevation: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          shadowOffset: { height: -2, width: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name='Home'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <HomeIcon color={color} size={size} />
          ),
          title: 'Inicio',
        }}
      />

      <Tab.Screen
        component={ServicesScreen}
        name='Services'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <ShoppingBag color={color} size={size} />
          ),
          title: 'Servicios',
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
        component={WalletScreen}
        name='Wallet'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <Wallet color={color} size={size} />
          ),
          title: 'Billetera',
        }}
      />

      <Tab.Screen
        component={SettingsScreen}
        name='Settings'
        options={{
          tabBarIcon: ({ color = theme.colors.gray[400], size = 24 }) => (
            <Settings color={color} size={size} />
          ),
          title: 'Ajustes',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
