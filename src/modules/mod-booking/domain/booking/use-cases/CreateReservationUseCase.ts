import { BookingConfirmation, CreateReservationData, Reservation } from '../entities';
import {
  BookingFlowService,
  ReservationNotificationService,
  ReservationRepository,
} from '../interfaces';

export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly bookingFlowService: BookingFlowService,
    private readonly notificationService: ReservationNotificationService
  ) {}

  async execute(data: CreateReservationData): Promise<BookingConfirmation> {
    // 1. Validate availability
    const isAvailable = await this.reservationRepository.checkAvailability(
      data.venueId,
      data.serviceId,
      data.date,
      data.time
    );

    if (!isAvailable) {
      throw new Error('Selected time slot is no longer available');
    }

    // 2. Create the reservation
    const reservation = await this.reservationRepository.create(data);

    // 3. Send notifications
    await Promise.all([
      this.notificationService.sendConfirmation(reservation.id),
      this.notificationService.notifyVenueNewBooking(reservation.id),
    ]);

    // 4. Return confirmation
    return {
      confirmationNumber: this.generateConfirmationNumber(reservation.id),
      estimatedConfirmationTime: this.calculateConfirmationTime(),
      requiresApproval: this.requiresVenueApproval(reservation),
      reservationId: reservation.id,
    };
  }

  private generateConfirmationNumber(reservationId: string): string {
    // Generate a user-friendly confirmation number
    const timestamp = Date.now().toString().slice(-6);
    const idSuffix = reservationId.slice(-4).toUpperCase();
    return `RES-${timestamp}-${idSuffix}`;
  }

  private calculateConfirmationTime(): string {
    // Most reservations are confirmed within 1 hour
    const confirmationTime = new Date();
    confirmationTime.setHours(confirmationTime.getHours() + 1);
    return confirmationTime.toISOString();
  }

  private requiresVenueApproval(reservation: Reservation): boolean {
    // Business logic: Large groups or special requests might require approval
    return reservation.guests > 8 || !!reservation.specialRequests;
  }
}
