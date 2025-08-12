import React, { useEffect, useState } from 'react';

import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Users,
} from 'lucide-react-native';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import {
  Badge,
  Form,
  FormErrorSummary,
  FormSection,
  LoadingState,
  Tabs,
  useFormValidation,
  useLoadingState,
  useNotifications,
  ValidatedInput,
  withErrorHandling,
} from '@components';
import { CreateReservationData, Service, Venue } from '@types';
import { theme } from '@styles/theme';
import Button from '@components/Form/Button';
import reservationsService from '@libs/services/reservations/reservationsService';
import ScreenLayout from '@components/Layout/ScreenLayout';

interface BookingFlowScreenProps {
  navigation: any;
  route: {
    params: {
      service: Service;
      venue: Venue;
    };
  };
}

interface BookingFormData {
  date: string;
  time: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
}

const BOOKING_STEPS = [
  { icon: Calendar, id: 'datetime', label: 'Fecha y Hora' },
  { icon: Users, id: 'guests', label: 'Huéspedes' },
  { icon: Users, id: 'details', label: 'Detalles' },
  { icon: CreditCard, id: 'payment', label: 'Pago' },
  { icon: CheckCircle, id: 'confirmation', label: 'Confirmación' },
];

const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const PAYMENT_METHODS = [
  { icon: CreditCard, id: 'card', label: 'Tarjeta de Crédito/Débito' },
  { icon: Users, id: 'cash', label: 'Efectivo en el lugar' },
];

const BookingFlowScreen: React.FC<BookingFlowScreenProps> = ({ navigation, route }) => {
  const { service, venue } = route.params;
  const { showError, showSuccess } = useNotifications();
  const bookingLoadingState = useLoadingState();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedGuests, setSelectedGuests] = useState<number>(2);
  const [reservationId, setReservationId] = useState<string>('');

  // Form validation for guest details
  const formValidation = useFormValidation<BookingFormData>({
    fields: [
      {
        label: 'Nombre',
        name: 'firstName',
        rules: [{ message: 'Nombre es requerido', type: 'required' }],
      },
      {
        label: 'Apellido',
        name: 'lastName',
        rules: [{ message: 'Apellido es requerido', type: 'required' }],
      },
      {
        label: 'Email',
        name: 'email',
        rules: [
          { message: 'Email es requerido', type: 'required' },
          { message: 'Email inválido', type: 'email' },
        ],
      },
      {
        label: 'Teléfono',
        name: 'phone',
        rules: [
          { message: 'Teléfono es requerido', type: 'required' },
          { message: 'Teléfono inválido', type: 'phone' },
        ],
      },
    ],
    initialValues: {
      date: '',
      email: '',
      firstName: '',
      guests: 2,
      lastName: '',
      paymentMethod: 'card',
      phone: '',
      specialRequests: '',
      time: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const { formState, getFieldError, isFieldTouched, setValue } = formValidation;

  // Create reservation
  const createReservation = withErrorHandling(
    async () => {
      if (!selectedDate || !selectedTime) {
        showError('Selecciona fecha y hora');
        return;
      }

      bookingLoadingState.startLoading();

      try {
        const reservationData: CreateReservationData = {
          customerInfo: {
            email: formState.values.email,
            firstName: formState.values.firstName,
            lastName: formState.values.lastName,
            phone: formState.values.phone,
          },
          date: selectedDate,
          guests: selectedGuests,
          paymentMethod: formState.values.paymentMethod,
          serviceId: service.id,
          specialRequests: formState.values.specialRequests,
          time: selectedTime,
          totalAmount: service.price * selectedGuests,
          venueId: venue.id,
        };

        const reservation = await reservationsService.createReservation(reservationData);

        setReservationId(reservation.id);
        setCurrentStep(4); // Go to confirmation

        bookingLoadingState.setSuccess();
        showSuccess('¡Reserva creada exitosamente!', 'Reserva Confirmada');
      } catch (error) {
        bookingLoadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al crear la reserva',
      showAlert: false,
    }
  );

  const nextStep = () => {
    if (currentStep < BOOKING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // DateTime
        return selectedDate && selectedTime;
      case 1: // Guests
        return selectedGuests > 0;
      case 2: // Details
        return formState.isValid;
      case 3: // Payment
        return formState.values.paymentMethod;
      default:
        return true;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(amount);
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // DateTime Selection
        return (
          <StepContainer>
            <StepTitle>Selecciona Fecha y Hora</StepTitle>
            <StepDescription>Elige cuándo quieres disfrutar de{service.name}</StepDescription>

            {/* Date Selection */}
            <FormSection title='Fecha'>
              <DateGrid>
                {generateCalendarDates().map((date, index) => {
                  const dateString = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateString;

                  return (
                    <DateOption
                      key={index}
                      selected={isSelected}
                      onPress={() => setSelectedDate(dateString)}
                    >
                      <DateDay selected={isSelected}>
                        {date.toLocaleDateString('es-MX', { weekday: 'short' })}
                      </DateDay>
                      <DateNumber selected={isSelected}>{date.getDate()}</DateNumber>
                    </DateOption>
                  );
                })}
              </DateGrid>
            </FormSection>

            {/* Time Selection */}
            <FormSection title='Hora'>
              <TimeGrid>
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <TimeOption
                      key={time}
                      selected={isSelected}
                      onPress={() => setSelectedTime(time)}
                    >
                      <TimeText selected={isSelected}>{time}</TimeText>
                    </TimeOption>
                  );
                })}
              </TimeGrid>
            </FormSection>
          </StepContainer>
        );

      case 1: // Guest Selection
        return (
          <StepContainer>
            <StepTitle>Número de Huéspedes</StepTitle>
            <StepDescription>¿Para cuántas personas es la reserva?</StepDescription>

            <GuestSelector>
              {GUEST_OPTIONS.map((number) => {
                const isSelected = selectedGuests === number;

                return (
                  <GuestOption
                    key={number}
                    selected={isSelected}
                    onPress={() => setSelectedGuests(number)}
                  >
                    <GuestNumber selected={isSelected}>{number}</GuestNumber>
                    <GuestLabel selected={isSelected}>
                      {number === 1 ? 'persona' : 'personas'}
                    </GuestLabel>
                  </GuestOption>
                );
              })}
            </GuestSelector>

            {/* Price Preview */}
            <PricePreview>
              <PriceLabel>Precio por persona:</PriceLabel>
              <PriceValue>{formatCurrency(service.price)}</PriceValue>
              <PriceLabel>Total ({selectedGuests} personas):</PriceLabel>
              <PriceTotal>{formatCurrency(service.price * selectedGuests)}</PriceTotal>
            </PricePreview>
          </StepContainer>
        );

      case 2: // Guest Details
        return (
          <StepContainer>
            <StepTitle>Información del Huésped</StepTitle>
            <StepDescription>Necesitamos algunos datos para la reserva</StepDescription>

            <Form>
              <FormErrorSummary errors={formState.errors} />

              <FormRow>
                <FormHalfWidth>
                  <ValidatedInput
                    error={getFieldError('firstName')}
                    label='Nombre'
                    name='firstName'
                    placeholder='Tu nombre'
                    required
                    touched={isFieldTouched('firstName')}
                    value={formState.values.firstName}
                    onBlur={() => formValidation.markFieldAsTouched('firstName')}
                    onChangeText={(text) => setValue('firstName', text)}
                  />
                </FormHalfWidth>

                <FormHalfWidth>
                  <ValidatedInput
                    error={getFieldError('lastName')}
                    label='Apellido'
                    name='lastName'
                    placeholder='Tu apellido'
                    required
                    touched={isFieldTouched('lastName')}
                    value={formState.values.lastName}
                    onBlur={() => formValidation.markFieldAsTouched('lastName')}
                    onChangeText={(text) => setValue('lastName', text)}
                  />
                </FormHalfWidth>
              </FormRow>

              <ValidatedInput
                autoCapitalize='none'
                error={getFieldError('email')}
                keyboardType='email-address'
                label='Email'
                name='email'
                placeholder='tu@email.com'
                required
                touched={isFieldTouched('email')}
                value={formState.values.email}
                onBlur={() => formValidation.markFieldAsTouched('email')}
                onChangeText={(text) => setValue('email', text)}
              />

              <ValidatedInput
                error={getFieldError('phone')}
                keyboardType='phone-pad'
                label='Teléfono'
                name='phone'
                placeholder='+52 555 123 4567'
                required
                touched={isFieldTouched('phone')}
                value={formState.values.phone}
                onBlur={() => formValidation.markFieldAsTouched('phone')}
                onChangeText={(text) => setValue('phone', text)}
              />

              <ValidatedInput
                label='Solicitudes Especiales (Opcional)'
                multiline
                name='specialRequests'
                numberOfLines={3}
                placeholder='Alergias, celebraciones, etc.'
                value={formState.values.specialRequests}
                onChangeText={(text) => setValue('specialRequests', text)}
              />
            </Form>
          </StepContainer>
        );

      case 3: // Payment Method
        return (
          <StepContainer>
            <StepTitle>Método de Pago</StepTitle>
            <StepDescription>Selecciona cómo quieres pagar</StepDescription>

            <PaymentMethods>
              {PAYMENT_METHODS.map((method) => {
                const isSelected = formState.values.paymentMethod === method.id;

                return (
                  <PaymentOption
                    key={method.id}
                    selected={isSelected}
                    onPress={() => setValue('paymentMethod', method.id)}
                  >
                    <PaymentIconContainer>
                      <method.icon
                        color={isSelected ? theme.colors.primary[500] : theme.colors.gray[500]}
                        size={24}
                      />
                    </PaymentIconContainer>

                    <PaymentLabel selected={isSelected}>{method.label}</PaymentLabel>

                    {isSelected && <Badge size='small' text='Seleccionado' variant='primary' />}
                  </PaymentOption>
                );
              })}
            </PaymentMethods>

            {/* Order Summary */}
            <OrderSummary>
              <SummaryTitle>Resumen de la Reserva</SummaryTitle>

              <SummaryItem>
                <SummaryLabel>Servicio:</SummaryLabel>
                <SummaryValue>{service.name}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Venue:</SummaryLabel>
                <SummaryValue>{venue.name}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Fecha:</SummaryLabel>
                <SummaryValue>
                  {selectedDate &&
                    new Date(selectedDate).toLocaleDateString('es-MX', {
                      day: 'numeric',
                      month: 'long',
                      weekday: 'long',
                      year: 'numeric',
                    })}
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Hora:</SummaryLabel>
                <SummaryValue>{selectedTime}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Huéspedes:</SummaryLabel>
                <SummaryValue>{selectedGuests} personas</SummaryValue>
              </SummaryItem>

              <SummaryDivider />

              <SummaryItem>
                <SummaryLabelTotal>Total:</SummaryLabelTotal>
                <SummaryValueTotal>
                  {formatCurrency(service.price * selectedGuests)}
                </SummaryValueTotal>
              </SummaryItem>
            </OrderSummary>
          </StepContainer>
        );

      case 4: // Confirmation
        return (
          <ConfirmationContainer>
            <ConfirmationIcon>
              <CheckCircle color={theme.colors.success[500]} size={64} />
            </ConfirmationIcon>

            <ConfirmationTitle>¡Reserva Confirmada!</ConfirmationTitle>
            <ConfirmationMessage>
              Tu reserva ha sido creada exitosamente. Recibirás un email de confirmación en breve.
            </ConfirmationMessage>

            {reservationId && (
              <ConfirmationDetail>
                <ConfirmationDetailLabel>ID de Reserva:</ConfirmationDetailLabel>
                <ConfirmationDetailValue>{reservationId}</ConfirmationDetailValue>
              </ConfirmationDetail>
            )}

            <ConfirmationActions>
              <Button
                fullWidth
                size='lg'
                variant='primary'
                onPress={() => navigation.navigate('MyBookings')}
              >
                Ver Mis Reservas
              </Button>

              <Button
                fullWidth
                size='lg'
                variant='outline'
                onPress={() => navigation.navigate('Home')}
              >
                Ir al Inicio
              </Button>
            </ConfirmationActions>
          </ConfirmationContainer>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenLayout>
      <Container>
        {/* Header */}
        <Header>
          <BackButton onPress={() => (currentStep > 0 ? previousStep() : navigation.goBack())}>
            <ChevronLeft color={theme.colors.primary[600]} size={24} />
          </BackButton>

          <HeaderContent>
            <HeaderTitle>{service.name}</HeaderTitle>
            <HeaderSubtitle>{venue.name}</HeaderSubtitle>
          </HeaderContent>
        </Header>

        {/* Progress Steps */}
        {currentStep < 4 && (
          <StepsContainer>
            <Tabs
              activeTab={BOOKING_STEPS[currentStep].id}
              tabs={BOOKING_STEPS.slice(0, 4).map((step, index) => ({
                ...step,
                badge: index < currentStep ? '✓' : index === currentStep ? null : null,
              }))}
              variant='progress'
              onTabChange={() => {}} // Disable manual tab change
            />
          </StepsContainer>
        )}

        {/* Content */}
        <Content>
          <ScrollView showsVerticalScrollIndicator={false}>{renderStepContent()}</ScrollView>
        </Content>

        {/* Actions */}
        {currentStep < 4 && (
          <ActionsContainer>
            {currentStep > 0 && (
              <SecondaryButton onPress={previousStep}>
                <ChevronLeft color={theme.colors.gray[600]} size={20} />
                <SecondaryButtonText>Anterior</SecondaryButtonText>
              </SecondaryButton>
            )}

            <PrimaryButton
              disabled={!canProceed() || bookingLoadingState.isLoading}
              onPress={currentStep === 3 ? createReservation : nextStep}
            >
              {bookingLoadingState.isLoading ? (
                <LoadingState size='small' state='loading' />
              ) : (
                <>
                  <PrimaryButtonText>
                    {currentStep === 3 ? 'Confirmar Reserva' : 'Continuar'}
                  </PrimaryButtonText>
                  {currentStep < 3 && <ChevronRight color={theme.colors.white} size={20} />}
                </>
              )}
            </PrimaryButton>
          </ActionsContainer>
        )}
      </Container>
    </ScreenLayout>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[25]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const HeaderSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const StepsContainer = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const Content = styled.View`
  flex: 1;
`;

const StepContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const StepTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const StepDescription = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl}px;
  line-height: 22px;
`;

// Date Selection Components
const DateGrid = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: theme.spacing.sm },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: ${theme.spacing.lg}px;
`;

const DateOption = styled.TouchableOpacity<{ selected: boolean }>`
  width: 70px;
  height: 80px;
  border-radius: ${theme.borderRadius.lg}px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.white};
  border: 1px solid
    ${({ selected }) => (selected ? theme.colors.primary[500] : theme.colors.border.default)};
  align-items: center;
  justify-content: center;
  margin: 0 ${theme.spacing.sm}px;
  ${theme.shadows.sm}
`;

const DateDay = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text.secondary)};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xs}px;
`;

const DateNumber = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text.primary)};
`;

// Time Selection Components
const TimeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
`;

const TimeOption = styled.TouchableOpacity<{ selected: boolean }>`
  min-width: 70px;
  height: 44px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.white};
  border: 1px solid
    ${({ selected }) => (selected ? theme.colors.primary[500] : theme.colors.border.default)};
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing.md}px;
`;

const TimeText = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text.primary)};
`;

// Guest Selection Components
const GuestSelector = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.md}px;
  justify-content: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const GuestOption = styled.TouchableOpacity<{ selected: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.lg}px;
  background-color: ${({ selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.white};
  border: 1px solid
    ${({ selected }) => (selected ? theme.colors.primary[500] : theme.colors.border.default)};
  align-items: center;
  justify-content: center;
  ${theme.shadows.sm}
`;

const GuestNumber = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text.primary)};
  margin-bottom: ${theme.spacing.xs}px;
`;

const GuestLabel = styled.Text<{ selected: boolean }>`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${({ selected }) => (selected ? theme.colors.white : theme.colors.text.secondary)};
`;

// Form Components
const FormRow = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const FormHalfWidth = styled.View`
  flex: 1;
`;

// Price Preview Components
const PricePreview = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.sm}
`;

const PriceLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const PriceValue = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const PriceTotal = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.primary[600]};
`;

// Payment Components
const PaymentMethods = styled.View`
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const PaymentOption = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  border: 2px solid
    ${({ selected }) => (selected ? theme.colors.primary[500] : theme.colors.border.default)};
  ${theme.shadows.sm}
`;

const PaymentIconContainer = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const PaymentLabel = styled.Text<{ selected: boolean }>`
  flex: 1;
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  color: ${({ selected }) => (selected ? theme.colors.primary[700] : theme.colors.text.primary)};
`;

// Order Summary Components
const OrderSummary = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.sm}
`;

const SummaryTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg}px;
`;

const SummaryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SummaryLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const SummaryValue = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  flex: 1;
  text-align: right;
`;

const SummaryLabelTotal = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

const SummaryValueTotal = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.primary[600]};
`;

const SummaryDivider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border.default};
  margin: ${theme.spacing.md}px 0;
`;

// Confirmation Components
const ConfirmationContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

const ConfirmationIcon = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const ConfirmationTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  color: ${theme.colors.success[700]};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const ConfirmationMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const ConfirmationDetail = styled.View`
  background-color: ${theme.colors.primary[50]};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.xl}px;
  align-items: center;
`;

const ConfirmationDetailLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ConfirmationDetailValue = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.primary[700]};
`;

const ConfirmationActions = styled.View`
  width: 100%;
  gap: ${theme.spacing.md}px;
`;

// Action Buttons
const ActionsContainer = styled.View`
  flex-direction: row;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-top-width: 1px;
  border-top-color: ${theme.colors.border.default};
  gap: ${theme.spacing.md}px;
`;

const SecondaryButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.borderRadius.lg}px;
  background-color: ${theme.colors.white};
`;

const SecondaryButtonText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.gray[600]};
  margin-left: ${theme.spacing.xs}px;
`;

const PrimaryButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.lg}px;
  min-height: 48px;

  ${({ disabled }) => disabled && 'opacity: 0.6;'}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin-right: ${theme.spacing.xs}px;
`;

export default BookingFlowScreen;
