import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const ReservationStep = {
  CONFIRMATION: 'confirmation',
  DATE_TIME: 'date_time',
  GUEST_INFO: 'guest_info',
  PAYMENT: 'payment',
  SERVICE_SELECTION: 'service_selection',
} as const;

export type ReservationStepType = (typeof ReservationStep)[keyof typeof ReservationStep];

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

interface ReservationState {
  currentStep: ReservationStepType;
  selectedService?: SelectedService;
  selectedDateTime?: SelectedDateTime;
  guestInfo?: GuestInfo;
  paymentInfo?: PaymentInfo;
  isLoading: boolean;
  error?: string;
  confirmationId?: string;
  totalAmount: number;
}

const initialState: ReservationState = {
  currentStep: ReservationStep.SERVICE_SELECTION,
  isLoading: false,
  totalAmount: 0,
};

export const reservationSlice = createSlice({
  initialState,
  name: 'reservation',
  reducers: {
    clearReservationError: (state) => {
      state.error = undefined;
    },
    goToNextStep: (state) => {
      const steps = Object.values(ReservationStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    goToPreviousStep: (state) => {
      const steps = Object.values(ReservationStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1];
      }
    },
    resetReservation: (state) => {
      Object.assign(state, initialState);
    },
    setConfirmationId: (state, action: PayloadAction<string>) => {
      state.confirmationId = action.payload;
      state.currentStep = ReservationStep.CONFIRMATION;
    },
    setCurrentStep: (state, action: PayloadAction<ReservationStepType>) => {
      state.currentStep = action.payload;
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
    setReservationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setReservationLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedDateTime: (state, action: PayloadAction<SelectedDateTime>) => {
      state.selectedDateTime = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<SelectedService>) => {
      state.selectedService = action.payload;
      state.totalAmount = action.payload.price;
    },
  },
});

export const {
  clearReservationError,
  goToNextStep,
  goToPreviousStep,
  resetReservation,
  setConfirmationId,
  setCurrentStep,
  setGuestInfo,
  setPaymentInfo,
  setReservationError,
  setReservationLoading,
  setSelectedDateTime,
  setSelectedService,
} = reservationSlice.actions;

export const reservationReducer = reservationSlice.reducer;
