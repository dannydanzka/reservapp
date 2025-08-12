export interface BookingFlowState {
  currentStep: BookingStep;
  totalSteps: number;

  // Step Data
  dateTime?: BookingDateTime;
  guestInfo?: BookingGuestInfo;
  serviceDetails?: BookingServiceDetails;
  paymentInfo?: BookingPaymentInfo;

  // Validation
  isStepValid: (step: BookingStep) => boolean;
  canProceed: boolean;

  // Progress
  completedSteps: BookingStep[];

  // Context
  venueId: string;
  serviceId: string;
}

export type BookingStep = 'dateTime' | 'guestInfo' | 'serviceDetails' | 'payment' | 'confirmation';

export interface BookingDateTime {
  date: string;
  time: string;
  duration: number;
  timezone: string;
  isAvailable: boolean;
}

export interface BookingGuestInfo {
  numberOfGuests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
}

export interface BookingServiceDetails {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  addOns?: ServiceAddOn[];
  totalPrice: number;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface BookingPaymentInfo {
  paymentMethodId?: string;
  paymentIntentId?: string;
  amount: number;
  currency: string;
  taxes: number;
  discounts: number;
  finalAmount: number;
}

export interface BookingConfirmation {
  reservationId: string;
  confirmationNumber: string;
  estimatedConfirmationTime: string;
  requiresApproval: boolean;
}
