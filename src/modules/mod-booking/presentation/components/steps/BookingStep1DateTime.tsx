import React, { useEffect, useState } from 'react';

import { Alert, ScrollView } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import styled from 'styled-components/native';

import { LoadingState, useLoadingState, useNotifications, withErrorHandling } from '@components';
import { Service, Venue } from '@types';
import { theme } from '@styles/theme';
import { useI18n } from '@hooks/useI18n';
import venuesService from '@libs/services/venues/venuesService';

interface BookingStep1DateTimeProps {
  venue: Venue;
  service?: Service;
  selectedDate?: Date;
  selectedTime?: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const BookingStep1DateTime: React.FC<BookingStep1DateTimeProps> = ({
  onDateSelect = () => {},
  onTimeSelect = () => {},
  selectedDate = null,
  selectedTime = null,
  service = null,
  venue = null,
}) => {
  const { t } = useI18n();
  const { showError } = useNotifications();

  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const datesLoadingState = useLoadingState('loading');
  const timesLoadingState = useLoadingState('idle');

  // Cargar fechas disponibles
  const loadAvailableDates = withErrorHandling(
    async () => {
      datesLoadingState.startLoading();

      try {
        // Generar fechas disponibles para los próximos 30 días
        const dates: Date[] = [];
        const today = new Date();

        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          // Evitar días pasados
          if (date >= today) {
            dates.push(date);
          }
        }

        setAvailableDates(dates);
        datesLoadingState.setSuccess();

        setTimeout(() => datesLoadingState.stopLoading(), 500);
      } catch (error) {
        datesLoadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al cargar fechas disponibles',
      showAlert: false,
    }
  );

  // Cargar horarios disponibles para una fecha
  const loadAvailableTimes = withErrorHandling(
    async (date: Date) => {
      if (!date) return;

      timesLoadingState.startLoading();

      try {
        // En una app real, esto vendría de la API del venue
        const times: string[] = [];
        const startHour = 9; // 9 AM
        const endHour = 22; // 10 PM

        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute
              .toString()
              .padStart(2, '0')}`;
            times.push(timeString);
          }
        }

        // Filtrar horarios pasados si es hoy
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        const filteredTimes = isToday
          ? times.filter((time) => {
              const [hour, minute] = time.split(':').map(Number);
              const timeDate = new Date();
              timeDate.setHours(hour, minute, 0, 0);
              return timeDate > new Date();
            })
          : times;

        setAvailableTimes(filteredTimes);
        timesLoadingState.setSuccess();

        setTimeout(() => timesLoadingState.stopLoading(), 300);
      } catch (error) {
        timesLoadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al cargar horarios disponibles',
      showAlert: false,
    }
  );

  // Efecto para cargar fechas al montar
  useEffect(() => {
    loadAvailableDates();
  }, []);

  // Efecto para cargar horarios cuando cambia la fecha
  useEffect(() => {
    if (selectedDate) {
      loadAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    // Limpiar hora seleccionada cuando cambia la fecha
    if (selectedTime) {
      onTimeSelect('');
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  const formatDate = (date: Date): string => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Venue Info */}
        <VenueInfo>
          <VenueHeader>
            <VenueName>{venue.name}</VenueName>
            {service && <ServiceName>{service.name}</ServiceName>}
          </VenueHeader>

          <VenueLocation>
            <MapPin color={theme.colors.gray[500]} size={14} />
            <VenueLocationText>{venue.location}</VenueLocationText>
          </VenueLocation>

          {service && (
            <ServiceDetails>
              <ServicePrice>
                ${service.price?.toFixed(2)} MXN
                {service.pricingType === 'per_person' && ' por persona'}
              </ServicePrice>
              {service.duration && (
                <ServiceDuration>
                  <Clock color={theme.colors.gray[500]} size={14} />
                  <ServiceDurationText>{service.duration} min</ServiceDurationText>
                </ServiceDuration>
              )}
            </ServiceDetails>
          )}
        </VenueInfo>

        {/* Date Selection */}
        <Section>
          <SectionHeader>
            <Calendar color={theme.colors.primary[500]} size={20} />
            <SectionTitle>Selecciona una fecha</SectionTitle>
          </SectionHeader>

          {datesLoadingState.isLoading ? (
            <LoadingContainer>
              <LoadingState message='Cargando fechas...' size='small' state='loading' />
            </LoadingContainer>
          ) : (
            <DatesContainer>
              <DatesList>
                {availableDates.map((date, index) => (
                  <DateItem
                    key={index}
                    selected={isDateSelected(date)}
                    onPress={() => handleDateSelect(date)}
                  >
                    <DateText selected={isDateSelected(date)}>{formatDate(date)}</DateText>
                  </DateItem>
                ))}
              </DatesList>
            </DatesContainer>
          )}
        </Section>

        {/* Time Selection */}
        {selectedDate && (
          <Section>
            <SectionHeader>
              <Clock color={theme.colors.primary[500]} size={20} />
              <SectionTitle>Selecciona una hora</SectionTitle>
            </SectionHeader>

            {timesLoadingState.isLoading ? (
              <LoadingContainer>
                <LoadingState message='Cargando horarios...' size='small' state='loading' />
              </LoadingContainer>
            ) : availableTimes.length > 0 ? (
              <TimesContainer>
                <TimesList>
                  {availableTimes.map((time, index) => (
                    <TimeItem
                      key={index}
                      selected={selectedTime === time}
                      onPress={() => handleTimeSelect(time)}
                    >
                      <TimeText selected={selectedTime === time}>{time}</TimeText>
                    </TimeItem>
                  ))}
                </TimesList>
              </TimesContainer>
            ) : (
              <EmptyContainer>
                <EmptyText>No hay horarios disponibles para esta fecha</EmptyText>
              </EmptyContainer>
            )}
          </Section>
        )}

        {/* Selected Summary */}
        {selectedDate && selectedTime && (
          <SelectedSummary>
            <SummaryTitle>Reserva seleccionada</SummaryTitle>
            <SummaryDetails>
              <SummaryItem>
                <Calendar color={theme.colors.success[500]} size={16} />
                <SummaryText>
                  {selectedDate.toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                    weekday: 'long',
                    year: 'numeric',
                  })}
                </SummaryText>
              </SummaryItem>

              <SummaryItem>
                <Clock color={theme.colors.success[500]} size={16} />
                <SummaryText>{selectedTime}</SummaryText>
              </SummaryItem>
            </SummaryDetails>
          </SelectedSummary>
        )}
      </ScrollView>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[25]};
`;

const VenueInfo = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.sm}
`;

const VenueHeader = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

const VenueName = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ServiceName = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.primary[600]};
  font-weight: 500;
`;

const VenueLocation = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const VenueLocationText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.xs}px;
`;

const ServiceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ServicePrice = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.success[600]};
`;

const ServiceDuration = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ServiceDurationText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.xs}px;
`;

const Section = styled.View`
  background-color: ${theme.colors.white};
  margin: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.sm}
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-left: ${theme.spacing.sm}px;
`;

const LoadingContainer = styled.View`
  padding: ${theme.spacing.xl}px;
  align-items: center;
`;

const DatesContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const DatesList = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingRight: theme.spacing.lg,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

const DateItem = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  margin-right: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.border.default};
  background-color: ${({ selected }) => (selected ? theme.colors.primary[50] : theme.colors.white)};
  min-width: 100px;
  align-items: center;
`;

const DateText = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  color: ${({ selected }) => (selected ? theme.colors.primary[700] : theme.colors.text.primary)};
  text-align: center;
`;

const TimesContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const TimesList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.md}px;
`;

const TimeItem = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${({ selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.border.default};
  background-color: ${({ selected }) => (selected ? theme.colors.primary[50] : theme.colors.white)};
  min-width: 80px;
  align-items: center;
`;

const TimeText = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  color: ${({ selected }) => (selected ? theme.colors.primary[700] : theme.colors.text.primary)};
`;

const EmptyContainer = styled.View`
  padding: ${theme.spacing.xl}px;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const SelectedSummary = styled.View`
  background-color: ${theme.colors.success[50]};
  margin: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  border-width: 1px;
  border-color: ${theme.colors.success[200]};
`;

const SummaryTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.success[700]};
  margin-bottom: ${theme.spacing.md}px;
`;

const SummaryDetails = styled.View`
  gap: ${theme.spacing.sm}px;
`;

const SummaryItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SummaryText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.success[600]};
  margin-left: ${theme.spacing.sm}px;
  text-transform: capitalize;
`;

export default BookingStep1DateTime;
