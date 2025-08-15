import React, { useEffect } from 'react';

import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  MapPin,
  Search,
  User,
} from 'lucide-react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import { DrawerParamList } from '../types';
import { getProfile, logout } from '../../../infrastructure/state/slices/authSlice';
import { HomeTabs } from '../tabs/HomeTabs';
import { NotificationsScreen } from '../../../../modules/mod-notification/presentation/components/NotificationsScreen';
import { PagosScreen } from '../../../../modules/mod-payments/presentation/components/PagosScreen';
import { ProfileScreen } from '../../../../modules/mod-profile/presentation/components/ProfileScreen';
import { ReservationScreen } from '../../../../modules/mod-reservation/presentation/components/ReservationScreen';
import { useAppDispatch, useAppSelector } from '../../../infrastructure/store/hooks';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent: React.FC<any> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const dashboardUser = useAppSelector((state) => state.dashboard.data?.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Load user profile on drawer initialization
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  // Use dashboard user data if available, otherwise fallback to auth user
  const displayUser = dashboardUser || user;

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
      icon: Search,
      label: 'Servicios',
      name: 'Discover',
      onPress: () => navigation.navigate('HomeTabs', { screen: 'Services' }),
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
      icon: CreditCard,
      label: 'Pagos',
      name: 'Pagos',
      onPress: () => navigation.navigate('Pagos'),
    },
    {
      icon: User,
      label: 'Mi Perfil',
      name: 'Profile',
      onPress: () => navigation.navigate('Profile'),
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

        <Text style={styles.userGreeting}>
          ¡Hola! {displayUser?.firstName} {displayUser?.lastName}
        </Text>
      </View>

      <View style={styles.menuItems}>
        {drawerItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <View key={item.name} style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <IconComponent color='#6B7280' size={20} />
                <Text style={styles.menuItemText} onPress={item.onPress}>
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Logout Button - Separated at the bottom */}
      <View style={styles.logoutSection}>
        <View style={styles.separator} />
        <View style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <LogOut color='#EF4444' size={20} />
            <Text style={[styles.menuItemText, styles.logoutText]} onPress={handleLogout}>
              Cerrar Sesión
            </Text>
          </View>
        </View>
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
        component={ReservationScreen}
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
        component={PagosScreen}
        name='Pagos'
        options={{
          drawerIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
          drawerLabel: 'Pagos',
          headerShown: true,
          title: 'Pagos',
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
    marginTop: 20,
  },
  logoutSection: {
    paddingBottom: 20,
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
  separator: {
    backgroundColor: '#E5E7EB',
    height: 1,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  userGreeting: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 14,
  },
});
