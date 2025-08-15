import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  CreateReservationData,
  PaginatedResponse,
  PaginationParams,
  Reservation,
  ReservationFilters,
  ReservationStatus,
} from '@shared/types';
import { handleRequest } from '@http/handleRequest.config';

class ReservationsService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de reservaciones con filtros opcionales
   */
  async getReservations(
    filters?: ReservationFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const query = {
        ...filters,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Reservation>>>({
        customDefaultErrorMessage: 'Error al cargar reservaciones',
        endpoint: API_ENDPOINTS.RESERVATIONS.LIST,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar reservaciones');
    } catch (error) {
      console.error('ReservationsService.getReservations error:', error);
      throw error;
    }
  }

  /**
   * Crear nueva reservación
   */
  async createReservation(reservationData: CreateReservationData): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        body: reservationData,
        customDefaultErrorMessage: 'Error al crear reservación',
        endpoint: API_ENDPOINTS.RESERVATIONS.CREATE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al crear reservación');
    } catch (error) {
      console.error('ReservationsService.createReservation error:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de una reservación específica
   */
  async getReservationDetails(reservationId: string): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        customDefaultErrorMessage: 'Error al cargar detalles de la reservación',
        endpoint: API_ENDPOINTS.RESERVATIONS.DETAILS(reservationId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar detalles de la reservación');
    } catch (error) {
      console.error('ReservationsService.getReservationDetails error:', error);
      throw error;
    }
  }

  /**
   * Actualizar una reservación existente
   */
  async updateReservation(
    reservationId: string,
    updateData: Partial<CreateReservationData>
  ): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        body: updateData,
        customDefaultErrorMessage: 'Error al actualizar reservación',
        endpoint: API_ENDPOINTS.RESERVATIONS.UPDATE(reservationId),
        method: 'patch',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar reservación');
    } catch (error) {
      console.error('ReservationsService.updateReservation error:', error);
      throw error;
    }
  }

  /**
   * Cancelar una reservación
   */
  async cancelReservation(reservationId: string, reason?: string): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        body: { cancellationReason: reason },
        customDefaultErrorMessage: 'Error al cancelar reservación',
        endpoint: API_ENDPOINTS.RESERVATIONS.CANCEL(reservationId),
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cancelar reservación');
    } catch (error) {
      console.error('ReservationsService.cancelReservation error:', error);
      throw error;
    }
  }

  /**
   * Eliminar una reservación (requiere permisos administrativos)
   */
  async deleteReservation(reservationId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        customDefaultErrorMessage: 'Error al eliminar reservación',
        endpoint: API_ENDPOINTS.RESERVATIONS.DELETE(reservationId),
        method: 'delete',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al eliminar reservación');
      }
    } catch (error) {
      console.error('ReservationsService.deleteReservation error:', error);
      throw error;
    }
  }

  /**
   * Check-in de una reservación
   */
  async checkinReservation(reservationId: string): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        customDefaultErrorMessage: 'Error al realizar check-in',
        endpoint: API_ENDPOINTS.RESERVATIONS.CHECKIN(reservationId),
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al realizar check-in');
    } catch (error) {
      console.error('ReservationsService.checkinReservation error:', error);
      throw error;
    }
  }

  /**
   * Check-out de una reservación
   */
  async checkoutReservation(reservationId: string): Promise<Reservation> {
    try {
      const response = await handleRequest<ApiResponse<Reservation>>({
        customDefaultErrorMessage: 'Error al realizar check-out',
        endpoint: API_ENDPOINTS.RESERVATIONS.CHECKOUT(reservationId),
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al realizar check-out');
    } catch (error) {
      console.error('ReservationsService.checkoutReservation error:', error);
      throw error;
    }
  }

  /**
   * Obtener reservaciones del usuario autenticado
   */
  async getMyReservations(
    filters?: Partial<ReservationFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const query = {
        ...filters,
        ...pagination,
        includeDetails: true, // Incluir detalles de venue y service
      };

      return await this.getReservations(query as ReservationFilters, pagination);
    } catch (error) {
      console.error('ReservationsService.getMyReservations error:', error);
      throw error;
    }
  }

  /**
   * Obtener reservaciones por estado
   */
  async getReservationsByStatus(
    status: ReservationStatus,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const filters: ReservationFilters = {
        includeDetails: true,
        status,
      };

      return await this.getReservations(filters, pagination);
    } catch (error) {
      console.error('ReservationsService.getReservationsByStatus error:', error);
      throw error;
    }
  }

  /**
   * Obtener reservaciones próximas (confirmadas, dentro de los próximos 7 días)
   */
  async getUpcomingReservations(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const filters: ReservationFilters = {
        dateFrom: today.toISOString().split('T')[0],
        dateTo: nextWeek.toISOString().split('T')[0],
        includeDetails: true,
        status: 'CONFIRMED',
      };

      return await this.getReservations(filters, pagination);
    } catch (error) {
      console.error('ReservationsService.getUpcomingReservations error:', error);
      throw error;
    }
  }

  /**
   * Obtener historial de reservaciones (pasadas)
   */
  async getReservationHistory(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const today = new Date();

      const filters: ReservationFilters = {
        dateTo: today.toISOString().split('T')[0],
        includeDetails: true,
      };

      return await this.getReservations(filters, pagination);
    } catch (error) {
      console.error('ReservationsService.getReservationHistory error:', error);
      throw error;
    }
  }

  /**
   * Buscar reservaciones por referencia
   */
  async searchReservationsByReference(
    reservationReference: string
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const filters: ReservationFilters = {
        includeDetails: true,
        search: reservationReference,
      };

      return await this.getReservations(filters);
    } catch (error) {
      console.error('ReservationsService.searchReservationsByReference error:', error);
      throw error;
    }
  }

  /**
   * Obtener reservaciones de un venue específico
   */
  async getVenueReservations(
    venueId: string,
    filters?: Partial<ReservationFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Reservation>> {
    try {
      const reservationFilters: ReservationFilters = {
        includeDetails: true,
        venueId,
        ...filters,
      };

      return await this.getReservations(reservationFilters, pagination);
    } catch (error) {
      console.error('ReservationsService.getVenueReservations error:', error);
      throw error;
    }
  }

  /**
   * Verificar disponibilidad antes de crear reservación
   */
  async checkAvailability(checkData: {
    serviceId: string;
    date: string;
    startTime: string;
    endTime?: string;
    capacity?: number;
  }): Promise<{ available: boolean; message?: string }> {
    try {
      // Usamos el endpoint de servicios disponibles para verificar
      const response = await handleRequest<ApiResponse<{ available: boolean; message?: string }>>({
        body: checkData,
        customDefaultErrorMessage: 'Error al verificar disponibilidad',
        endpoint: API_ENDPOINTS.SERVICES.AVAILABLE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }

      return {
        available: false,
        message: response.message || 'No se pudo verificar disponibilidad',
      };
    } catch (error) {
      console.error('ReservationsService.checkAvailability error:', error);
      return {
        available: false,
        message: 'Error al verificar disponibilidad',
      };
    }
  }
}

export const reservationsService = new ReservationsService();
export default reservationsService;
