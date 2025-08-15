import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { ArrowLeft, Calendar, Clock, ImageIcon, MapPin, Star, Users } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  fetchReservationDetails,
  setSelectedReservation,
} from '../../../../../libs/infrastructure/state/slices/reservationsSlice';
import { getReservationStatusInSpanish } from '../../../../../libs/shared/utils/statusTranslations';
import { Reservation } from '../../../../../libs/shared/types';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  BackButton,
  BookButton,
  BookButtonText,
  Container,
  DetailsCard,
  DetailsItem,
  DetailsItemLabel,
  DetailsItemValue,
  FooterContainer,
  HeaderContainer,
  HeaderImage,
  HeaderImagePlaceholder,
  InfoContainer,
  LoadingContainer,
  LoadingText,
  PriceText,
  ServiceCategory,
  ServiceDescription,
  ServiceFeature,
  ServiceFeatures,
  ServiceHeader,
  ServiceLocation,
  ServiceRating,
  ServiceTitle,
} from './ReservationDetailScreen.styled';

interface RouteParams {
  reservationId: string;
}

export const ReservationDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { reservationId } = route.params as RouteParams;

  // Redux state
  const selectedReservation = useAppSelector((state) => state.reservations.selectedReservation);
  const isLoading = useAppSelector((state) => state.reservations.isLoading);
  const error = useAppSelector((state) => state.reservations.error);

  // Local state
  const [imageIndex, setImageIndex] = useState(0);

  // Load reservation details
  useEffect(() => {
    if (reservationId) {
      dispatch(fetchReservationDetails(reservationId));
    }

    return () => {
      // Clear selected reservation when leaving
      dispatch(setSelectedReservation(null));
    };
  }, [reservationId, dispatch]);

  const handleCancelReservation = () => {
    if (!selectedReservation) return;

    Alert.alert('Cancelar Reservación', '¿Estás seguro de que quieres cancelar esta reservación?', [
      { style: 'cancel', text: 'No' },
      {
        onPress: () => {
          // Aquí iría la lógica de cancelación
          console.log('Cancelar reservación:', selectedReservation.id);
        },
        style: 'destructive',
        text: 'Sí, cancelar',
      },
    ]);
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(numericPrice || 0);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      ACCOMMODATION: 'Alojamiento',
      DINING: 'Gastronomía',
      ENTERTAINMENT: 'Entretenimiento',
      EVENT_MEETING: 'Eventos',
      SPA_WELLNESS: 'Spa y Bienestar',
      TOUR_EXPERIENCE: 'Tours y Experiencias',
      TRANSPORTATION: 'Transporte',
    };
    return categories[category] || category;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (minutes < 1440) {
      // Menos de 24 horas
      if (remainingMinutes === 0) {
        return hours === 1 ? '1 hora' : `${hours} horas`;
      }
      return `${hours}h ${remainingMinutes}min`;
    }

    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    const finalMinutes = minutes % 60;

    if (remainingHours === 0 && finalMinutes === 0) {
      return days === 1 ? '1 día' : `${days} días`;
    }

    let result = days === 1 ? '1 día' : `${days} días`;
    if (remainingHours > 0) {
      result += `, ${remainingHours}h`;
    }
    if (finalMinutes > 0) {
      result += `, ${finalMinutes}min`;
    }

    return result;
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando detalles de la reservación...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !selectedReservation) {
    return (
      <LoadingContainer>
        <LoadingText>Error al cargar la reservación</LoadingText>
      </LoadingContainer>
    );
  }

  const reservation = selectedReservation;
  const service = reservation.service;
  const venue = reservation.venue;

  return (
    <Container>
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft color='#000' size={24} />
        </BackButton>

        <HeaderImagePlaceholder>
          <ImageIcon color='#999' size={48} />
        </HeaderImagePlaceholder>
      </HeaderContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoContainer>
          <ServiceHeader>
            <ServiceTitle>
              Reservación #{reservation.confirmationId?.slice(-8) || reservation.id.slice(-8)}
            </ServiceTitle>
          </ServiceHeader>

          <ServiceLocation>
            <MapPin color='#666' size={16} />
            <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>
              {venue?.name || 'Venue no disponible'}
            </Text>
          </ServiceLocation>

          <ServiceCategory>{service?.name || 'Servicio no disponible'}</ServiceCategory>

          {reservation.notes && <ServiceDescription>{reservation.notes}</ServiceDescription>}

          {/* Service Details */}
          <DetailsCard>
            <DetailsItem>
              <DetailsItemLabel>
                <Clock color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Fecha Check-in</Text>
              </DetailsItemLabel>
              <DetailsItemValue>
                {reservation.checkInDate
                  ? new Date(reservation.checkInDate).toLocaleDateString('es-MX')
                  : 'No especificada'}
              </DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Users color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Huéspedes</Text>
              </DetailsItemLabel>
              <DetailsItemValue>{reservation.guests || 0} personas</DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Calendar color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Estado</Text>
              </DetailsItemLabel>
              <DetailsItemValue>
                {getReservationStatusInSpanish(reservation.status)}
              </DetailsItemValue>
            </DetailsItem>
          </DetailsCard>

          {/* Price Information */}
          <DetailsCard>
            <DetailsItem>
              <DetailsItemLabel>
                <Text style={{ color: '#666', fontSize: 14 }}>Total Pagado</Text>
              </DetailsItemLabel>
              <PriceText>
                {formatPrice(parseFloat(reservation.totalAmount) || 0)}{' '}
                {reservation.currency || 'MXN'}
              </PriceText>
            </DetailsItem>
          </DetailsCard>
        </InfoContainer>
      </ScrollView>

      <FooterContainer>
        <BookButton onPress={handleCancelReservation}>
          <BookButtonText>Cancelar Reservación</BookButtonText>
        </BookButton>
      </FooterContainer>
    </Container>
  );
};
