import React, { useCallback, useEffect, useState } from 'react';

import { Alert, FlatList, ScrollView } from 'react-native';
import { ArrowLeft, Calendar, Clock, DollarSign, Users } from 'lucide-react-native';
import styled from 'styled-components/native';

import { Badge } from '@components/Badge';
import { Button } from '@components/Form/Button';
import { fetchServices } from '@store/slices/servicesSlice';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { ScreenLayout } from '@layouts';
import type { Service, ServiceCategory } from '@types';
import { theme } from '@presentation/styles/theme';
import { updateBookingService } from '@store/slices/bookingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useI18n } from '@hooks/useI18n';

interface ServiceSelectionScreenProps {
  navigation: any;
  route: {
    params: {
      venueId: string;
      venueName: string;
    };
  };
}

const ServiceSelectionScreen: React.FC<ServiceSelectionScreenProps> = ({ navigation, route }) => {
  const { venueId, venueName } = route.params;
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const { error, loading, services } = useAppSelector((state) => state.services);

  const { selectedService } = useAppSelector((state) => state.booking);

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  // Load services for venue
  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await dispatch(
          fetchServices({
            isActive: true,
            venueId,
          })
        ).unwrap();

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(result.map((service) => service.category)));
        setCategories(uniqueCategories);
      } catch (err) {
        Alert.alert(t('error.title'), t('services.errors.loadFailed'));
      }
    };

    loadServices();
  }, [dispatch, venueId, t]);

  // Filter services by category
  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleServiceSelect = useCallback(
    (service: Service) => {
      dispatch(updateBookingService(service));
      navigation.navigate('DateTimeSelection', {
        serviceId: service.id,
        serviceName: service.name,
        venueId,
        venueName,
      });
    },
    [dispatch, navigation, venueId, venueName]
  );

  const handleCategorySelect = useCallback((category: ServiceCategory | 'all') => {
    setSelectedCategory(category);
  }, []);

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(price);
  };

  const renderCategory = useCallback(
    ({ item = 'all' }: { item: ServiceCategory | 'all' }) => (
      <CategoryButton active={selectedCategory === item} onPress={() => handleCategorySelect(item)}>
        <CategoryButtonText active={selectedCategory === item}>
          {item === 'all' ? t('common.all') : t(`services.categories.${item}`)}
        </CategoryButtonText>
      </CategoryButton>
    ),
    [selectedCategory, handleCategorySelect, t]
  );

  const renderService = useCallback(
    ({ item = null }: { item: Service }) => (
      <ServiceCard onPress={() => handleServiceSelect(item)}>
        <ServiceImageContainer>
          {item.images && item.images.length > 0 ? (
            <ServiceImage source={{ uri: item.images[0] }} />
          ) : (
            <ServiceImagePlaceholder>
              <Calendar color={theme.colors.gray[400]} size={32} />
            </ServiceImagePlaceholder>
          )}

          {item.isPopular && (
            <PopularBadge>
              <Badge size='small' text={t('services.popular')} variant='success' />
            </PopularBadge>
          )}
        </ServiceImageContainer>

        <ServiceContent>
          <ServiceHeader>
            <ServiceName>{item.name}</ServiceName>
            <ServicePrice>{formatPrice(item.basePrice)}</ServicePrice>
          </ServiceHeader>

          {item.description && (
            <ServiceDescription numberOfLines={2}>{item.description}</ServiceDescription>
          )}

          <ServiceDetails>
            <ServiceDetailItem>
              <Clock color={theme.colors.gray[500]} size={14} />
              <ServiceDetailText>{formatDuration(item.duration)}</ServiceDetailText>
            </ServiceDetailItem>

            {item.maxCapacity && (
              <ServiceDetailItem>
                <Users color={theme.colors.gray[500]} size={14} />
                <ServiceDetailText>
                  {t('services.maxCapacity', { count: item.maxCapacity })}
                </ServiceDetailText>
              </ServiceDetailItem>
            )}

            <ServiceDetailItem>
              <DollarSign color={theme.colors.gray[500]} size={14} />
              <ServiceDetailText>
                {item.priceType === 'PER_PERSON'
                  ? t('services.pricePerPerson')
                  : t('services.priceFixed')}
              </ServiceDetailText>
            </ServiceDetailItem>
          </ServiceDetails>

          {item.features && item.features.length > 0 && (
            <ServiceFeatures>
              {item.features.slice(0, 3).map((feature, index) => (
                <FeatureBadge key={index}>
                  <FeatureBadgeText>{feature}</FeatureBadgeText>
                </FeatureBadge>
              ))}
              {item.features.length > 3 && (
                <FeatureBadge>
                  <FeatureBadgeText>+{item.features.length - 3}</FeatureBadgeText>
                </FeatureBadge>
              )}
            </ServiceFeatures>
          )}
        </ServiceContent>
      </ServiceCard>
    ),
    [handleServiceSelect, formatPrice, formatDuration, t]
  );

  if (loading && services.length === 0) {
    return (
      <ScreenLayout>
        <LoadingSpinner />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Header>
        <HeaderLeft>
          <BackButton onPress={() => navigation.goBack()}>
            <ArrowLeft color={theme.colors.primary[500]} size={24} />
          </BackButton>
        </HeaderLeft>

        <HeaderCenter>
          <HeaderTitle>{t('services.selectService')}</HeaderTitle>
          <HeaderSubtitle>{venueName}</HeaderSubtitle>
        </HeaderCenter>

        <HeaderRight />
      </Header>

      {categories.length > 1 && (
        <CategoriesContainer>
          <CategoriesTitle>{t('services.categories.title')}</CategoriesTitle>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            data={['all', ...categories]}
            horizontal
            keyExtractor={(item) => item}
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
          />
        </CategoriesContainer>
      )}

      {filteredServices.length > 0 ? (
        <ServicesContainer>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 20,
              paddingHorizontal: 16,
            }}
            data={filteredServices}
            keyExtractor={(item) => item.id}
            renderItem={renderService}
            showsVerticalScrollIndicator={false}
          />
        </ServicesContainer>
      ) : (
        <EmptyContainer>
          <EmptyIcon>
            <Calendar color={theme.colors.gray[300]} size={64} />
          </EmptyIcon>
          <EmptyTitle>{t('services.empty.title')}</EmptyTitle>
          <EmptyMessage>{t('services.empty.message')}</EmptyMessage>
        </EmptyContainer>
      )}
    </ScreenLayout>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const HeaderLeft = styled.View`
  width: 44px;
`;

const HeaderCenter = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderRight = styled.View`
  width: 44px;
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const HeaderSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-top: 2px;
  text-align: center;
`;

const CategoriesContainer = styled.View`
  background-color: ${theme.colors.white};
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const CategoriesTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 12px;
  padding-horizontal: 16px;
`;

const CategoryButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  background-color: ${({ active }) =>
    active ? theme.colors.primary[500] : theme.colors.gray[100]};
`;

const CategoryButtonText = styled.Text<{ active: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${({ active }) => (active ? theme.colors.white : theme.colors.text.secondary)};
`;

const ServicesContainer = styled.View`
  flex: 1;
`;

const ServiceCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  ${theme.shadows.sm}
`;

const ServiceImageContainer = styled.View`
  height: 120px;
  position: relative;
`;

const ServiceImage = styled.Image`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gray[100]};
`;

const ServiceImagePlaceholder = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
`;

const PopularBadge = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ServiceContent = styled.View`
  padding: 16px;
`;

const ServiceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ServiceName = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: 8px;
`;

const ServicePrice = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 700;
  color: ${theme.colors.primary[500]};
`;

const ServiceDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: 12px;
`;

const ServiceDetails = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`;

const ServiceDetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ServiceDetailText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
`;

const ServiceFeatures = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

const FeatureBadge = styled.View`
  background-color: ${theme.colors.primary[25]};
  padding: 4px 8px;
  border-radius: 12px;
`;

const FeatureBadgeText = styled.Text`
  font-size: 11px;
  color: ${theme.colors.primary[500]};
  font-weight: 500;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.View`
  margin-bottom: 16px;
`;

const EmptyTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
  text-align: center;
`;

const EmptyMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
`;

export default ServiceSelectionScreen;
