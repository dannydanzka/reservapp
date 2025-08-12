import {
  BookingConfirmation,
  BookingFlowState,
  BookingStep,
  CreateReservationData,
  Reservation,
  ReservationFilters,
  ReservationSummary,
  UpdateReservationData,
} from '../entities';

export interface ReservationRepository {
  // CRUD Operations
  create(data: CreateReservationData): Promise<Reservation>;
  getById(id: string): Promise<Reservation>;
  update(id: string, data: UpdateReservationData): Promise<Reservation>;
  cancel(id: string, reason?: string): Promise<void>;

  // Queries
  getReservations(filters?: ReservationFilters): Promise<ReservationSummary[]>;
  getUserReservations(userId: string, filters?: ReservationFilters): Promise<ReservationSummary[]>;
  getUpcomingReservations(userId: string): Promise<ReservationSummary[]>;

  // Availability
  checkAvailability(
    venueId: string,
    serviceId: string,
    date: string,
    time: string
  ): Promise<boolean>;
  getAvailableSlots(venueId: string, serviceId: string, date: string): Promise<string[]>;
}

export interface BookingFlowService {
  // Flow Management
  initializeFlow(venueId: string, serviceId: string): BookingFlowState;
  updateStep(state: BookingFlowState, step: BookingStep, data: any): BookingFlowState;
  validateStep(state: BookingFlowState, step: BookingStep): boolean;

  // Navigation
  canProceedToStep(state: BookingFlowState, targetStep: BookingStep): boolean;
  getNextStep(currentStep: BookingStep): BookingStep | null;
  getPreviousStep(currentStep: BookingStep): BookingStep | null;

  // Completion
  completeBooking(state: BookingFlowState): Promise<BookingConfirmation>;
}

export interface ReservationNotificationService {
  // Confirmation
  sendConfirmation(reservationId: string): Promise<void>;
  sendReminder(reservationId: string): Promise<void>;

  // Status Updates
  notifyStatusChange(reservationId: string, newStatus: Reservation['status']): Promise<void>;
  notifyCancellation(reservationId: string, reason?: string): Promise<void>;

  // Venue Notifications
  notifyVenueNewBooking(reservationId: string): Promise<void>;
  notifyVenueCancellation(reservationId: string): Promise<void>;
}
