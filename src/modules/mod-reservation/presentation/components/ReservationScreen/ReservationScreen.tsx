import React, { useEffect, useState } from 'react';

import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Calendar, Clock, Eye, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { fetchMyReservations } from '../../../../../libs/infrastructure/state/slices/reservationsSlice';
import {
  getReservationStatusColor,
  getReservationStatusInSpanish,
} from '../../../../../libs/shared/utils/statusTranslations';
import { Reservation } from '../../../../../libs/shared/types';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  Container,
  ContentContainer,
  EmptyContainer,
  EmptyText,
  HeaderContainer,
  HeaderTitle,
  LoadingContainer,
  LoadingText,
  ReservationCard,
  ReservationDate,
  ReservationDateText,
  ReservationDetails,
  ReservationFooter,
  ReservationHeader,
  ReservationInfo,
  ReservationPrice,
  ReservationService,
  ReservationStatus,
  ReservationVenue,
  StatusBadge,
  ViewButton,
  ViewButtonText,
} from './ReservationScreen.styled';

export const ReservationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // Redux state
  const reservations = useAppSelector((state) => state.reservations.reservations);
  const isLoading = useAppSelector((state) => state.reservations.isLoading);
  const error = useAppSelector((state) => state.reservations.error);

  // Local state
  const [refreshing, setRefreshing] = useState(false);

  // Load reservations on mount
  useEffect(() => {
    loadReservations();
  }, [dispatch]);

  const loadReservations = async () => {
    try {
      await dispatch(fetchMyReservations({})).unwrap();
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReservations();
    setRefreshing(false);
  };

  const handleViewReservation = (reservation: Reservation) => {
    navigation.navigate('ReservationDetails', { reservationId: reservation.id });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString || 'Sin especificar';
  };

  const renderReservationCard = ({ item: reservation }: { item: any }) => {
    // Extract data using the actual API structure
    const venueName = reservation.venue?.name || 'Venue no especificado';
    const serviceName = reservation.service?.name || 'Servicio no especificado';
    const startDate = reservation.checkInDate || '';
    const startTime = ''; // No hay hora específica en esta estructura
    const totalGuests = reservation.guests || 0;
    const totalAmount = parseFloat(reservation.totalAmount) || 0;

    return (
      <ReservationCard>
        <ReservationHeader>
          <ReservationVenue numberOfLines={1}>{venueName}</ReservationVenue>
          <StatusBadge color={getReservationStatusColor(reservation.status)}>
            <ReservationStatus>
              {getReservationStatusInSpanish(reservation.status)}
            </ReservationStatus>
          </StatusBadge>
        </ReservationHeader>

        <ReservationDetails>
          <ReservationService numberOfLines={1}>{serviceName}</ReservationService>

          <ReservationInfo>
            {startDate && (
              <ReservationDate>
                <Calendar color='#666' size={16} />
                <ReservationDateText>{formatDate(startDate)}</ReservationDateText>
              </ReservationDate>
            )}

            {totalGuests > 0 && (
              <ReservationDate>
                <MapPin color='#666' size={16} />
                <ReservationDateText>{totalGuests} huésped(es)</ReservationDateText>
              </ReservationDate>
            )}
          </ReservationInfo>
        </ReservationDetails>

        <ReservationFooter>
          <ReservationPrice>
            {totalAmount > 0 ? formatPrice(totalAmount) : 'Precio pendiente'}
          </ReservationPrice>

          <ViewButton onPress={() => handleViewReservation(reservation)}>
            <Eye color='#FF8A00' size={16} />
            <ViewButtonText>Ver detalles</ViewButtonText>
          </ViewButton>
        </ReservationFooter>
      </ReservationCard>
    );
  };

  if (isLoading && !refreshing && reservations.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando reservaciones...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ContentContainer>
        {reservations.length === 0 && !isLoading ? (
          <EmptyContainer>
            <EmptyText>No tienes reservaciones aún</EmptyText>
            <EmptyText>¡Explora nuestros servicios y haz tu primera reserva!</EmptyText>
          </EmptyContainer>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={reservations}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                colors={['#FF8A00']}
                refreshing={refreshing}
                tintColor='#FF8A00'
                onRefresh={onRefresh}
              />
            }
            renderItem={renderReservationCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ContentContainer>
    </Container>
  );
};
