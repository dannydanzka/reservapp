import { Reservation } from '../entities';
import { ReservationNotificationService, ReservationRepository } from '../interfaces';

export class CancelReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly notificationService: ReservationNotificationService
  ) {}

  async execute(reservationId: string, reason?: string): Promise<void> {
    // 1. Get the reservation
    const reservation = await this.reservationRepository.getById(reservationId);

    // 2. Validate cancellation is allowed
    this.validateCancellation(reservation);

    // 3. Cancel the reservation
    await this.reservationRepository.cancel(reservationId, reason);

    // 4. Send notifications
    await Promise.all([
      this.notificationService.notifyCancellation(reservationId, reason),
      this.notificationService.notifyVenueCancellation(reservationId),
    ]);

    // 5. Handle refund if payment was processed
    if (reservation.paymentStatus === 'paid') {
      // Note: Refund logic would be handled by PaymentService
      // This is just notification that refund should be processed
      await this.notificationService.notifyStatusChange(reservationId, 'cancelled');
    }
  }

  private validateCancellation(reservation: Reservation): void {
    // Cannot cancel already cancelled reservations
    if (reservation.status === 'cancelled') {
      throw new Error('Reservation is already cancelled');
    }

    // Cannot cancel completed reservations
    if (reservation.status === 'completed') {
      throw new Error('Cannot cancel completed reservations');
    }

    // Check cancellation timing
    const reservationDateTime = new Date(`${reservation.date}T${reservation.time}`);
    const now = new Date();
    const hoursUntilReservation =
      (reservationDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // Must cancel at least 2 hours in advance
    if (hoursUntilReservation < 2) {
      throw new Error('Reservations must be cancelled at least 2 hours in advance');
    }
  }

  canCancelReservation(reservation: Reservation): {
    canCancel: boolean;
    reason?: string;
  } {
    try {
      this.validateCancellation(reservation);
      return { canCancel: true };
    } catch (error) {
      return {
        canCancel: false,
        reason: error instanceof Error ? error.message : 'Cannot cancel reservation',
      };
    }
  }
}
