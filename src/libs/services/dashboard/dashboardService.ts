import handleRequest from '../config/handleRequest.config';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { 
  DashboardStats, 
  RecentBooking, 
  ApiResponse 
} from '../types/auth.types';

class DashboardService {
  private baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener estadísticas del dashboard
   */
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await handleRequest<ApiResponse<DashboardStats>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.DASHBOARD.GET_STATS,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al obtener estadísticas',
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Error al obtener estadísticas');
      }
    } catch (error) {
      console.error('DashboardService.getStats error:', error);
      throw error;
    }
  }

  /**
   * Obtener reservaciones recientes
   */
  async getRecentBookings(limit: number = 5): Promise<RecentBooking[]> {
    try {
      const response = await handleRequest<ApiResponse<RecentBooking[]>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.DASHBOARD.GET_RECENT_BOOKINGS,
        method: 'get',
        query: { limit },
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al obtener reservaciones',
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Error al obtener reservaciones');
      }
    } catch (error) {
      console.error('DashboardService.getRecentBookings error:', error);
      throw error;
    }
  }

  /**
   * Simular datos del dashboard para desarrollo
   */
  async simulateStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalReservations: 247,
          totalVenues: 18,
          totalRevenue: 45280,
          averageStay: 2.3,
        });
      }, 1000);
    });
  }

  /**
   * Simular reservaciones recientes para desarrollo
   */
  async simulateRecentBookings(): Promise<RecentBooking[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            customerName: 'María García',
            serviceName: 'Salón de Eventos Premium',
            date: '2025-01-15',
            time: '18:00',
            status: 'confirmed',
            amount: 3500,
          },
          {
            id: '2',
            customerName: 'Carlos Rodríguez',
            serviceName: 'Sala de Juntas Ejecutiva',
            date: '2025-01-16',
            time: '14:00',
            status: 'pending',
            amount: 850,
          },
          {
            id: '3',
            customerName: 'Ana López',
            serviceName: 'Auditorio Principal',
            date: '2025-01-17',
            time: '10:00',
            status: 'confirmed',
            amount: 2200,
          },
          {
            id: '4',
            customerName: 'Roberto Méndez',
            serviceName: 'Terraza Vista Mar',
            date: '2025-01-18',
            time: '16:00',
            status: 'confirmed',
            amount: 4100,
          },
          {
            id: '5',
            customerName: 'Laura Hernández',
            serviceName: 'Salón Íntimo',
            date: '2025-01-19',
            time: '12:00',
            status: 'cancelled',
            amount: 1200,
          },
        ]);
      }, 800);
    });
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;