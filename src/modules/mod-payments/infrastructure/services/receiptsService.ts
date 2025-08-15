import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import { handleRequest } from '@http/handleRequest.config';
import { PaginationParams } from '@shared/types';

export interface ReceiptCustomer {
  id: string;
  email: string;
  fullName: string;
}

export interface ReceiptPayment {
  id: string;
  amount: string;
  currency: string;
  description: string;
  paymentMethod: string;
  status: string;
  stripePaymentId: string;
  transactionDate: string;
  reservation: {
    id: string;
    confirmationId: string;
    checkInDate: string;
    checkOutDate: string;
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
  };
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  amount: number;
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  status: string;
  type: string;
  isVerified: boolean;
  issueDate: string;
  paidDate: string;
  dueDate: string | null;
  pdfUrl: string | null;
  metadata: any;
  verifiedBy: string | null;
  createdAt: string;
  updatedAt: string;
  customer: ReceiptCustomer;
  payment: ReceiptPayment;
}

export interface ReceiptsSummary {
  totalReceipts: number;
  totalAmount: number;
  verifiedCount: number;
  pendingCount: number;
}

export interface ReceiptsResponse {
  receipts: Receipt[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  summary: ReceiptsSummary;
}

class ReceiptsService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de facturas con paginación
   */
  async getReceipts(pagination?: PaginationParams): Promise<ReceiptsResponse> {
    try {
      const query = {
        ...pagination,
      };

      const response = await handleRequest<{
        success: boolean;
        message: string;
        data: ReceiptsResponse;
      }>({
        customDefaultErrorMessage: 'Error al cargar facturas',
        endpoint: '/receipts',
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar facturas');
    } catch (error) {
      console.error('ReceiptsService.getReceipts error:', error);
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
   * Obtener etiqueta del status de factura
   */
  getReceiptStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      CANCELLED: 'Cancelada',
      DRAFT: 'Borrador',
      PENDING: 'Pendiente',
      VERIFIED: 'Verificada',
    };
    return labels[status.toUpperCase()] || status;
  }

  /**
   * Obtener color del status de factura
   */
  getReceiptStatusColor(status: string): string {
    const colors: Record<string, string> = {
      CANCELLED: '#dc3545',
      DRAFT: '#6c757d',
      PENDING: '#FFA500',
      VERIFIED: '#28a745',
    };
    return colors[status.toUpperCase()] || '#666666';
  }

  /**
   * Obtener etiqueta del tipo de factura
   */
  getReceiptTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      ADJUSTMENT: 'Ajuste',
      PAYMENT: 'Pago',
      REFUND: 'Reembolso',
    };
    return labels[type.toUpperCase()] || type;
  }
}

export const receiptsService = new ReceiptsService();
export default receiptsService;
