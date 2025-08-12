import React from 'react';

import { Calendar, CheckCircle, CreditCard, User, Users } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';
import { useBookingFlow } from '@flows/BookingFlow';
import Button from '@components/Form/Button';
import ScreenLayout from '@components/Layout/ScreenLayout';

import BookingStep1DateTime from './steps/BookingStep1DateTime';
import BookingStep2Guests from './steps/BookingStep2Guests';
import BookingStep3Contact from './steps/BookingStep3Contact';
import BookingStep4Payment from './steps/BookingStep4Payment';
import BookingStep5Confirmation from './steps/BookingStep5Confirmation';

interface BookingNavigationFlowProps {
  navigation: any;
  route: {
    params: {
      venue: any;
      service?: any;
    };
  };
}

const BookingNavigationFlow: React.FC<BookingNavigationFlowProps> = ({ navigation, route }) => {
  const { service, venue } = route.params;

  const bookingFlow = useBookingFlow({
    initialData: { service, venue },
    onCancel: () => {
      navigation.goBack();
    },
    onComplete: (reservationId) => {
      // Navegar a la pantalla de éxito
      navigation.replace('BookingSuccess', { reservationId });
    },
  });

  const renderStepIndicator = () => (
    <StepIndicator>
      <ProgressBar>
        <ProgressFill progress={bookingFlow.getProgress()} />
      </ProgressBar>

      <StepsContainer>
        {bookingFlow.steps.map((step, index) => (
          <StepItem active={step.number === bookingFlow.currentStep} key={step.number}>
            <StepCircle
              active={step.number === bookingFlow.currentStep}
              completed={step.completed && step.number < bookingFlow.currentStep}
            >
              <StepNumber
                active={step.number === bookingFlow.currentStep}
                completed={step.completed && step.number < bookingFlow.currentStep}
              >
                {step.completed && step.number < bookingFlow.currentStep ? '✓' : step.number}
              </StepNumber>
            </StepCircle>
            <StepLabel active={step.number === bookingFlow.currentStep}>{step.title}</StepLabel>
          </StepItem>
        ))}
      </StepsContainer>
    </StepIndicator>
  );

  const renderStepContent = () => {
    switch (bookingFlow.currentStep) {
      case 1:
        return (
          <BookingStep1DateTime
            selectedDate={bookingFlow.bookingData.date}
            selectedTime={bookingFlow.bookingData.time}
            service={service}
            venue={venue}
            onDateSelect={(date) => bookingFlow.updateBookingData({ date })}
            onTimeSelect={(time) => bookingFlow.updateBookingData({ time })}
          />
        );

      case 2:
        return (
          <BookingStep2Guests
            guests={bookingFlow.bookingData.guests || 2}
            service={service}
            specialRequests={bookingFlow.bookingData.specialRequests || ''}
            venue={venue}
            onGuestsChange={(guests) => bookingFlow.updateBookingData({ guests })}
            onSpecialRequestsChange={(specialRequests) =>
              bookingFlow.updateBookingData({ specialRequests })
            }
          />
        );

      case 3:
        return (
          <BookingStep3Contact
            contactInfo={bookingFlow.bookingData.contactInfo}
            onContactInfoChange={(contactInfo) => bookingFlow.updateBookingData({ contactInfo })}
          />
        );

      case 4:
        return (
          <BookingStep4Payment
            bookingData={bookingFlow.bookingData}
            selectedPaymentMethodId={bookingFlow.bookingData.paymentMethodId}
            service={service}
            totalAmount={bookingFlow.calculateTotal()}
            venue={venue}
            onPaymentMethodSelect={(paymentMethodId) =>
              bookingFlow.updateBookingData({ paymentMethodId })
            }
          />
        );

      case 5:
        return (
          <BookingStep5Confirmation
            bookingData={bookingFlow.bookingData}
            isLoading={bookingFlow.isLoading}
            service={service}
            totalAmount={bookingFlow.calculateTotal()}
            venue={venue}
            onConfirm={bookingFlow.completeBooking}
          />
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
          <HeaderTitle>Nueva Reserva</HeaderTitle>
          <HeaderSubtitle>{venue?.name}</HeaderSubtitle>
        </Header>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <StepContent>{renderStepContent()}</StepContent>

        {/* Navigation Buttons */}
        <NavigationButtons>
          <SecondaryButton
            disabled={bookingFlow.isFirstStep() || bookingFlow.isLoading}
            size='lg'
            variant='outline'
            onPress={bookingFlow.goToPreviousStep}
          >
            {bookingFlow.isFirstStep() ? 'Cancelar' : 'Anterior'}
          </SecondaryButton>

          <PrimaryButton
            disabled={!bookingFlow.canProceed() || bookingFlow.isLoading}
            loading={bookingFlow.isLoading}
            size='lg'
            variant='primary'
            onPress={bookingFlow.goToNextStep}
          >
            {bookingFlow.isLastStep() ? 'Confirmar Reserva' : 'Siguiente'}
          </PrimaryButton>
        </NavigationButtons>
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
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const HeaderSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const StepIndicator = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const ProgressBar = styled.View`
  height: 4px;
  background-color: ${theme.colors.gray[200]};
  border-radius: 2px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${theme.colors.primary[500]};
  border-radius: 2px;
`;

const StepsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StepItem = styled.View<{ active: boolean }>`
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

const StepCircle = styled.View<{ active: boolean; completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ active, completed }) =>
    completed
      ? theme.colors.success[500]
      : active
      ? theme.colors.primary[500]
      : theme.colors.gray[300]};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const StepNumber = styled.Text<{ active: boolean; completed: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: bold;
  color: ${({ active, completed }) =>
    active || completed ? theme.colors.white : theme.colors.text.tertiary};
`;

const StepLabel = styled.Text<{ active: boolean }>`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${({ active }) => (active ? theme.colors.text.primary : theme.colors.text.tertiary)};
  text-align: center;
  font-weight: ${({ active }) => (active ? '600' : '400')};
`;

const StepContent = styled.View`
  flex: 1;
`;

const NavigationButtons = styled.View`
  flex-direction: row;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-top-width: 1px;
  border-top-color: ${theme.colors.border.default};
  gap: ${theme.spacing.md}px;
`;

const SecondaryButton = styled(Button)`
  flex: 1;
`;

const PrimaryButton = styled(Button)`
  flex: 2;
`;

export default BookingNavigationFlow;
