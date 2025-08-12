import React from 'react';

import { Alert, TouchableOpacity } from 'react-native';
import {
  Bell,
  Calendar,
  CreditCard,
  HelpCircle,
  Info,
  LogOut,
  Settings,
  User,
  UserCircle,
} from 'lucide-react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import styled from 'styled-components/native';

import { logout } from '@infrastructure/state/slices/authSlice';
import { theme } from '@styles/theme';
import { useAppDispatch, useAppSelector } from '@infrastructure/state/store';

const CustomDrawerContent: React.FC<any> = (props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { style: 'cancel', text: 'Cancelar' },
      {
        onPress: () => dispatch(logout()),
        style: 'destructive',
        text: 'Cerrar Sesión',
      },
    ]);
  };

  return (
    <Container>
      {/* Header with user info */}
      <DrawerHeader>
        <UserAvatar>
          <User color={theme.colors.white} size={40} />
        </UserAvatar>
        <UserInfo>
          <UserName>{user?.name || 'Usuario'}</UserName>
          <UserEmail>{user?.email || 'usuario@email.com'}</UserEmail>
        </UserInfo>
      </DrawerHeader>

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <UserCircle color={color} size={size} />
          )}
          label='Mi Perfil'
          onPress={() => props.navigation.navigate('Profile')}
        />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <Bell color={color} size={size} />
          )}
          label='Notificaciones'
          onPress={() => props.navigation.navigate('Notifications')}
        />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <Calendar color={color} size={size} />
          )}
          label='Mis Reservas'
          onPress={() => props.navigation.navigate('MyBookings')}
        />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <CreditCard color={color} size={size} />
          )}
          label='Métodos de Pago'
          onPress={() => props.navigation.navigate('PaymentMethods')}
        />

        <Separator />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <Settings color={color} size={size} />
          )}
          label='Configuración'
          onPress={() => props.navigation.navigate('Settings')}
        />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <HelpCircle color={color} size={size} />
          )}
          label='Ayuda y Soporte'
          onPress={() => props.navigation.navigate('HelpSupport')}
        />

        <DrawerItem
          icon={({ color = theme.colors.gray[400], size = 24 }) => (
            <Info color={color} size={size} />
          )}
          label='Acerca de'
          onPress={() => props.navigation.navigate('About')}
        />
      </DrawerContentScrollView>

      {/* Footer with logout */}
      <DrawerFooter>
        <LogoutButton onPress={handleLogout}>
          <LogOut color={theme.colors.error[500]} size={20} />
          <LogoutText>Cerrar Sesión</LogoutText>
        </LogoutButton>
      </DrawerFooter>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const DrawerHeader = styled.View`
  background-color: ${theme.colors.primary[500]};
  padding: ${theme.spacing.xl}px ${theme.spacing.md}px ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.primary[600]};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs}px;
`;

const UserEmail = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  opacity: 0.8;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${theme.colors.gray[200]};
  margin: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

const DrawerFooter = styled.View`
  padding: ${theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.gray[200]};
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const LogoutText = styled.Text`
  color: ${theme.colors.error[500]};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 500;
  margin-left: ${theme.spacing.sm}px;
`;

export default CustomDrawerContent;
