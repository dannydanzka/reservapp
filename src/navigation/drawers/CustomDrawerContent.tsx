import React from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { User, UserCircle, Calendar, CreditCard, Settings, HelpCircle, Info, LogOut } from 'lucide-react-native';
import styled from 'styled-components/native';

import { useAppSelector, useAppDispatch } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { theme } from '../../libs/ui/theme/theme';

const CustomDrawerContent: React.FC<any> = (props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  return (
    <Container>
      {/* Header with user info */}
      <DrawerHeader>
        <UserAvatar>
          <User size={40} color={theme.colors.white} />
        </UserAvatar>
        <UserInfo>
          <UserName>{user?.name || 'Usuario'}</UserName>
          <UserEmail>{user?.email || 'usuario@email.com'}</UserEmail>
        </UserInfo>
      </DrawerHeader>

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItem
          label="Mi Perfil"
          onPress={() => props.navigation.navigate('Profile')}
          icon={({ color, size }) => <UserCircle color={color} size={size} />}
        />
        
        <DrawerItem
          label="Mis Reservas"
          onPress={() => props.navigation.navigate('MyBookings')}
          icon={({ color, size }) => <Calendar color={color} size={size} />}
        />

        <DrawerItem
          label="Métodos de Pago"
          onPress={() => props.navigation.navigate('PaymentMethods')}
          icon={({ color, size }) => <CreditCard color={color} size={size} />}
        />

        <Separator />

        <DrawerItem
          label="Configuración"
          onPress={() => props.navigation.navigate('Settings')}
          icon={({ color, size }) => <Settings color={color} size={size} />}
        />

        <DrawerItem
          label="Ayuda y Soporte"
          onPress={() => props.navigation.navigate('HelpSupport')}
          icon={({ color, size }) => <HelpCircle color={color} size={size} />}
        />

        <DrawerItem
          label="Acerca de"
          onPress={() => props.navigation.navigate('About')}
          icon={({ color, size }) => <Info color={color} size={size} />}
        />
      </DrawerContentScrollView>

      {/* Footer with logout */}
      <DrawerFooter>
        <LogoutButton onPress={handleLogout}>
          <LogOut size={20} color={theme.colors.error[500]} />
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