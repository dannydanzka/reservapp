import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { MainDrawerParamList } from '@navigation/types';
import { theme } from '@styles/theme';
import NotificationsScreen from '@mod-notification/presentation/components/notifications/Notifications.screen';
import PaymentMethodsScreen from '@mod-payments/presentation/components/PaymentMethodsScreen/PaymentMethodsScreen';
import ProfileScreen from '@mod-profile/presentation/components/UserProfileScreen/UserProfileScreen';
import TabNavigator from '@navigation/tabs/TabNavigator';

import CustomDrawerContent from './CustomDrawerContent';

// Screens que van en el drawer

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      id={undefined}
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary[500],
        drawerInactiveTintColor: theme.colors.gray[600],
        drawerLabelStyle: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: '500',
        },
        drawerStyle: {
          backgroundColor: theme.colors.white,
          width: 280,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        component={TabNavigator}
        name='TabNavigator'
        options={{
          drawerItemStyle: { display: 'none' },
          drawerLabel: 'Inicio', // Hidden from drawer menu
        }}
      />
      <Drawer.Screen
        component={ProfileScreen}
        name='Profile'
        options={{ drawerLabel: 'Mi Perfil' }}
      />
      <Drawer.Screen
        component={NotificationsScreen}
        name='Notifications'
        options={{ drawerLabel: 'Notificaciones' }}
      />
      <Drawer.Screen
        component={MyBookingsScreen}
        name='MyBookings'
        options={{ drawerLabel: 'Mis Reservas' }}
      />
      <Drawer.Screen
        component={PaymentMethodsScreen}
        name='PaymentMethods'
        options={{ drawerLabel: 'Métodos de Pago' }}
      />
      <Drawer.Screen
        component={HelpSupportScreen}
        name='HelpSupport'
        options={{ drawerLabel: 'Ayuda y Soporte' }}
      />
      <Drawer.Screen component={AboutScreen} name='About' options={{ drawerLabel: 'Acerca de' }} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
