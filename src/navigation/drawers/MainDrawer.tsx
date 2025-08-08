import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MainDrawerParamList } from '../types';
import { theme } from '../../libs/ui/theme/theme';
import TabNavigator from '../tabs/TabNavigator';
import CustomDrawerContent from './CustomDrawerContent';

// Screens que van en el drawer
import ProfileScreen from '../../screens/drawer/ProfileScreen';
import SettingsScreen from '../../screens/drawer/SettingsScreen';
import MyBookingsScreen from '../../screens/drawer/MyBookingsScreen';
import PaymentMethodsScreen from '../../screens/drawer/PaymentMethodsScreen';
import HelpSupportScreen from '../../screens/drawer/HelpSupportScreen';
import AboutScreen from '../../screens/drawer/AboutScreen';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.white,
          width: 280,
        },
        drawerActiveTintColor: theme.colors.primary[500],
        drawerInactiveTintColor: theme.colors.gray[600],
        drawerLabelStyle: {
          fontSize: theme.typography.fontSize.md,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen 
        name="TabNavigator" 
        component={TabNavigator}
        options={{
          drawerLabel: 'Inicio',
          drawerItemStyle: { display: 'none' }, // Hidden from drawer menu
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ drawerLabel: 'Mi Perfil' }}
      />
      <Drawer.Screen 
        name="MyBookings" 
        component={MyBookingsScreen}
        options={{ drawerLabel: 'Mis Reservas' }}
      />
      <Drawer.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen}
        options={{ drawerLabel: 'Métodos de Pago' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ drawerLabel: 'Configuración' }}
      />
      <Drawer.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen}
        options={{ drawerLabel: 'Ayuda y Soporte' }}
      />
      <Drawer.Screen 
        name="About" 
        component={AboutScreen}
        options={{ drawerLabel: 'Acerca de' }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;