import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { 
  Calendar, 
  Building2, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Users,
  Plus,
  MoreHorizontal 
} from 'lucide-react-native';

import { theme } from '../../libs/ui/theme/theme';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { logoutUser } from '../../store/slices/authSlice';
import { DashboardStats, RecentBooking } from '../../libs/services/types/auth.types';
import dashboardService from '../../libs/services/dashboard/dashboardService';

const HomeScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // En desarrollo, usamos datos simulados
      // En producción, usar: dashboardService.getStats()
      const [statsData, bookingsData] = await Promise.all([
        dashboardService.simulateStats(),
        dashboardService.simulateRecentBookings(),
      ]);
      
      setStats(statsData);
      setRecentBookings(bookingsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'No se pudo cargar la información del dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => dispatch(logoutUser()) 
        },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return theme.colors.success[500];
      case 'pending': return theme.colors.warning[500];
      case 'cancelled': return theme.colors.error[500];
      default: return theme.colors.gray[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isLoading && !stats) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <LoadingText>Cargando dashboard...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Header>
          <HeaderContent>
            <WelcomeText>¡Hola, {user?.name}!</WelcomeText>
            <SubtitleText>Bienvenido a tu dashboard de ReservApp</SubtitleText>
          </HeaderContent>
          <LogoutButton onPress={handleLogout}>
            <LogoutText>Salir</LogoutText>
          </LogoutButton>
        </Header>

        {/* Stats Grid */}
        {stats && (
          <StatsContainer>
            <StatsGrid>
              <StatCard>
                <StatIcon>
                  <Calendar size={24} color={theme.colors.primary[500]} />
                </StatIcon>
                <StatContent>
                  <StatValue>{stats.totalReservations}</StatValue>
                  <StatLabel>Total Reservaciones</StatLabel>
                </StatContent>
              </StatCard>

              <StatCard>
                <StatIcon>
                  <Building2 size={24} color={theme.colors.secondary[500]} />
                </StatIcon>
                <StatContent>
                  <StatValue>{stats.totalVenues}</StatValue>
                  <StatLabel>Venues Activos</StatLabel>
                </StatContent>
              </StatCard>

              <StatCard>
                <StatIcon>
                  <DollarSign size={24} color={theme.colors.success[500]} />
                </StatIcon>
                <StatContent>
                  <StatValue>{formatCurrency(stats.totalRevenue)}</StatValue>
                  <StatLabel>Ingresos Totales</StatLabel>
                </StatContent>
              </StatCard>

              <StatCard>
                <StatIcon>
                  <Clock size={24} color={theme.colors.info[500]} />
                </StatIcon>
                <StatContent>
                  <StatValue>{stats.averageStay}h</StatValue>
                  <StatLabel>Estancia Promedio</StatLabel>
                </StatContent>
              </StatCard>
            </StatsGrid>
          </StatsContainer>
        )}

        {/* Content Layout */}
        <ContentLayout>
          {/* Reservaciones Recientes */}
          <RecentBookingsSection>
            <SectionHeader>
              <SectionTitle>Reservaciones Recientes</SectionTitle>
              <ViewAllButton>
                <ViewAllText>Ver todas</ViewAllText>
              </ViewAllButton>
            </SectionHeader>

            <BookingsList>
              {recentBookings.map((booking) => (
                <BookingCard key={booking.id}>
                  <BookingInfo>
                    <BookingHeader>
                      <BookingCustomer>{booking.customerName}</BookingCustomer>
                      <BookingStatus $color={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </BookingStatus>
                    </BookingHeader>
                    <BookingService>{booking.serviceName}</BookingService>
                    <BookingDetails>
                      <BookingDateTime>
                        {new Date(booking.date).toLocaleDateString('es-MX')} • {booking.time}
                      </BookingDateTime>
                      <BookingAmount>{formatCurrency(booking.amount)}</BookingAmount>
                    </BookingDetails>
                  </BookingInfo>
                  <BookingActions>
                    <MoreHorizontal size={20} color={theme.colors.gray[400]} />
                  </BookingActions>
                </BookingCard>
              ))}
            </BookingsList>
          </RecentBookingsSection>

          {/* Acciones Rápidas */}
          <QuickActionsSection>
            <SectionHeader>
              <SectionTitle>Acciones Rápidas</SectionTitle>
            </SectionHeader>

            <QuickActionsList>
              <QuickActionCard>
                <QuickActionIcon>
                  <Plus size={24} color={theme.colors.primary[500]} />
                </QuickActionIcon>
                <QuickActionContent>
                  <QuickActionTitle>Nueva Reserva</QuickActionTitle>
                  <QuickActionDescription>
                    Crear una nueva reservación
                  </QuickActionDescription>
                </QuickActionContent>
              </QuickActionCard>

              <QuickActionCard>
                <QuickActionIcon>
                  <Users size={24} color={theme.colors.secondary[500]} />
                </QuickActionIcon>
                <QuickActionContent>
                  <QuickActionTitle>Gestionar Usuarios</QuickActionTitle>
                  <QuickActionDescription>
                    Ver y editar usuarios
                  </QuickActionDescription>
                </QuickActionContent>
              </QuickActionCard>

              <QuickActionCard>
                <QuickActionIcon>
                  <TrendingUp size={24} color={theme.colors.success[500]} />
                </QuickActionIcon>
                <QuickActionContent>
                  <QuickActionTitle>Ver Reportes</QuickActionTitle>
                  <QuickActionDescription>
                    Análisis y estadísticas
                  </QuickActionDescription>
                </QuickActionContent>
              </QuickActionCard>
            </QuickActionsList>
          </QuickActionsSection>
        </ContentLayout>
      </ScrollView>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[50]};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray[50]};
`;

const LoadingText = styled.Text`
  margin-top: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const Header = styled.View`
  background-color: ${theme.colors.primary[500]};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const WelcomeText = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.xs}px;
`;

const SubtitleText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.white};
  opacity: 0.9;
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const LogoutButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md}px;
`;

const LogoutText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const StatsContainer = styled.View`
  margin: -${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.md}px;
`;

const StatCard = styled.View`
  flex: 1;
  min-width: 150px;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  flex-direction: row;
  align-items: center;
  ${theme.shadows.md}
`;

const StatIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.gray[50]};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

const StatContent = styled.View`
  flex: 1;
`;

const StatValue = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.xs}px;
`;

const StatLabel = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const ContentLayout = styled.View`
  padding: 0 ${theme.spacing.lg}px;
  gap: ${theme.spacing.xl}px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
`;

const ViewAllButton = styled.TouchableOpacity``;

const ViewAllText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.primary[600]};
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const RecentBookingsSection = styled.View``;

const BookingsList = styled.View`
  gap: ${theme.spacing.md}px;
`;

const BookingCard = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  flex-direction: row;
  align-items: center;
  ${theme.shadows.sm}
`;

const BookingInfo = styled.View`
  flex: 1;
`;

const BookingHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const BookingCustomer = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const BookingStatus = styled.Text<{ $color: string }>`
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$color}20;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
  overflow: hidden;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const BookingService = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const BookingDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BookingDateTime = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const BookingAmount = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  color: ${theme.colors.success[600]};
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const BookingActions = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

const QuickActionsSection = styled.View``;

const QuickActionsList = styled.View`
  gap: ${theme.spacing.md}px;
`;

const QuickActionCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  flex-direction: row;
  align-items: center;
  ${theme.shadows.sm}
`;

const QuickActionIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.gray[50]};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

const QuickActionContent = styled.View`
  flex: 1;
`;

const QuickActionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.xs}px;
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const QuickActionDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

export default HomeScreen;