import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  NotificationSettings,
  PaginatedResponse,
  PaginationParams,
  User,
  UserPreferences,
  UserSettings,
} from '@shared/types';
import { handleRequest } from '@http/handleRequest.config';

class UserService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de usuarios (requiere permisos administrativos)
   */
  async getUsers(pagination?: PaginationParams): Promise<PaginatedResponse<User>> {
    try {
      const response = await handleRequest<ApiResponse<PaginatedResponse<User>>>({
        customDefaultErrorMessage: 'Error al cargar usuarios',
        endpoint: API_ENDPOINTS.USERS.LIST,
        method: 'get',
        query: pagination as Record<string, unknown>,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar usuarios');
    } catch (error) {
      console.error('UserService.getUsers error:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo usuario (requiere permisos administrativos)
   */
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await handleRequest<ApiResponse<User>>({
        body: userData,
        customDefaultErrorMessage: 'Error al crear usuario',
        endpoint: API_ENDPOINTS.USERS.CREATE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al crear usuario');
    } catch (error) {
      console.error('UserService.createUser error:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de un usuario específico
   */
  async getUserDetails(userId: string): Promise<User> {
    try {
      const response = await handleRequest<ApiResponse<User>>({
        customDefaultErrorMessage: 'Error al cargar detalles del usuario',
        endpoint: API_ENDPOINTS.USERS.DETAILS(userId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar detalles del usuario');
    } catch (error) {
      console.error('UserService.getUserDetails error:', error);
      throw error;
    }
  }

  /**
   * Actualizar un usuario existente
   */
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await handleRequest<ApiResponse<User>>({
        body: userData,
        customDefaultErrorMessage: 'Error al actualizar usuario',
        endpoint: API_ENDPOINTS.USERS.UPDATE(userId),
        method: 'put',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar usuario');
    } catch (error) {
      console.error('UserService.updateUser error:', error);
      throw error;
    }
  }

  /**
   * Eliminar un usuario (requiere permisos administrativos)
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await handleRequest<ApiResponse<void>>({
        customDefaultErrorMessage: 'Error al eliminar usuario',
        endpoint: API_ENDPOINTS.USERS.DELETE(userId),
        method: 'delete',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (!response.success) {
        throw new Error(response.message || 'Error al eliminar usuario');
      }
    } catch (error) {
      console.error('UserService.deleteUser error:', error);
      throw error;
    }
  }

  /**
   * Actualizar perfil del usuario actual
   */
  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response = await handleRequest<ApiResponse<User>>({
        body: profileData,
        customDefaultErrorMessage: 'Error al actualizar perfil',
        endpoint: API_ENDPOINTS.SETTINGS.PROFILE,
        method: 'put',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar perfil');
    } catch (error) {
      console.error('UserService.updateProfile error:', error);
      throw error;
    }
  }

  /**
   * Obtener estado de suscripción del usuario
   */
  async getSubscriptionStatus(): Promise<{
    isSubscribed: boolean;
    plan: string;
    expiresAt?: string;
    features: string[];
  }> {
    try {
      const response = await handleRequest<
        ApiResponse<{
          isSubscribed: boolean;
          plan: string;
          expiresAt?: string;
          features: string[];
        }>
      >({
        customDefaultErrorMessage: 'Error al obtener estado de suscripción',
        endpoint: API_ENDPOINTS.USERS.SUBSCRIPTION_STATUS,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener estado de suscripción');
    } catch (error) {
      console.error('UserService.getSubscriptionStatus error:', error);
      throw error;
    }
  }

  /**
   * Actualizar suscripción del usuario
   */
  async upgradeSubscription(planData: { planId: string; paymentMethodId?: string }): Promise<{
    success: boolean;
    subscriptionId: string;
    paymentStatus: string;
  }> {
    try {
      const response = await handleRequest<
        ApiResponse<{
          success: boolean;
          subscriptionId: string;
          paymentStatus: string;
        }>
      >({
        body: planData,
        customDefaultErrorMessage: 'Error al actualizar suscripción',
        endpoint: API_ENDPOINTS.USERS.UPGRADE,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar suscripción');
    } catch (error) {
      console.error('UserService.upgradeSubscription error:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
