import React, { useEffect, useState } from 'react';

import { ActivityIndicator, FlatList, RefreshControl, Text } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { fetchServices } from '../../../../../libs/infrastructure/state/slices/servicesSlice';
import { getCategoryColor, getCategoryLabel } from '../../../../../libs/shared/utils/categoryUtils';
import { Service } from '../../../../../libs/shared/types';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  Container,
  ContentContainer,
  LoadingContainer,
  LoadingText,
  NoResultsContainer,
  NoResultsText,
  ServiceCard,
  ServiceCategory,
  ServiceDescription,
  ServiceFooter,
  ServiceHeader,
  ServiceImage,
  ServiceInfo,
  ServiceLocation,
  ServicePrice,
  ServiceRating,
  ServiceTitle,
} from './ServiceScreen.styled';

export const ServiceScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // Redux state
  const services = useAppSelector((state) => state.services.services);
  const isLoading = useAppSelector((state) => state.services.isLoading);
  const error = useAppSelector((state) => state.services.error);
  const pagination = useAppSelector((state) => state.services.pagination);

  // Debug logging removido para producción

  // Local state
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load initial data
  useEffect(() => {
    loadServices();
  }, [dispatch]);

  const loadServices = async () => {
    try {
      await dispatch(
        fetchServices({
          pagination: { limit: 10, page: 1 },
        })
      ).unwrap();
    } catch (error) {
      console.error('❌ ServiceScreen: Error loading services:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadServices();
    setRefreshing(false);
  };

  const loadMoreServices = async () => {
    if (loadingMore || !pagination.hasMore) {
      return;
    }

    setLoadingMore(true);

    try {
      await dispatch(
        fetchServices({
          pagination: {
            limit: 10,
            page: pagination.page + 1,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error('❌ Error loading more services:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='small' />
        <LoadingText>Cargando más servicios...</LoadingText>
      </LoadingContainer>
    );
  };

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServiceDetail', { serviceId: service.id });
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(numericPrice || 0);
  };

  const renderServiceCard = ({ item: service }: { item: Service }) => (
    <ServiceCard onPress={() => handleServicePress(service)}>
      {service.images && service.images.length > 0 && (
        <ServiceImage source={{ uri: service.images[0] }} />
      )}
      <ServiceInfo>
        <ServiceHeader>
          <ServiceTitle numberOfLines={2}>{service.name}</ServiceTitle>
          {service.rating && (
            <ServiceRating>
              <Star color='#FFD700' fill='#FFD700' size={16} />
              <Text style={{ color: '#FF8A00', fontSize: 12, fontWeight: '600', marginLeft: 4 }}>
                {service.rating.toFixed(1)}
              </Text>
            </ServiceRating>
          )}
        </ServiceHeader>

        <ServiceDescription numberOfLines={2}>{service.description}</ServiceDescription>

        <ServiceFooter>
          <ServiceLocation>
            <MapPin color='#666' size={14} />
            <Text style={{ color: '#666', fontSize: 12, marginLeft: 4 }}>
              {service.venue?.name || service.location?.city || 'Ubicación no disponible'}
            </Text>
          </ServiceLocation>

          <ServiceCategory categoryColor={getCategoryColor(service.category)}>
            {getCategoryLabel(service.category)}
          </ServiceCategory>

          <ServicePrice>
            {/* Handle both basePrice (current interface) and price (real API) */}
            {formatPrice((service as any).price || service.basePrice)}
            {service.priceType === 'PER_PERSON' && '/persona'}
          </ServicePrice>
        </ServiceFooter>
      </ServiceInfo>
    </ServiceCard>
  );

  if (isLoading && !refreshing && services.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando servicios...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* Header simplificado - sin búsqueda ni filtros */}

      <ContentContainer>
        {services.length === 0 && !isLoading ? (
          <NoResultsContainer>
            <NoResultsText>No hay servicios disponibles</NoResultsText>
          </NoResultsContainer>
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                colors={['#FF8A00']}
                refreshing={refreshing}
                tintColor='#FF8A00'
                onRefresh={onRefresh}
              />
            }
            renderItem={renderServiceCard}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreServices}
            onEndReachedThreshold={0.5}
          />
        )}
      </ContentContainer>
    </Container>
  );
};
