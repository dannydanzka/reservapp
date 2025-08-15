import React, { useEffect } from 'react';

import { ActivityIndicator, RefreshControl } from 'react-native';
import { Calendar, MapPin, Search, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { fetchDashboard } from '../../../../../libs/infrastructure/state/slices/dashboardSlice';
import {
  fetchFavoriteVenues,
  fetchPopularVenues,
} from '../../../../../libs/infrastructure/state/slices/venuesSlice';
import {
  fetchMyReservations,
  fetchUpcomingReservations,
} from '../../../../../libs/infrastructure/state/slices/reservationsSlice';
import { getReservationStatusInSpanish } from '../../../../../libs/shared/utils/statusTranslations';
import {
  selectDashboardFavoriteVenues,
  selectDashboardNextReservation,
  selectDashboardRecentReservations,
  selectDashboardTotalSpent,
  selectDashboardUnreadNotifications,
  selectFavoriteRecommendations,
  selectHasUserData,
  selectHomeError,
  selectHomeLoading,
  selectHomeStats,
  selectTopRecommendations,
  selectUserGreeting,
} from '../../selectors/homeSelectors';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  ActionCard,
  ActionIconContainer,
  ActionsGrid,
  ActionSubtitle,
  ActionTitle,
  Container,
  ContentContainer,
  ErrorContainer,
  ErrorText,
  LoadingContainer,
  LoadingText,
  QuickActionsSection,
  RatingText,
  RecommendationBadge,
  RecommendationBadgeText,
  RecommendationCard,
  RecommendationContent,
  RecommendationDescription,
  RecommendationFooter,
  RecommendationHeader,
  RecommendationImage,
  RecommendationPrice,
  RecommendationRating,
  RecommendationsSection,
  RecommendationTitle,
  RetryButton,
  RetryButtonText,
  SectionTitle,
  StatCard,
  StatLabel,
  StatNumber,
  StatsGrid,
  StatsSection,
  SubtitleText,
  WelcomeSection,
  WelcomeText,
} from './HomeScreen.styled';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // Using memoized selectors
  const userGreeting = useAppSelector(selectUserGreeting);
  const stats = useAppSelector(selectHomeStats);
  const isLoading = useAppSelector(selectHomeLoading);
  const hasError = useAppSelector(selectHomeError);

  // Dashboard data selectors
  const recentReservations = useAppSelector(selectDashboardRecentReservations);
  const favoriteVenues = useAppSelector(selectDashboardFavoriteVenues);
  const nextReservation = useAppSelector(selectDashboardNextReservation);
  const totalSpent = useAppSelector(selectDashboardTotalSpent);
  const unreadNotifications = useAppSelector(selectDashboardUnreadNotifications);

  const [refreshing, setRefreshing] = React.useState(false);

  // Load initial data
  useEffect(() => {
    loadHomeData();
  }, [dispatch]);

  const loadHomeData = async () => {
    try {
      // Dashboard has ALL the data we need
      await dispatch(fetchDashboard());
    } catch (error) {
      console.error('Error loading home data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'search':
        navigation.navigate('Discover');
        break;
      case 'reservations':
        navigation.navigate('Reservations');
        break;
      case 'venues':
        navigation.navigate('Discover');
        break;
      case 'favorites':
        navigation.navigate('Discover');
        break;
      default:
        break;
    }
  };

  const handleVenuePress = (venueId: string) => {
    navigation.navigate('VenueDetails', { venueId });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(price);
  };

  if (isLoading && !refreshing) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando datos...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container
      refreshControl={
        <RefreshControl
          colors={['#FF8A00']}
          refreshing={refreshing}
          tintColor='#FF8A00'
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <ContentContainer>
        {/* Welcome Section */}
        <WelcomeSection>
          <WelcomeText>{userGreeting}</WelcomeText>
          <SubtitleText>Descubre nuevos lugares y gestiona tus reservaciones</SubtitleText>
        </WelcomeSection>

        {/* Stats Section */}
        <StatsSection>
          <SectionTitle>Resumen</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total{'\n'}Reservaciones</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.upcoming}</StatNumber>
              <StatLabel>Próximas{'\n'}Reservaciones</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.completed}</StatNumber>
              <StatLabel>Reservaciones{'\n'}Completadas</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.favorites}</StatNumber>
              <StatLabel>Lugares{'\n'}Favoritos</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsSection>

        {/* Quick Actions Section */}
        <QuickActionsSection>
          <SectionTitle>Acciones Rápidas</SectionTitle>
          <ActionsGrid>
            <ActionCard onPress={() => handleQuickAction('search')}>
              <ActionIconContainer>
                <Search color='#ffffff' size={24} />
              </ActionIconContainer>
              <ActionTitle>Buscar Venues</ActionTitle>
              <ActionSubtitle>Encuentra lugares increíbles</ActionSubtitle>
            </ActionCard>

            <ActionCard onPress={() => handleQuickAction('reservations')}>
              <ActionIconContainer>
                <Calendar color='#ffffff' size={24} />
              </ActionIconContainer>
              <ActionTitle>Mis Reservaciones</ActionTitle>
              <ActionSubtitle>Ver y gestionar reservas</ActionSubtitle>
            </ActionCard>

            <ActionCard onPress={() => handleQuickAction('venues')}>
              <ActionIconContainer>
                <MapPin color='#ffffff' size={24} />
              </ActionIconContainer>
              <ActionTitle>Explorar</ActionTitle>
              <ActionSubtitle>Descubre nuevos lugares</ActionSubtitle>
            </ActionCard>

            <ActionCard onPress={() => handleQuickAction('favorites')}>
              <ActionIconContainer>
                <Star color='#ffffff' size={24} />
              </ActionIconContainer>
              <ActionTitle>Favoritos</ActionTitle>
              <ActionSubtitle>Tus lugares preferidos</ActionSubtitle>
            </ActionCard>
          </ActionsGrid>
        </QuickActionsSection>

        {/* Total Spent Section */}
        <StatsSection>
          <SectionTitle>Gastos Totales</SectionTitle>
          <StatCard style={{ alignSelf: 'stretch', marginBottom: 8 }}>
            <StatNumber style={{ fontSize: 32 }}>{totalSpent}</StatNumber>
            <StatLabel>Monto total gastado en reservaciones</StatLabel>
          </StatCard>
          {unreadNotifications > 0 && (
            <StatCard style={{ alignSelf: 'stretch', backgroundColor: '#FF8A00' }}>
              <StatNumber style={{ color: 'white' }}>{unreadNotifications}</StatNumber>
              <StatLabel style={{ color: 'white' }}>Notificaciones{'\n'}no leídas</StatLabel>
            </StatCard>
          )}
        </StatsSection>

        {/* Next Reservation */}
        {nextReservation && (
          <RecommendationsSection>
            <SectionTitle>Próxima Reservación</SectionTitle>
            <RecommendationCard
              onPress={() =>
                navigation.navigate('ReservationDetails', { reservationId: nextReservation.id })
              }
            >
              <RecommendationContent>
                <RecommendationHeader>
                  <RecommendationTitle>
                    {nextReservation.venueName || 'Reservación'}
                  </RecommendationTitle>
                  <RecommendationBadge>
                    <RecommendationBadgeText>
                      {getReservationStatusInSpanish(nextReservation.status || 'CONFIRMED')}
                    </RecommendationBadgeText>
                  </RecommendationBadge>
                </RecommendationHeader>
                <RecommendationDescription>
                  {nextReservation.serviceName || 'Servicio reservado'}
                </RecommendationDescription>
                <RecommendationFooter>
                  <RecommendationPrice>
                    {nextReservation.totalAmount
                      ? formatPrice(nextReservation.totalAmount)
                      : 'Precio por confirmar'}
                  </RecommendationPrice>
                </RecommendationFooter>
              </RecommendationContent>
            </RecommendationCard>
          </RecommendationsSection>
        )}

        {/* Recent Reservations */}
        {recentReservations.length > 0 && (
          <RecommendationsSection>
            <SectionTitle>Reservaciones Recientes</SectionTitle>
            {recentReservations.slice(0, 3).map((reservation: any, index: number) => (
              <RecommendationCard
                key={reservation.id || index}
                onPress={() =>
                  navigation.navigate('ReservationDetails', { reservationId: reservation.id })
                }
              >
                <RecommendationContent>
                  <RecommendationHeader>
                    <RecommendationTitle>
                      {reservation.venueName || 'Reservación'}
                    </RecommendationTitle>
                    <RecommendationBadge>
                      <RecommendationBadgeText>
                        {getReservationStatusInSpanish(reservation.status || 'COMPLETED')}
                      </RecommendationBadgeText>
                    </RecommendationBadge>
                  </RecommendationHeader>
                  <RecommendationDescription>
                    {reservation.serviceName || 'Servicio completado'}
                  </RecommendationDescription>
                  <RecommendationFooter>
                    <RecommendationPrice>
                      {reservation.totalAmount
                        ? formatPrice(reservation.totalAmount)
                        : 'Precio confirmado'}
                    </RecommendationPrice>
                  </RecommendationFooter>
                </RecommendationContent>
              </RecommendationCard>
            ))}
          </RecommendationsSection>
        )}

        {/* Favorite Venues */}
        {favoriteVenues.length > 0 && (
          <RecommendationsSection>
            <SectionTitle>Lugares Favoritos</SectionTitle>
            {favoriteVenues.slice(0, 3).map((venue: any, index: number) => (
              <RecommendationCard
                key={venue.id || index}
                onPress={() => handleVenuePress(venue.id)}
              >
                {venue.images && venue.images.length > 0 && (
                  <RecommendationImage source={{ uri: venue.images[0] }} />
                )}
                <RecommendationContent>
                  <RecommendationHeader>
                    <RecommendationTitle>{venue.name || 'Venue Favorito'}</RecommendationTitle>
                    {venue.rating && (
                      <RecommendationRating>
                        <Star color='#FFD700' fill='#FFD700' size={16} />
                        <RatingText>{venue.rating}</RatingText>
                      </RecommendationRating>
                    )}
                  </RecommendationHeader>
                  <RecommendationDescription>
                    {venue.description || venue.address || 'Lugar favorito'}
                  </RecommendationDescription>
                  <RecommendationFooter>
                    <RecommendationPrice>{venue.category || 'Categoría'}</RecommendationPrice>
                  </RecommendationFooter>
                </RecommendationContent>
              </RecommendationCard>
            ))}
          </RecommendationsSection>
        )}

        {/* Error Display */}
        {hasError && (
          <ErrorContainer>
            <ErrorText>{hasError}</ErrorText>
            <RetryButton onPress={loadHomeData}>
              <RetryButtonText>Reintentar</RetryButtonText>
            </RetryButton>
          </ErrorContainer>
        )}
      </ContentContainer>
    </Container>
  );
};
