import {
  BookingConfirmation,
  BookingDateTime,
  BookingFlowState,
  BookingGuestInfo,
  BookingPaymentInfo,
  BookingServiceDetails,
  BookingStep,
} from '../entities';
import { BookingFlowService, ReservationRepository } from '../interfaces';

export class BookingFlowUseCase {
  constructor(
    private readonly bookingFlowService: BookingFlowService,
    private readonly reservationRepository: ReservationRepository
  ) {}

  initializeBookingFlow(venueId: string, serviceId: string): BookingFlowState {
    return this.bookingFlowService.initializeFlow(venueId, serviceId);
  }

  async updateDateTime(
    state: BookingFlowState,
    dateTime: BookingDateTime
  ): Promise<BookingFlowState> {
    // Validate availability before updating state
    const isAvailable = await this.reservationRepository.checkAvailability(
      state.venueId,
      state.serviceId,
      dateTime.date,
      dateTime.time
    );

    if (!isAvailable) {
      throw new Error('Selected time slot is no longer available');
    }

    return this.bookingFlowService.updateStep(state, 'dateTime', {
      ...dateTime,
      isAvailable,
    });
  }

  updateGuestInfo(state: BookingFlowState, guestInfo: BookingGuestInfo): BookingFlowState {
    this.validateGuestInfo(guestInfo);

    return this.bookingFlowService.updateStep(state, 'guestInfo', guestInfo);
  }

  updateServiceDetails(
    state: BookingFlowState,
    serviceDetails: BookingServiceDetails
  ): BookingFlowState {
    this.validateServiceDetails(serviceDetails);

    return this.bookingFlowService.updateStep(state, 'serviceDetails', serviceDetails);
  }

  updatePaymentInfo(state: BookingFlowState, paymentInfo: BookingPaymentInfo): BookingFlowState {
    this.validatePaymentInfo(paymentInfo);

    return this.bookingFlowService.updateStep(state, 'payment', paymentInfo);
  }

  async completeBooking(state: BookingFlowState): Promise<BookingConfirmation> {
    // Final validation
    this.validateCompleteBooking(state);

    return await this.bookingFlowService.completeBooking(state);
  }

  canProceedToNextStep(state: BookingFlowState): boolean {
    return this.bookingFlowService.canProceedToStep(state, this.getNextStep(state.currentStep));
  }

  getNextStep(currentStep: BookingStep): BookingStep | null {
    return this.bookingFlowService.getNextStep(currentStep);
  }

  getPreviousStep(currentStep: BookingStep): BookingStep | null {
    return this.bookingFlowService.getPreviousStep(currentStep);
  }

  private validateGuestInfo(guestInfo: BookingGuestInfo): void {
    if (!guestInfo.guestName.trim()) {
      throw new Error('Guest name is required');
    }

    if (!guestInfo.guestEmail.trim() || !this.isValidEmail(guestInfo.guestEmail)) {
      throw new Error('Valid email address is required');
    }

    if (guestInfo.numberOfGuests < 1 || guestInfo.numberOfGuests > 20) {
      throw new Error('Number of guests must be between 1 and 20');
    }
  }

  private validateServiceDetails(serviceDetails: BookingServiceDetails): void {
    if (!serviceDetails.serviceId) {
      throw new Error('Service selection is required');
    }

    if (serviceDetails.totalPrice <= 0) {
      throw new Error('Invalid service pricing');
    }
  }

  private validatePaymentInfo(paymentInfo: BookingPaymentInfo): void {
    if (paymentInfo.finalAmount <= 0) {
      throw new Error('Invalid payment amount');
    }

    if (!paymentInfo.paymentMethodId && !paymentInfo.paymentIntentId) {
      throw new Error('Payment method is required');
    }
  }

  private validateCompleteBooking(state: BookingFlowState): void {
    const requiredSteps: BookingStep[] = ['dateTime', 'guestInfo', 'serviceDetails', 'payment'];

    for (const step of requiredSteps) {
      if (!state.completedSteps.includes(step)) {
        throw new Error(`Step ${step} must be completed before booking`);
      }
    }

    if (!state.dateTime?.isAvailable) {
      throw new Error('Selected time slot is no longer available');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
