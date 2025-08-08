import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/store';
import {
  BookingStep,
  setCurrentStep,
  setSelectedService,
  setSelectedDateTime,
  setGuestInfo,
  setPaymentInfo,
  goToNextStep,
  goToPreviousStep,
  resetBooking,
} from '../store/slices/bookingSlice';
import { useAppNavigation } from './useAppNavigation';

export const useBookingFlow = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useAppNavigation();
  const bookingState = useAppSelector((state) => state.booking);

  const startBooking = useCallback((venueId?: string) => {
    dispatch(resetBooking());
    navigation.navigate('BookingFlow', { 
      screen: 'ServiceSelection', 
      params: venueId ? { venueId } : undefined 
    });
  }, [dispatch, navigation]);

  const selectService = useCallback((service: any) => {
    dispatch(setSelectedService(service));
    dispatch(setCurrentStep(BookingStep.DATE_TIME));
  }, [dispatch]);

  const selectDateTime = useCallback((dateTime: any) => {
    dispatch(setSelectedDateTime(dateTime));
    dispatch(setCurrentStep(BookingStep.GUEST_INFO));
  }, [dispatch]);

  const submitGuestInfo = useCallback((guestInfo: any) => {
    dispatch(setGuestInfo(guestInfo));
    dispatch(setCurrentStep(BookingStep.PAYMENT));
  }, [dispatch]);

  const processPayment = useCallback(async (paymentInfo: any) => {
    dispatch(setPaymentInfo(paymentInfo));
    
    try {
      // Aquí iría la lógica de procesamiento de pago
      // Por ahora simulamos éxito
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch(setCurrentStep(BookingStep.CONFIRMATION));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);

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
    startBooking,
    selectService,
    selectDateTime,
    submitGuestInfo,
    processPayment,
    nextStep,
    previousStep,
    cancelBooking,
    finishBooking,
  };
};