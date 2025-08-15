import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import { handleRequest } from '@http/handleRequest.config';
import { PaginationParams } from '@shared/types';

export interface PaymentReservation {
  id: string;
  confirmationId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: string;
  service: {
    id: string;
    name: string;
    category: string;
  };
  venue: {
    id: string;
    name: string;
    category: string;
    city: string;
  };
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  description: string;
  paymentMethod: string;
  status: string;
  type: string;
  stripePaymentId: string | null;
  transactionDate: string | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  reservation: PaymentReservation;
}

export interface PaymentsSummary {
  totalPayments: number;
  totalAmount: number;
  completedAmount: number;
  pendingCount: number;
}

export interface PaymentsResponse {
  payments: Payment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  summary: PaymentsSummary;
}

class PaymentsService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de pagos con paginación
   */
  async getPayments(pagination?: PaginationParams): Promise<PaymentsResponse> {
    try {
      const query = {
        ...pagination,
      };

      const response = await handleRequest<{
        success: boolean;
        message: string;
        data: PaymentsResponse;
      }>({
        customDefaultErrorMessage: 'Error al cargar pagos',
        endpoint: '/payments',
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar pagos');
    } catch (error) {
      console.error('PaymentsService.getPayments error:', error);
      throw error;
    }
  }

  /**
   * Formatear precio con moneda
   */
  formatPrice(amount: number, currency: string = 'MXN'): string {
    return new Intl.NumberFormat('es-MX', {
      currency: currency,
      style: 'currency',
    }).format(amount);
  }

  /**
   * Obtener etiqueta del status de pago
   */
  getPaymentStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      CANCELLED: 'Cancelado',
      COMPLETED: 'Completado',
      FAILED: 'Fallido',
      PENDING: 'Pendiente',
      REFUNDED: 'Reembolsado',
    };
    return labels[status.toUpperCase()] || status;
  }

  /**
   * Obtener color del status de pago
   */
  getPaymentStatusColor(status: string): string {
    const colors: Record<string, string> = {
      CANCELLED: '#6c757d',
      COMPLETED: '#28a745',
      FAILED: '#dc3545',
      PENDING: '#FFA500',
      REFUNDED: '#17a2b8',
    };
    return colors[status.toUpperCase()] || '#666666';
  }
}

export const paymentsService = new PaymentsService();
export default paymentsService;
