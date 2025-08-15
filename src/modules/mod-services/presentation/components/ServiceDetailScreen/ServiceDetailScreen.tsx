import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Image as ImageIcon,
  MapPin,
  Star,
  Users,
} from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  fetchServiceDetails,
  setSelectedService,
} from '../../../../../libs/infrastructure/state/slices/servicesSlice';
import { getCategoryColor, getCategoryLabel } from '../../../../../libs/shared/utils/categoryUtils';
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
  PlaceholderContainer,
  PlaceholderText,
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

    navigation.navigate('ReservationFlow', {
      service: selectedService,
      serviceId: selectedService.id,
    });
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(numericPrice || 0);
  };

  const getServicePrice = (service: any) => {
    // Handle both basePrice (interface) and price (real API)
    return service.price || service.basePrice || 0;
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '1 día';

    // Convertir minutos a días (asumiendo 8 horas por día de servicio)
    const hoursPerDay = 8;
    const minutesPerDay = hoursPerDay * 60; // 480 minutos

    if (minutes < 60) {
      return `${minutes} minutos`;
    } else if (minutes < minutesPerDay) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours} horas`;
    } else {
      const days = Math.ceil(minutes / minutesPerDay);
      return `${days} ${days === 1 ? 'día' : 'días'}`;
    }
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
        <BookButton
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            })
          }
        >
          <BookButtonText>Ir a Inicio</BookButtonText>
        </BookButton>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft color='#000' size={24} />
        </BackButton>

        {selectedService.images && selectedService.images.length > 0 ? (
          <HeaderImage source={{ uri: selectedService.images[imageIndex] }} />
        ) : (
          <PlaceholderContainer>
            <ImageIcon color='#6c757d' size={48} />
            <PlaceholderText>Sin imagen disponible</PlaceholderText>
          </PlaceholderContainer>
        )}
      </HeaderContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoContainer>
          <ServiceHeader>
            <ServiceTitle>{selectedService.name}</ServiceTitle>
            {selectedService.rating && (
              <ServiceRating>
                <Star color='#FFD700' fill='#FFD700' size={20} />
                <Text style={{ color: '#FF8A00', fontSize: 14, fontWeight: '600', marginLeft: 4 }}>
                  {selectedService.rating.toFixed(1)}
                </Text>
              </ServiceRating>
            )}
          </ServiceHeader>

          <ServiceLocation>
            <MapPin color='#666' size={16} />
            <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>
              {selectedService.location?.address ||
                selectedService.location?.city ||
                'Ubicación no disponible'}
            </Text>
          </ServiceLocation>

          <ServiceCategory categoryColor={getCategoryColor(selectedService.category)}>
            {getCategoryLabel(selectedService.category)}
          </ServiceCategory>

          <ServiceDescription>{selectedService.description}</ServiceDescription>

          {/* Service Details */}
          <DetailsCard>
            <DetailsItem>
              <DetailsItemLabel>
                <Clock color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Duración</Text>
              </DetailsItemLabel>
              <DetailsItemValue>{formatDuration(selectedService.duration || 60)}</DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Users color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Capacidad</Text>
              </DetailsItemLabel>
              <DetailsItemValue>{selectedService.capacity || 1} personas</DetailsItemValue>
            </DetailsItem>

            <DetailsItem>
              <DetailsItemLabel>
                <Calendar color='#666' size={16} />
                <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>Disponibilidad</Text>
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
                {formatPrice(getServicePrice(selectedService))}
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
                {formatPrice(getServicePrice(selectedService) + (selectedService.taxes || 0))}
              </PriceText>
            </DetailsItem>
          </DetailsCard>
        </InfoContainer>
      </ScrollView>

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
