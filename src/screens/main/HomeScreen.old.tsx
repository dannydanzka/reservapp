import React from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Plus, List, Clock } from 'lucide-react-native';

import { Button } from '../../components';
import { COLORS } from '../../utils/constants';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const HomeScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => dispatch(logout()) },
      ]
    );
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header>
          <WelcomeText>¡Hola, {user?.name}!</WelcomeText>
          <Subtitle>Bienvenido a ReservApp</Subtitle>
        </Header>

        <Section>
          <SectionTitle>Acciones Rápidas</SectionTitle>
          
          <ActionCard>
            <ActionIcon>
              <Plus size={24} color={COLORS.primary} />
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Nueva Reserva</ActionTitle>
              <ActionDescription>Crea una nueva reserva de servicio</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard>
            <ActionIcon>
              <List size={24} color={COLORS.primary} />
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Mis Reservas</ActionTitle>
              <ActionDescription>Ve tus reservas activas y pasadas</ActionDescription>
            </ActionContent>
          </ActionCard>

          <ActionCard>
            <ActionIcon>
              <Clock size={24} color={COLORS.primary} />
            </ActionIcon>
            <ActionContent>
              <ActionTitle>Horarios Disponibles</ActionTitle>
              <ActionDescription>Consulta disponibilidad de servicios</ActionDescription>
            </ActionContent>
          </ActionCard>
        </Section>

        <Section>
          <Button
            title="Cerrar Sesión"
            variant="secondary"
            onPress={handleLogout}
            style={{ marginTop: 20 }}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

const Header = styled.View`
  padding: 20px;
  background-color: ${COLORS.primary};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 20px;
`;

const WelcomeText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const Section = styled.View`
  padding: 0 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 16px;
`;

const ActionCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.backgroundSecondary};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const ActionIcon = styled.View`
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ActionContent = styled.View`
  flex: 1;
`;

const ActionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 4px;
`;

const ActionDescription = styled.Text`
  font-size: 14px;
  color: ${COLORS.textSecondary};
`;

export default HomeScreen;