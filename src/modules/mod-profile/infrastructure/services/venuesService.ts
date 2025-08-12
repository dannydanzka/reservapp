import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  LocationParams,
  PaginatedResponse,
  PaginationParams,
  Review,
  ReviewStats,
  Venue,
  VenueFilters,
  VenueStats,
} from '@shared/types';
import handleRequest from '@http/handleRequest.config';

class VenuesService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de venues con filtros opcionales
   */
  async getVenues(
    filters?: VenueFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Venue>> {
    try {
      const query = {
        ...filters,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Venue>>>({
        customDefaultErrorMessage: 'Error al cargar venues',
        endpoint: API_ENDPOINTS.VENUES.LIST,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar venues');
    } catch (error) {
      console.error('VenuesService.getVenues error:', error);
      throw error;
    }
  }

  /**
   * Obtener venues cercanos basados en ubicación
   */
  async getNearbyVenues(
    location: LocationParams,
    filters?: Partial<VenueFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Venue>> {
    try {
      const query = {
        latitude: location.latitude,
        longitude: location.longitude,
        radius: location.radius || 10, // 10km por defecto
        ...filters,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Venue>>>({
        customDefaultErrorMessage: 'Error al cargar venues cercanos',
        endpoint: API_ENDPOINTS.VENUES.NEARBY,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar venues cercanos');
    } catch (error) {
      console.error('VenuesService.getNearbyVenues error:', error);
      throw error;
    }
  }

  /**
   * Obtener venues populares
   */
  async getPopularVenues(pagination?: PaginationParams): Promise<PaginatedResponse<Venue>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<Venue>>>({
        customDefaultErrorMessage: 'Error al cargar venues populares',
        endpoint: API_ENDPOINTS.VENUES.POPULAR,
        method: 'get',
        query: pagination as Record<string, unknown>,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar venues populares');
    } catch (error) {
      console.error('VenuesService.getPopularVenues error:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de un venue específico
   */
  async getVenueDetails(venueId: string): Promise<Venue> {
    try {
      const response = await handleRequest<ApiResponse<Venue>>({
        customDefaultErrorMessage: 'Error al cargar detalles del venue',
        endpoint: API_ENDPOINTS.VENUES.DETAILS(venueId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar detalles del venue');
    } catch (error) {
      console.error('VenuesService.getVenueDetails error:', error);
      throw error;
    }
  }

  /**
   * Alias para getVenueDetails - mantiene compatibilidad
   */
  async getVenueById(venueId: string): Promise<ApiResponse<Venue>> {
    try {
      const venue = await this.getVenueDetails(venueId);
      return {
        data: venue,
        message: 'Venue cargado exitosamente',
        success: true,
      };
    } catch (error) {
      console.error('VenuesService.getVenueById error:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo venue (requiere permisos de manager/admin)
   */
  async createVenue(venueData: Partial<Venue>): Promise<Venue> {
    try {
      const response = await handleRequest<ApiResponse<Venue>>({
        body: venueData,
        customDefaultErrorMessage: 'Error al crear venue',
        endpoint: API_ENDPOINTS.VENUES.CREATE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al crear venue');
    } catch (error) {
      console.error('VenuesService.createVenue error:', error);
      throw error;
    }
  }

  /**
   * Actualizar un venue existente (requiere permisos)
   */
  async updateVenue(venueId: string, venueData: Partial<Venue>): Promise<Venue> {
    try {
      const response = await handleRequest<ApiResponse<Venue>>({
        body: venueData,
        customDefaultErrorMessage: 'Error al actualizar venue',
        endpoint: API_ENDPOINTS.VENUES.UPDATE(venueId),
        method: 'put',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar venue');
    } catch (error) {
      console.error('VenuesService.updateVenue error:', error);
      throw error;
    }
  }

  /**
   * Eliminar un venue (requiere permisos de admin)
   */
  async deleteVenue(venueId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        customDefaultErrorMessage: 'Error al eliminar venue',
        endpoint: API_ENDPOINTS.VENUES.DELETE(venueId),
        method: 'delete',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al eliminar venue');
      }
    } catch (error) {
      console.error('VenuesService.deleteVenue error:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas generales de venues
   */
  async getVenuesStats(): Promise<VenueStats> {
    try {
      const response = await handleRequest<ApiResponse<VenueStats>>({
        customDefaultErrorMessage: 'Error al cargar estadísticas',
        endpoint: API_ENDPOINTS.VENUES.STATS,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar estadísticas');
    } catch (error) {
      console.error('VenuesService.getVenuesStats error:', error);
      throw error;
    }
  }

  /**
   * Obtener reviews de un venue específico
   */
  async getVenueReviews(
    venueId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<Review>>>({
        customDefaultErrorMessage: 'Error al cargar reviews',
        endpoint: API_ENDPOINTS.VENUES.REVIEWS(venueId),
        method: 'get',
        query: pagination as Record<string, unknown>,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar reviews');
    } catch (error) {
      console.error('VenuesService.getVenueReviews error:', error);
      throw error;
    }
  }

  /**
   * Obtener resumen de reviews de un venue
   */
  async getVenueReviewsSummary(venueId: string): Promise<ReviewStats> {
    try {
      const response = await handleRequest<ApiResponse<ReviewStats>>({
        customDefaultErrorMessage: 'Error al cargar resumen de reviews',
        endpoint: API_ENDPOINTS.VENUES.REVIEWS_SUMMARY(venueId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar resumen de reviews');
    } catch (error) {
      console.error('VenuesService.getVenueReviewsSummary error:', error);
      throw error;
    }
  }

  /**
   * Buscar venues por texto
   */
  async searchVenues(
    searchQuery: string,
    filters?: Partial<VenueFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Venue>> {
    try {
      const query = {
        search: searchQuery,
        ...filters,
        ...pagination,
      };

      return await this.getVenues(query as VenueFilters, pagination);
    } catch (error) {
      console.error('VenuesService.searchVenues error:', error);
      throw error;
    }
  }

  /**
   * Obtener venues por categoría
   */
  async getVenuesByCategory(
    category: string,
    filters?: Partial<VenueFilters>,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Venue>> {
    try {
      const venueFilters: VenueFilters = {
        category,
        ...filters,
      };

      return await this.getVenues(venueFilters, pagination);
    } catch (error) {
      console.error('VenuesService.getVenuesByCategory error:', error);
      throw error;
    }
  }

  /**
   * Obtener venues públicos (sin autenticación requerida)
   */
  async getPublicVenues(filters?: Partial<VenueFilters>): Promise<PaginatedResponse<Venue>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<Venue>>>({
        customDefaultErrorMessage: 'Error al cargar venues públicos',
        endpoint: API_ENDPOINTS.PUBLIC.VENUES,
        method: 'get',
        query: filters,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar venues públicos');
    } catch (error) {
      console.error('VenuesService.getPublicVenues error:', error);
      throw error;
    }
  }

  /**
   * Obtener lista de venues favoritos del usuario
   */
  async getFavoriteVenues(pagination?: PaginationParams): Promise<PaginatedResponse<Venue>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<Venue>>>({
        customDefaultErrorMessage: 'Error al cargar venues favoritos',
        endpoint: API_ENDPOINTS.VENUES.FAVORITES,
        method: 'get',
        query: pagination as Record<string, unknown>,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar venues favoritos');
    } catch (error) {
      console.error('VenuesService.getFavoriteVenues error:', error);
      throw error;
    }
  }

  /**
   * Agregar venue a favoritos
   */
  async addToFavorites(venueId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        body: { venueId },
        customDefaultErrorMessage: 'Error al agregar a favoritos',
        endpoint: API_ENDPOINTS.VENUES.ADD_FAVORITE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al agregar a favoritos');
      }
    } catch (error) {
      console.error('VenuesService.addToFavorites error:', error);
      throw error;
    }
  }

  /**
   * Remover venue de favoritos
   */
  async removeFromFavorites(venueId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        customDefaultErrorMessage: 'Error al remover de favoritos',
        endpoint: API_ENDPOINTS.VENUES.REMOVE_FAVORITE(venueId),
        method: 'delete',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al remover de favoritos');
      }
    } catch (error) {
      console.error('VenuesService.removeFromFavorites error:', error);
      throw error;
    }
  }

  /**
   * Verificar si un venue está en favoritos
   */
  async isFavorite(venueId: string): Promise<boolean> {
    try {
      const response = await handleRequest<ApiResponse<{ isFavorite: boolean }>>({
        customDefaultErrorMessage: 'Error al verificar favorito',
        endpoint: API_ENDPOINTS.VENUES.IS_FAVORITE(venueId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data.isFavorite;
      }
      return false;
    } catch (error) {
      console.error('VenuesService.isFavorite error:', error);
      return false; // En caso de error, asumir que no es favorito
    }
  }
}

export const venuesService = new VenuesService();
export default venuesService;
