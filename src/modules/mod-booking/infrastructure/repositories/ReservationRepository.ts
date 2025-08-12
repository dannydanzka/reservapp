import {
  CreateReservationData,
  Reservation,
  ReservationFilters,
  ReservationSummary,
  UpdateReservationData,
} from '../../../../domains/reservation/entities';
import { ReservationRepository as IReservationRepository } from '../../../../domains/reservation/interfaces';
import reservationsService from '../../services/domains/reservation/reservationsService';

class ReservationRepository implements IReservationRepository {
  async create(data: CreateReservationData): Promise<Reservation> {
    try {
      const response = await reservationsService.createReservation(data);
      return response;
    } catch (error) {
      throw new Error(
        `Create reservation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getById(id: string): Promise<Reservation> {
    try {
      const response = await reservationsService.getReservationDetails(id);
      return response;
    } catch (error) {
      throw new Error(
        `Get reservation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async update(id: string, data: UpdateReservationData): Promise<Reservation> {
    try {
      const response = await reservationsService.updateReservation(id, data);
      return response;
    } catch (error) {
      throw new Error(
        `Update reservation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async cancel(id: string, reason?: string): Promise<void> {
    try {
      await reservationsService.cancelReservation(id, reason);
    } catch (error) {
      throw new Error(
        `Cancel reservation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getReservations(filters?: ReservationFilters): Promise<ReservationSummary[]> {
    try {
      const response = await reservationsService.getReservations({
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
        serviceId: filters?.serviceId,
        status: filters?.status,
        venueId: filters?.venueId,
      });
      return response;
    } catch (error) {
      throw new Error(
        `Get reservations failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getUserReservations(
    userId: string,
    filters?: ReservationFilters
  ): Promise<ReservationSummary[]> {
    try {
      const response = await reservationsService.getUserReservations(userId, {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
        serviceId: filters?.serviceId,
        status: filters?.status,
        venueId: filters?.venueId,
      });
      return response;
    } catch (error) {
      throw new Error(
        `Get user reservations failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getUpcomingReservations(userId: string): Promise<ReservationSummary[]> {
    try {
      const response = await reservationsService.getUpcomingReservations(userId);
      return response;
    } catch (error) {
      throw new Error(
        `Get upcoming reservations failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async checkAvailability(
    venueId: string,
    serviceId: string,
    date: string,
    time: string
  ): Promise<boolean> {
    try {
      const response = await reservationsService.checkAvailability(venueId, serviceId, date, time);
      return response.isAvailable || false;
    } catch (error) {
      console.warn('Availability check failed:', error);
      return false; // Fail safe - assume not available if check fails
    }
  }

  async getAvailableSlots(venueId: string, serviceId: string, date: string): Promise<string[]> {
    try {
      const response = await reservationsService.getAvailableSlots(venueId, serviceId, date);
      return response.availableSlots || [];
    } catch (error) {
      console.warn('Get available slots failed:', error);
      return []; // Return empty array if fails
    }
  }
}

// Export singleton instance
const reservationRepository = new ReservationRepository();
export { reservationRepository };
export default reservationRepository;
