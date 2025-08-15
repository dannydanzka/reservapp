import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { ArrowLeft, Calendar, CheckCircle, CreditCard, User } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { createReservation } from '../../../../../libs/infrastructure/state/slices/reservationsSlice';
import { CreateReservationData, Service } from '../../../../../libs/shared/types';
import { CustomWheelPicker } from '../../../../../components/DateTimePicker';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';
import { useRefreshUserData } from '../../../../../hooks/useRefreshUserData';

import {
  BackButton,
  Container,
  ContinueButton,
  ContinueButtonText,
  FormContainer,
  FormField,
  FormInput,
  FormLabel,
  HeaderContainer,
  HeaderTitle,
  LoadingContainer,
  LoadingText,
  PriceBreakdown,
  PriceItem,
  PriceTotal,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  StepContainer,
  StepIcon,
  StepIndicator,
  StepsContainer,
  StepText,
  StepTitle,
} from './ReservationFlowScreen.styled';

interface RouteParams {
  serviceId: string;
  service: Service;
}

type BookingStep = 'datetime' | 'guest' | 'payment' | 'confirmation';

export const ReservationFlowScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { refreshUserData } = useRefreshUserData();
  const { service, serviceId } = route.params as RouteParams;

  // Redux state
  const isLoading = useAppSelector((state) => state.reservations.isLoading);
  const user = useAppSelector((state) => state.auth.user);

  // Local state
  const [currentStep, setCurrentStep] = useState<BookingStep>('datetime');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [isCreatingReservation, setIsCreatingReservation] = useState(false);
  const [formData, setFormData] = useState({
    guestEmail: user?.email || '',
    guestName: user?.firstName || '',
    guestPhone: '',
    guests: 1,
    notes: '',
  });

  const steps: Array<{ key: BookingStep; title: string; icon: any }> = [
    { icon: Calendar, key: 'datetime', title: 'Fecha y Hora' },
    { icon: User, key: 'guest', title: 'Información' },
    { icon: CreditCard, key: 'payment', title: 'Pago' },
    { icon: CheckCircle, key: 'confirmation', title: 'Confirmación' },
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === currentStep);
  };

  const isStepCompleted = (stepKey: BookingStep) => {
    const currentIndex = getCurrentStepIndex();
    const stepIndex = steps.findIndex((step) => step.key === stepKey);
    return stepIndex < currentIndex;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+52)?[\s\-]?\d{2,3}[\s\-]?\d{3,4}[\s\-]?\d{4}$/;
    return phone === '' || phoneRegex.test(phone);
  };

  const validateDateTime = (): { isValid: boolean; message?: string } => {
    if (!selectedDate || !selectedTime) {
      return { isValid: false, message: 'Por favor selecciona fecha y hora' };
    }

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());

    if (selectedDateTime <= now) {
      return { isValid: false, message: 'La fecha y hora deben ser en el futuro' };
    }

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    if (selectedDateTime > maxDate) {
      return {
        isValid: false,
        message: 'No se pueden hacer reservas con más de 6 meses de anticipación',
      };
    }

    return { isValid: true };
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 'datetime':
        return validateDateTime().isValid;
      case 'guest':
        const maxCapacity =
          typeof service.capacity === 'object' ? service.capacity.max : service.maxCapacity || 10;
        return (
          formData.guestName.trim() !== '' &&
          formData.guestEmail.trim() !== '' &&
          validateEmail(formData.guestEmail) &&
          validatePhone(formData.guestPhone) &&
          formData.guests > 0 &&
          formData.guests <= maxCapacity
        );
      case 'payment':
        return true;
      default:
        return true;
    }
  };

  const getValidationMessage = (): string => {
    switch (currentStep) {
      case 'datetime':
        const dateTimeValidation = validateDateTime();
        return dateTimeValidation.message || 'Por favor completa fecha y hora';
      case 'guest':
        if (formData.guestName.trim() === '') return 'El nombre es requerido';
        if (formData.guestEmail.trim() === '') return 'El email es requerido';
        if (!validateEmail(formData.guestEmail)) return 'El email no es válido';
        if (!validatePhone(formData.guestPhone)) return 'El teléfono no es válido';
        if (formData.guests <= 0) return 'Debe ser al menos 1 huésped';
        const maxCapacity =
          typeof service.capacity === 'object' ? service.capacity.max : service.maxCapacity || 10;
        if (formData.guests > maxCapacity) return `Máximo ${maxCapacity} huéspedes permitidos`;
        return 'Por favor completa todos los campos';
      default:
        return 'Por favor completa todos los campos requeridos';
    }
  };

  const handleContinue = async () => {
    if (!validateCurrentStep()) {
      Alert.alert('Error', getValidationMessage());
      return;
    }

    const currentIndex = getCurrentStepIndex();

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key);
    } else {
      // Create reservation
      await handleCreateReservation();
    }
  };

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const formatTimeForAPI = (time: Date): string => {
    return time.toTimeString().split(' ')[0].substring(0, 5);
  };

  const handleCreateReservation = async () => {
    setIsCreatingReservation(true);
    try {
      const [firstName, ...lastNameParts] = formData.guestName.split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Calcular endDate (mismo día por defecto para servicios)
      const endDate = selectedDate ? formatDateForAPI(selectedDate) : '';
      const endTime = selectedTime
        ? (() => {
            const endDateTime = new Date(selectedTime);
            endDateTime.setHours(
              endDateTime.getHours() + (service.duration ? Math.ceil(service.duration / 60) : 2)
            );
            return formatTimeForAPI(endDateTime);
          })()
        : '';

      const reservationData: any = {
        checkInDate: selectedDate ? formatDateForAPI(selectedDate) : '',
        checkInTime: selectedTime ? formatTimeForAPI(selectedTime) : '',
        checkOutDate: endDate,
        checkOutTime: endTime,
        contactPhone: formData.guestPhone,
        emergencyContact: {
          name: formData.guestName,
          phone: formData.guestPhone,
          relationship: 'Self',
        },
        guests: formData.guests,
        paymentInfo: {
          method: 'STRIPE',
          paymentMethodId: 'pm_card_visa',
        },
        serviceId: service.id,
        specialRequests: formData.notes,
        venueId: service.venueId,
      };

      console.log('🚀 Creating reservation with data:', JSON.stringify(reservationData, null, 2));
      console.log('📅 Selected Date:', selectedDate);
      console.log('⏰ Selected Time:', selectedTime);
      console.log('🏨 Service ID:', service.id);
      console.log('🏢 Venue ID:', service.venueId);

      await dispatch(createReservation(reservationData)).unwrap();

      console.log('✅ Reservation created successfully!');

      // Actualizar todos los datos relevantes después de crear la reserva
      await refreshUserData({
        includeDashboard: true,
        includeNotifications: true,
        includePayments: true,
        includeReceipts: true,
        includeReservations: true,
        silent: false, // Mostrar errores en consola para debugging
      });

      Alert.alert('Reservación Exitosa', 'Tu reservación ha sido creada exitosamente', [
        {
          onPress: () => {
            // Navigate back to MainDrawer first, then to Reservations
            navigation.navigate('MainDrawer', { screen: 'Reservations' });
          },
          text: 'Ver Mis Reservas',
        },
        {
          onPress: () => {
            // Navigate back to MainDrawer first, then to HomeTabs
            navigation.navigate('MainDrawer', { screen: 'HomeTabs' });
          },
          text: 'Ir al Inicio',
        },
      ]);
    } catch (error) {
      console.error('❌ Error creating reservation:', error);
      console.error('❌ Error type:', typeof error);
      console.error('❌ Error message:', error?.message || 'No message');
      console.error(
        '❌ Full error object:',
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );

      Alert.alert(
        'Error',
        `No se pudo crear la reservación. Error: ${error?.message || 'Error desconocido'}`
      );
    } finally {
      setIsCreatingReservation(false);
    }
  };

  const calculateSubtotal = () => {
    // Obtener precio base del service - convertir string a número
    let basePrice =
      service.basePrice ||
      (typeof service.price === 'string' ? parseFloat(service.price) : service.price?.amount) ||
      1500; // Fallback a $1500 MXN

    // Asegurar que es un número válido
    if (isNaN(basePrice)) {
      basePrice = 1500;
    }

    if (service.priceType === 'PER_PERSON' || service.price?.unit === 'per_person') {
      basePrice *= formData.guests;
    }

    return basePrice;
  };

  const calculateTaxes = () => {
    return calculateSubtotal() * 0.16; // 16% IVA
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('es-MX', {
      currency: 'MXN',
      style: 'currency',
    }).format(price);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'datetime':
        return (
          <FormContainer>
            <FormField>
              <FormLabel>Fecha de la reservación</FormLabel>
              <CustomWheelPicker
                minimumDate={new Date()}
                mode='date'
                placeholder='Seleccionar fecha'
                value={selectedDate}
                onDateChange={setSelectedDate}
              />
            </FormField>

            <FormField>
              <FormLabel>Hora</FormLabel>
              <CustomWheelPicker
                mode='time'
                placeholder='Seleccionar hora'
                value={selectedTime}
                onDateChange={setSelectedTime}
              />
            </FormField>

            <FormField>
              <FormLabel>
                Número de huéspedes (máx.{' '}
                <Text>
                  {typeof service.capacity === 'object'
                    ? service.capacity.max
                    : service.maxCapacity || 10}
                </Text>
                )
              </FormLabel>
              <FormInput
                keyboardType='numeric'
                placeholder='1'
                value={formData.guests.toString()}
                onChangeText={(text) => {
                  const numGuests = parseInt(text) || 1;
                  const maxCapacity =
                    typeof service.capacity === 'object'
                      ? service.capacity.max
                      : service.maxCapacity || 10;
                  const validGuests = Math.min(Math.max(numGuests, 1), maxCapacity);
                  updateFormData('guests', validGuests);
                }}
              />
            </FormField>
          </FormContainer>
        );

      case 'guest':
        return (
          <FormContainer>
            <FormField>
              <FormLabel>Nombre completo</FormLabel>
              <FormInput
                placeholder='Tu nombre completo'
                value={formData.guestName}
                onChangeText={(text) => updateFormData('guestName', text)}
              />
            </FormField>

            <FormField>
              <FormLabel>Email</FormLabel>
              <FormInput
                keyboardType='email-address'
                placeholder='tu@email.com'
                value={formData.guestEmail}
                onChangeText={(text) => updateFormData('guestEmail', text)}
              />
            </FormField>

            <FormField>
              <FormLabel>Teléfono</FormLabel>
              <FormInput
                keyboardType='phone-pad'
                placeholder='+52 55 1234 5678'
                value={formData.guestPhone}
                onChangeText={(text) => updateFormData('guestPhone', text)}
              />
            </FormField>

            <FormField>
              <FormLabel>Notas especiales (opcional)</FormLabel>
              <FormInput
                multiline
                numberOfLines={3}
                placeholder='Comentarios adicionales...'
                value={formData.notes}
                onChangeText={(text) => updateFormData('notes', text)}
              />
            </FormField>
          </FormContainer>
        );

      case 'payment':
        return (
          <FormContainer>
            <PriceBreakdown>
              <PriceItem>
                <Text style={{ color: '#666', fontSize: 16 }}>Subtotal</Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>
                  {formatPrice(calculateSubtotal())}
                </Text>
              </PriceItem>

              <PriceItem>
                <Text style={{ color: '#666', fontSize: 16 }}>Impuestos (16%)</Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>
                  {formatPrice(calculateTaxes())}
                </Text>
              </PriceItem>

              <PriceTotal>
                <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                <Text style={{ color: '#FF8A00', fontSize: 18, fontWeight: 'bold' }}>
                  {formatPrice(calculateTotal())}
                </Text>
              </PriceTotal>
            </PriceBreakdown>

            {/* Stripe Payment Card */}
            <FormField>
              <FormLabel>Método de Pago</FormLabel>
              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#e9ecef',
                  borderRadius: 12,
                  borderWidth: 1,
                  marginBottom: 16,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View
                      style={{
                        backgroundColor: '#1a73e8',
                        borderRadius: 6,
                        marginRight: 12,
                        padding: 8,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>VISA</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#212529', fontSize: 16, fontWeight: '600' }}>
                        •••• •••• •••• 1643
                      </Text>
                      <Text style={{ color: '#6c757d', fontSize: 14 }}>Expira 03/2030</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#d4edda',
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ color: '#155724', fontSize: 12, fontWeight: '600' }}>
                      SANDBOX
                    </Text>
                  </View>
                </View>
              </View>
            </FormField>

            {/* Security Info */}
            <View
              style={{
                backgroundColor: '#fff3cd',
                borderRadius: 8,
                marginBottom: 16,
                padding: 12,
              }}
            >
              <Text style={{ color: '#856404', fontSize: 14, textAlign: 'center' }}>
                🔒 Datos de prueba - No se realizará ningún cargo real
              </Text>
            </View>
          </FormContainer>
        );

      case 'confirmation':
        return (
          <FormContainer>
            <ServiceInfo>
              <ServiceName>{service.name}</ServiceName>
              <ServicePrice>{formatPrice(calculateTotal())}</ServicePrice>
            </ServiceInfo>

            <FormField>
              <FormLabel>Fecha y hora</FormLabel>
              <FormInput
                editable={false}
                value={`${
                  selectedDate ? formatDateForAPI(selectedDate) : 'No seleccionada'
                } a las ${selectedTime ? formatTimeForAPI(selectedTime) : 'No seleccionada'}`}
              />
            </FormField>

            <FormField>
              <FormLabel>Huéspedes</FormLabel>
              <FormInput editable={false} value={`${formData.guests} persona(s)`} />
            </FormField>

            <FormField>
              <FormLabel>Contacto</FormLabel>
              <FormInput
                editable={false}
                value={`${formData.guestName} - ${formData.guestEmail}`}
              />
            </FormField>
          </FormContainer>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Procesando reservación...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft color='#000' size={24} />
        </BackButton>
        <HeaderTitle>Nueva Reservación</HeaderTitle>
      </HeaderContainer>

      {/* Step Indicator */}
      <StepsContainer>
        {steps.map((step, index) => (
          <StepContainer active={step.key === currentStep} key={step.key}>
            <StepIndicator active={step.key === currentStep} completed={isStepCompleted(step.key)}>
              <StepIcon>
                <step.icon
                  color={step.key === currentStep || isStepCompleted(step.key) ? '#fff' : '#666'}
                  size={20}
                />
              </StepIcon>
            </StepIndicator>
            <StepTitle active={step.key === currentStep}>{step.title}</StepTitle>
          </StepContainer>
        ))}
      </StepsContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <StepText>
          Paso {getCurrentStepIndex() + 1} de {steps.length}
        </StepText>
        {renderStepContent()}
      </ScrollView>

      <ContinueButton disabled={isCreatingReservation} onPress={handleContinue}>
        {isCreatingReservation && currentStep === 'confirmation' ? (
          <>
            <ActivityIndicator color='#fff' size='small' style={{ marginRight: 8 }} />
            <ContinueButtonText>Creando reservación...</ContinueButtonText>
          </>
        ) : (
          <ContinueButtonText>
            {currentStep === 'confirmation'
              ? 'Confirmar Reservación'
              : currentStep === 'payment'
              ? 'Procesar Pago'
              : 'Continuar'}
          </ContinueButtonText>
        )}
      </ContinueButton>
    </Container>
  );
};
