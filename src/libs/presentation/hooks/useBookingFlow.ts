import { useCallback } from 'react';

import {
  BookingStep,
  goToNextStep,
  goToPreviousStep,
  resetBooking,
  setCurrentStep,
  setGuestInfo,
  setPaymentInfo,
  setSelectedDateTime,
  setSelectedService,
} from '@infrastructure/state/slices/bookingSlice';
import { useAppDispatch, useAppSelector } from '@infrastructure/state/store';

import { useAppNavigation } from './useAppNavigation';

export const useBookingFlow = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useAppNavigation();
  const bookingState = useAppSelector((state) => state.booking);

  const startBooking = useCallback(
    (venueId?: string) => {
      dispatch(resetBooking());
      navigation.navigate('BookingFlow', {
        params: venueId ? { venueId } : undefined,
        screen: 'ServiceSelection',
      });
    },
    [dispatch, navigation]
  );

  const selectService = useCallback(
    (service: any) => {
      dispatch(setSelectedService(service));
      dispatch(setCurrentStep(BookingStep.DATE_TIME));
    },
    [dispatch]
  );

  const selectDateTime = useCallback(
    (dateTime: any) => {
      dispatch(setSelectedDateTime(dateTime));
      dispatch(setCurrentStep(BookingStep.GUEST_INFO));
    },
    [dispatch]
  );

  const submitGuestInfo = useCallback(
    (guestInfo: any) => {
      dispatch(setGuestInfo(guestInfo));
      dispatch(setCurrentStep(BookingStep.PAYMENT));
    },
    [dispatch]
  );

  const processPayment = useCallback(
    async (paymentInfo: any) => {
      dispatch(setPaymentInfo(paymentInfo));

      try {
        // Aquí iría la lógica de procesamiento de pago
        // Por ahora simulamos éxito
        await new Promise((resolve) => setTimeout(resolve, 2000));

        dispatch(setCurrentStep(BookingStep.CONFIRMATION));
        return { success: true };
      } catch (error) {
        return { error, success: false };
      }
    },
    [dispatch]
  );

  const nextStep = useCallback(() => {
    dispatch(goToNextStep());
  }, [dispatch]);

  const previousStep = useCallback(() => {
    dispatch(goToPreviousStep());
  }, [dispatch]);

  const cancelBooking = useCallback(() => {
    dispatch(resetBooking());
    navigation.navigate('MainDrawer');
  }, [dispatch, navigation]);

  const finishBooking = useCallback(() => {
    dispatch(resetBooking());
    navigation.navigate('MainDrawer');
  }, [dispatch, navigation]);

  return {
    ...bookingState,
    cancelBooking,
    finishBooking,
    nextStep,
    previousStep,
    processPayment,
    selectDateTime,
    selectService,
    startBooking,
    submitGuestInfo,
  };
};
