import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum BookingStep {
  SERVICE_SELECTION = 'service_selection',
  DATE_TIME = 'date_time',
  GUEST_INFO = 'guest_info',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
}

interface SelectedService {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration?: number;
  capacity: number;
  venueId: string;
  venueName: string;
}

interface SelectedDateTime {
  date: string; // ISO date string
  time: string; // HH:mm format
  timeSlot?: {
    start: string;
    end: string;
  };
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  guests: number;
  specialRequests?: string;
}

interface PaymentInfo {
  method: 'card' | 'cash' | 'transfer';
  amount: number;
  currency: string;
  stripePaymentIntentId?: string;
}

interface BookingState {
  currentStep: BookingStep;
  selectedService?: SelectedService;
  selectedDateTime?: SelectedDateTime;
  guestInfo?: GuestInfo;
  paymentInfo?: PaymentInfo;
  isLoading: boolean;
  error?: string;
  confirmationId?: string;
  totalAmount: number;
}

const initialState: BookingState = {
  currentStep: BookingStep.SERVICE_SELECTION,
  isLoading: false,
  totalAmount: 0,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<BookingStep>) => {
      state.currentStep = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<SelectedService>) => {
      state.selectedService = action.payload;
      state.totalAmount = action.payload.price;
    },
    setSelectedDateTime: (state, action: PayloadAction<SelectedDateTime>) => {
      state.selectedDateTime = action.payload;
    },
    setGuestInfo: (state, action: PayloadAction<GuestInfo>) => {
      state.guestInfo = action.payload;
      
      // Recalcular total si hay cargos por huéspedes adicionales
      if (state.selectedService && action.payload.guests > 1) {
        const additionalGuests = action.payload.guests - 1;
        const additionalCost = additionalGuests * (state.selectedService.price * 0.1); // 10% por huésped adicional
        state.totalAmount = state.selectedService.price + additionalCost;
      }
    },
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload;
    },
    setBookingLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearBookingError: (state) => {
      state.error = undefined;
    },
    setConfirmationId: (state, action: PayloadAction<string>) => {
      state.confirmationId = action.payload;
      state.currentStep = BookingStep.CONFIRMATION;
    },
    goToNextStep: (state) => {
      const steps = Object.values(BookingStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    goToPreviousStep: (state) => {
      const steps = Object.values(BookingStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1];
      }
    },
    resetBooking: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCurrentStep,
  setSelectedService,
  setSelectedDateTime,
  setGuestInfo,
  setPaymentInfo,
  setBookingLoading,
  setBookingError,
  clearBookingError,
  setConfirmationId,
  goToNextStep,
  goToPreviousStep,
  resetBooking,
} = bookingSlice.actions;