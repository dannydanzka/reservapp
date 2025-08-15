import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Service,
  ServiceAvailability,
  ServiceFilters,
  ServiceStats,
  TimeSlot,
} from '@shared/types';
import { handleRequest } from '@http/handleRequest.config';

class ServicesService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de servicios con filtros opcionales
   */
  async getServices(
    filters?: ServiceFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Service>> {
    try {
      const query = {
        isActive: true,
        limit: pagination?.limit || 10,
        // Always filter active services for mobile
        page: pagination?.page || 1,
        ...filters,
      };

      const response = await handleRequest<{
        data: Service[];
        pagination: any;
        success: boolean;
      }>({
        customDefaultErrorMessage: 'Error al cargar servicios',
        endpoint: API_ENDPOINTS.SERVICES.LIST,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        // La respuesta real de la API viene directamente estructurada
        const pagination = response.pagination;
        const hasMore = pagination.page < pagination.pages;

        return {
          data: response.data,
          pagination: {
            ...pagination,
            hasMore,
          },
        } as PaginatedResponse<Service>;
      }
      throw new Error(response.message || 'Error al cargar servicios');
    } catch (error) {
      console.error('❌ ServicesService.getServices error:', error);
      throw error;
    }
  }

  /**
   * Obtener servicios disponibles con slots de tiempo
   */
  async getAvailableServices(
    date: string,
    filters?: ServiceFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Service>> {
    try {
      const query = {
        available: true,
        date,
        ...filters,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Service>>>({
        customDefaultErrorMessage: 'Error al cargar servicios disponibles',
        endpoint: API_ENDPOINTS.SERVICES.AVAILABLE,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar servicios disponibles');
    } catch (error) {
      console.error('ServicesService.getAvailableServices error:', error);
      throw error;
    }
  }

  /**
   * Obtener servicios populares
   */
  async getPopularServices(pagination?: PaginationParams): Promise<PaginatedResponse<Service>> {
    try {
      const query = {
        isPopular: true,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Service>>>({
        customDefaultErrorMessage: 'Error al cargar servicios populares',
        endpoint: API_ENDPOINTS.SERVICES.LIST,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar servicios populares');
    } catch (error) {
      console.error('ServicesService.getPopularServices error:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de un servicio específico
   */
  async getServiceDetails(serviceId: string): Promise<Service> {
    try {
      const response = await handleRequest<ApiResponse<Service>>({
        customDefaultErrorMessage: 'Error al cargar detalles del servicio',
        endpoint: API_ENDPOINTS.SERVICES.DETAILS(serviceId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar detalles del servicio');
    } catch (error) {
      console.error('ServicesService.getServiceDetails error:', error);
      throw error;
    }
  }

  /**
   * Alias para getServiceDetails - mantiene compatibilidad
   */
  async getServiceById(serviceId: string): Promise<ApiResponse<Service>> {
    try {
      const service = await this.getServiceDetails(serviceId);
      return {
        data: service,
        message: 'Servicio cargado exitosamente',
        success: true,
      };
    } catch (error) {
      console.error('ServicesService.getServiceById error:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo servicio (requiere permisos de manager/admin)
   */
  async createService(serviceData: Partial<Service>): Promise<Service> {
    try {
      const response = await handleRequest<ApiResponse<Service>>({
        body: serviceData,
        customDefaultErrorMessage: 'Error al crear servicio',
        endpoint: API_ENDPOINTS.SERVICES.CREATE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al crear servicio');
    } catch (error) {
      console.error('ServicesService.createService error:', error);
      throw error;
    }
  }

  /**
   * Actualizar un servicio existente (requiere permisos)
   */
  async updateService(serviceId: string, serviceData: Partial<Service>): Promise<Service> {
    try {
      const response = await handleRequest<ApiResponse<Service>>({
        body: serviceData,
        customDefaultErrorMessage: 'Error al actualizar servicio',
        endpoint: API_ENDPOINTS.SERVICES.UPDATE(serviceId),
        method: 'put',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar servicio');
    } catch (error) {
      console.error('ServicesService.updateService error:', error);
      throw error;
    }
  }

  /**
   * Eliminar un servicio (requiere permisos de admin)
   */
  async deleteService(serviceId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        customDefaultErrorMessage: 'Error al eliminar servicio',
        endpoint: API_ENDPOINTS.SERVICES.DELETE(serviceId),
        method: 'delete',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al eliminar servicio');
      }
    } catch (error) {
      console.error('ServicesService.deleteService error:', error);
      throw error;
    }
  }

  /**
   * Buscar servicios por texto
   */
  async searchServices(
    searchQuery: string,
    filters?: Partial<ServiceFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Service>> {
    try {
      const query = {
        search: searchQuery,
        ...filters,
        ...pagination,
      };

      return await this.getServices(query as ServiceFilters, pagination);
    } catch (error) {
      console.error('ServicesService.searchServices error:', error);
      throw error;
    }
  }

  /**
   * Obtener servicios por categoría
   */
  async getServicesByCategory(
    category: string,
    filters?: Partial<ServiceFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Service>> {
    try {
      const serviceFilters: ServiceFilters = {
        category,
        ...filters,
      };

      return await this.getServices(serviceFilters, pagination);
    } catch (error) {
      console.error('ServicesService.getServicesByCategory error:', error);
      throw error;
    }
  }

  /**
   * Obtener servicios por venue
   */
  async getServicesByVenue(
    venueId: string,
    filters?: Partial<ServiceFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Service>> {
    try {
      const serviceFilters: ServiceFilters = {
        venueId,
        ...filters,
      };

      return await this.getServices(serviceFilters, pagination);
    } catch (error) {
      console.error('ServicesService.getServicesByVenue error:', error);
      throw error;
    }
  }

  /**
   * Obtener servicios públicos (sin autenticación requerida)
   */
  async getPublicServices(filters?: Partial<ServiceFilters>): Promise<PaginatedResponse<Service>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<Service>>>({
        customDefaultErrorMessage: 'Error al cargar servicios públicos',
        endpoint: API_ENDPOINTS.PUBLIC.SERVICES,
        method: 'get',
        query: filters,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar servicios públicos');
    } catch (error) {
      console.error('ServicesService.getPublicServices error:', error);
      throw error;
    }
  }

  /**
   * Obtener disponibilidad de un servicio específico
   */
  async getServiceAvailability(
    serviceId: string,
    date: string,
    duration?: number
  ): Promise<ServiceAvailability> {
    try {
      const query = {
        date,
        duration,
      };

      const response = await handleRequest<ApiResponse<ServiceAvailability>>({
        customDefaultErrorMessage: 'Error al cargar disponibilidad',
        endpoint: `${API_ENDPOINTS.SERVICES.DETAILS(serviceId)}/availability`,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar disponibilidad');
    } catch (error) {
      console.error('ServicesService.getServiceAvailability error:', error);
      throw error;
    }
  }

  /**
   * Obtener slots de tiempo disponibles para un servicio
   */
  async getAvailableTimeSlots(
    serviceId: string,
    date: string,
    capacity?: number
  ): Promise<TimeSlot[]> {
    try {
      const availability = await this.getServiceAvailability(serviceId, date);

      // Filtrar slots disponibles con capacidad suficiente
      return availability.timeSlots.filter((slot) => {
        return slot.available && (!capacity || slot.capacity >= capacity);
      });
    } catch (error) {
      console.error('ServicesService.getAvailableTimeSlots error:', error);
      throw error;
    }
  }

  /**
   * Verificar disponibilidad para reservation
   */
  async checkAvailability(
    serviceId: string,
    date: string,
    startTime: string,
    capacity: number,
    duration?: number
  ): Promise<{ available: boolean; timeSlot?: TimeSlot }> {
    try {
      const availability = await this.getServiceAvailability(serviceId, date, duration);

      const timeSlot = availability.timeSlots.find((slot) => slot.startTime === startTime);

      if (!timeSlot) {
        return { available: false };
      }

      const available = timeSlot.available && timeSlot.capacity >= capacity;

      return { available, timeSlot };
    } catch (error) {
      console.error('ServicesService.checkAvailability error:', error);
      return { available: false };
    }
  }

  /**
   * Obtener estadísticas de servicios (si está disponible en backend)
   */
  async getServicesStats(): Promise<ServiceStats | undefined> {
    try {
      const response = await handleRequest<ApiResponse<ServiceStats>>({
        customDefaultErrorMessage: 'Error al cargar estadísticas de servicios',
        endpoint: `${API_ENDPOINTS.SERVICES.LIST}/stats`,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      return undefined;
    } catch (error) {
      console.warn('ServicesService.getServicesStats not available:', error);
      return undefined;
    }
  }

  /**
   * Obtener categorías de servicios disponibles
   */
  async getServiceCategories(): Promise<string[]> {
    try {
      const response = await handleRequest<ApiResponse<string[]>>({
        customDefaultErrorMessage: 'Error al cargar categorías',
        endpoint: `${API_ENDPOINTS.SERVICES.LIST}/categories`,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }

      // Fallback a categorías predefinidas
      return [
        'ACCOMMODATION',
        'DINING',
        'SPA_WELLNESS',
        'TOUR_EXPERIENCE',
        'EVENT_MEETING',
        'TRANSPORTATION',
        'ENTERTAINMENT',
      ];
    } catch (error) {
      console.warn('ServicesService.getServiceCategories using fallback:', error);
      // Fallback en caso de error
      return [
        'ACCOMMODATION',
        'DINING',
        'SPA_WELLNESS',
        'TOUR_EXPERIENCE',
        'EVENT_MEETING',
        'TRANSPORTATION',
        'ENTERTAINMENT',
      ];
    }
  }

  /**
   * Calcular precio final con impuestos y descuentos
   */
  calculateFinalPrice(
    service: Service,
    capacity: number,
    duration?: number,
    discountPercent?: number
  ): { basePrice: number; taxes: number; discount: number; finalPrice: number } {
    let basePrice = service.basePrice;

    // Ajustar precio según tipo
    if (service.priceType === 'PER_PERSON') {
      basePrice *= capacity;
    }

    // Ajustar por duración si aplica
    if (duration && service.price.unit === 'per_hour') {
      basePrice = (basePrice * duration) / 60; // Convertir minutos a horas
    }

    // Calcular impuestos (ejemplo: 16% IVA México)
    const taxes = basePrice * 0.16;

    // Calcular descuento
    const discount = discountPercent ? (basePrice * discountPercent) / 100 : 0;

    // Precio final
    const finalPrice = basePrice + taxes - discount;

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
    };
  }

  /**
   * Formatear precio para display
   */
  formatPrice(amount: number, currency: string = 'MXN'): string {
    return new Intl.NumberFormat('es-MX', {
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      style: 'currency',
    }).format(amount);
  }
}

// Types adicionales para el servicio
export interface ServiceStats {
  totalServices: number;
  averageRating: number;
  totalReservations: number;
  averagePrice: number;
  popularCategories: Array<{
    category: string;
    count: number;
  }>;
}

export const servicesService = new ServicesService();
export default servicesService;
