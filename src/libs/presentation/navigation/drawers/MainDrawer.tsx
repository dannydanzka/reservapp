import React from 'react';

import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  MapPin,
  Search,
  Settings,
  User,
} from 'lucide-react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import { DrawerParamList } from '../types';
import { HomeTabs } from '../tabs/HomeTabs';
import { logout } from '../../../infrastructure/state/slices/authSlice';
import { NotificationsScreen } from '../../../../modules/mod-notification/presentation/components/NotificationsScreen';
import { ProfileScreen } from '../../../../modules/mod-profile/presentation/components/ProfileScreen';
import { ReservationsScreen } from '../../components/ReservationsScreen';
import { SettingsScreen } from '../../components/SettingsScreen';
import { useAppDispatch } from '../../../infrastructure/store/hooks';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent: React.FC<any> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawerItems = [
    {
      icon: Home,
      label: 'Inicio',
      name: 'HomeTabs',
      onPress: () => navigation.navigate('HomeTabs'),
    },
    {
      icon: Calendar,
      label: 'Mis Reservas',
      name: 'Reservations',
      onPress: () => navigation.navigate('Reservations'),
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      name: 'Notifications',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      icon: User,
      label: 'Mi Perfil',
      name: 'Profile',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      icon: Settings,
      label: 'Configuración',
      name: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: LogOut,
      isAction: true,
      label: 'Cerrar Sesión',
      name: 'Logout',
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.drawerContent}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MapPin color='#6B46C1' size={32} />
          <Text style={styles.appTitle}>ReservApp</Text>
        </View>
        <Text style={styles.subtitle}>Tu plataforma de reservas</Text>
      </View>

      <View style={styles.menuItems}>
        {drawerItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <View key={item.name} style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <IconComponent color={item.isAction ? '#EF4444' : '#6B7280'} size={20} />
                <Text
                  style={[styles.menuItemText, item.isAction && styles.logoutText]}
                  onPress={item.onPress}
                >
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#6B46C1',
        drawerInactiveTintColor: '#6B7280',
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        component={HomeTabs}
        name='HomeTabs'
        options={{
          drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        component={ReservationsScreen}
        name='Reservations'
        options={{
          drawerIcon: ({ color, size }) => <Calendar color={color} size={size} />,
          drawerLabel: 'Mis Reservas',
          headerShown: true,
          title: 'Mis Reservas',
        }}
      />
      <Drawer.Screen
        component={NotificationsScreen}
        name='Notifications'
        options={{
          drawerIcon: ({ color, size }) => <Bell color={color} size={size} />,
          drawerLabel: 'Notificaciones',
          headerShown: true,
          title: 'Notificaciones',
        }}
      />
      <Drawer.Screen
        component={ProfileScreen}
        name='Profile'
        options={{
          drawerIcon: ({ color, size }) => <User color={color} size={size} />,
          drawerLabel: 'Mi Perfil',
          headerShown: true,
          title: 'Mi Perfil',
        }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name='Settings'
        options={{
          drawerIcon: ({ color, size }) => <Settings color={color} size={size} />,
          drawerLabel: 'Configuración',
          headerShown: true,
          title: 'Configuración',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    color: '#1F2937',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  drawerContent: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    backgroundColor: '#F8FAFC',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  logoutText: {
    color: '#EF4444',
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuItemContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuItemText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
  },
  menuItems: {
    flex: 1,
    paddingTop: 20,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
});
