import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  fetchServiceDetails,
  setSelectedService,
} from '../../../../../libs/infrastructure/state/slices/servicesSlice';
import { Service } from '../../../../../libs/shared/types';
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
} from './ServiceDetailScreen.styled';

interface RouteParams {
  serviceId: string;
}

export const ServiceDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { serviceId } = route.params as RouteParams;

  // Redux state
  const selectedService = useAppSelector((state) => state.services.selectedService);
  const isLoading = useAppSelector((state) => state.services.isLoadingDetails);
  const error = useAppSelector((state) => state.services.error);

  // Local state
  const [imageIndex, setImageIndex] = useState(0);

  // Load service details
  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceDetails(serviceId));
    }

    return () => {
      // Clear selected service when leaving
      dispatch(setSelectedService(null));
    };
  }, [serviceId, dispatch]);

  const handleBookService = () => {
    if (!selectedService) return;

    navigation.navigate('BookingFlow', {
      service: selectedService,
      serviceId: selectedService.id,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(price);
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

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando detalles del servicio...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !selectedService) {
    return (
      <LoadingContainer>
        <LoadingText>Error al cargar el servicio</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft color='#000' size={24} />
        </BackButton>

        {selectedService.images && selectedService.images.length > 0 && (
          <HeaderImage source={{ uri: selectedService.images[imageIndex] }} />
        )}
      </HeaderContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoContainer>
          <ServiceHeader>
            <ServiceTitle>{selectedService.name}</ServiceTitle>
            {selectedService.rating && (
              <ServiceRating>
                <Star color='#FFD700' fill='#FFD700' size={20} />
                <ServiceRating>{selectedService.rating.toFixed(1)}</ServiceRating>
              </ServiceRating>
            )}
          </ServiceHeader>

          <ServiceLocation>
            <MapPin color='#666' size={16} />
            <ServiceLocation>
              {selectedService.location?.address ||
                selectedService.location?.city ||
                'Ubicación no disponible'}
            </ServiceLocation>
          </ServiceLocation>

          <ServiceCategory>{getCategoryLabel(selectedService.category)}</ServiceCategory>

          <ServiceDescription>{selectedService.description}</ServiceDescription>

          {/* Service Details */}
          <DetailsCard>
            <DetailsItem>
              <DetailsItemLabel>
                <Clock color='#666' size={16} />
                <DetailsItemLabel>Duración</DetailsItemLabel>
              </DetailsItemLabel>
              <DetailsItemValue>{selectedService.duration || 60} minutos</DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Users color='#666' size={16} />
                <DetailsItemLabel>Capacidad</DetailsItemLabel>
              </DetailsItemLabel>
              <DetailsItemValue>{selectedService.capacity || 1} personas</DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Calendar color='#666' size={16} />
                <DetailsItemLabel>Disponibilidad</DetailsItemLabel>
              </DetailsItemLabel>
              <DetailsItemValue>
                {selectedService.isActive ? 'Disponible' : 'No disponible'}
              </DetailsItemValue>
            </DetailsItem>
          </DetailsCard>

          {/* Service Features */}
          {selectedService.features && selectedService.features.length > 0 && (
            <ServiceFeatures>
              {selectedService.features.map((feature: string, index: number) => (
                <ServiceFeature key={index}>{feature}</ServiceFeature>
              ))}
            </ServiceFeatures>
          )}

          {/* Price Information */}
          <DetailsCard>
            <DetailsItem>
              <DetailsItemLabel>Precio base</DetailsItemLabel>
              <DetailsItemValue>
                {formatPrice(selectedService.basePrice)}
                {selectedService.priceType === 'PER_PERSON' && ' por persona'}
              </DetailsItemValue>
            </DetailsItem>

            {selectedService.taxes && (
              <DetailsItem>
                <DetailsItemLabel>Impuestos</DetailsItemLabel>
                <DetailsItemValue>{formatPrice(selectedService.taxes)}</DetailsItemValue>
              </DetailsItem>
            )}

            <DetailsItem>
              <DetailsItemLabel>Total estimado</DetailsItemLabel>
              <PriceText>
                {formatPrice(selectedService.basePrice + (selectedService.taxes || 0))}
              </PriceText>
            </DetailsItem>
          </DetailsCard>
        </InfoContainer>
      </ScrollView>

      {/* Footer with booking button */}
      <FooterContainer>
        <BookButton disabled={!selectedService.isActive} onPress={handleBookService}>
          <BookButtonText>
            {selectedService.isActive ? 'Reservar Ahora' : 'No Disponible'}
          </BookButtonText>
        </BookButton>
      </FooterContainer>
    </Container>
  );
};
