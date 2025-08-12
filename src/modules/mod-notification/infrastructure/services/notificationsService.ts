import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  Notification,
  NotificationFilters,
  NotificationSettings,
  NotificationType,
  PaginatedResponse,
  PaginationParams,
} from '@shared/types';
import handleRequest from '@http/handleRequest.config';

class NotificationsService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Obtener lista de notificaciones con filtros opcionales
   */
  async getNotifications(
    filters?: NotificationFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const query = {
        ...filters,
        ...pagination,
      };

      const response = await handleRequest<ApiResponse<PaginatedResponse<Notification>>>({
        customDefaultErrorMessage: 'Error al cargar notificaciones',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.LIST,
        method: 'get',
        query,
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar notificaciones');
    } catch (error) {
      console.error('NotificationsService.getNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de una notificación específica
   */
  async getNotificationDetails(notificationId: string): Promise<Notification> {
    try {
      const response = await handleRequest<ApiResponse<Notification>>({
        customDefaultErrorMessage: 'Error al cargar detalles de la notificación',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.DETAILS(notificationId),
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al cargar detalles de la notificación');
    } catch (error) {
      console.error('NotificationsService.getNotificationDetails error:', error);
      throw error;
    }
  }

  /**
   * Marcar una notificación como leída
   */
  async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const response = await handleRequest<ApiResponse<Notification>>({
        customDefaultErrorMessage: 'Error al marcar notificación como leída',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId),
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al marcar notificación como leída');
    } catch (error) {
      console.error('NotificationsService.markAsRead error:', error);
      throw error;
    }
  }

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead(): Promise<{ count: number }> {
    try {
      const response = await handleRequest<ApiResponse<{ count: number }>>({
        customDefaultErrorMessage: 'Error al marcar todas las notificaciones como leídas',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al marcar todas las notificaciones como leídas');
    } catch (error) {
      console.error('NotificationsService.markAllAsRead error:', error);
      throw error;
    }
  }

  /**
   * Obtener contador de notificaciones no leídas
   */
  async getUnreadCount(): Promise<{ count: number }> {
    try {
      const response = await handleRequest<ApiResponse<{ count: number }>>({
        customDefaultErrorMessage: 'Error al obtener contador de notificaciones',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener contador de notificaciones');
    } catch (error) {
      console.error('NotificationsService.getUnreadCount error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones no leídas
   */
  async getUnreadNotifications(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const filters: NotificationFilters = {
        isRead: false,
        ...pagination,
      };

      return await this.getNotifications(filters, pagination);
    } catch (error) {
      console.error('NotificationsService.getUnreadNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones por tipo
   */
  async getNotificationsByType(
    type: NotificationType,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const filters: NotificationFilters = {
        type,
        ...pagination,
      };

      return await this.getNotifications(filters, pagination);
    } catch (error) {
      console.error('NotificationsService.getNotificationsByType error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones de confirmación de reservaciones
   */
  async getReservationNotifications(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const filters: NotificationFilters = {
        type: 'RESERVATION_CONFIRMATION',
        ...pagination,
      };

      return await this.getNotifications(filters, pagination);
    } catch (error) {
      console.error('NotificationsService.getReservationNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones de promociones
   */
  async getPromotionNotifications(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const filters: NotificationFilters = {
        type: 'PROMOTION',
        ...pagination,
      };

      return await this.getNotifications(filters, pagination);
    } catch (error) {
      console.error('NotificationsService.getPromotionNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones de alertas del sistema
   */
  async getSystemAlerts(pagination?: PaginationParams): Promise<PaginatedResponse<Notification>> {
    try {
      const filters: NotificationFilters = {
        type: 'SYSTEM_ALERT',
        ...pagination,
      };

      return await this.getNotifications(filters, pagination);
    } catch (error) {
      console.error('NotificationsService.getSystemAlerts error:', error);
      throw error;
    }
  }

  /**
   * Obtener notificaciones recientes (últimas 24 horas)
   */
  async getRecentNotifications(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Notification>> {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Como no tenemos filtro de fecha en NotificationFilters, obtenemos todas y filtramos en el cliente
      // En una implementación real, se agregaría dateFrom/dateTo a NotificationFilters
      const allNotifications = await this.getNotifications({}, pagination);

      if (allNotifications.data) {
        const recentNotifications = allNotifications.data.filter(
          (notification) => new Date(notification.createdAt) >= yesterday
        );

        return {
          ...allNotifications,
          data: recentNotifications,
          meta: {
            ...allNotifications.meta,
            total: recentNotifications.length,
            totalPages: Math.ceil(recentNotifications.length / (pagination?.limit || 10)),
          },
        };
      }

      return allNotifications;
    } catch (error) {
      console.error('NotificationsService.getRecentNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener configuración de notificaciones del usuario
   */
  async getNotificationSettings(): Promise<NotificationSettings> {
    try {
      const response = await handleRequest<ApiResponse<NotificationSettings>>({
        customDefaultErrorMessage: 'Error al obtener configuración de notificaciones',
        endpoint: API_ENDPOINTS.SETTINGS.NOTIFICATIONS,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener configuración de notificaciones');
    } catch (error) {
      console.error('NotificationsService.getNotificationSettings error:', error);
      throw error;
    }
  }

  /**
   * Actualizar configuración de notificaciones del usuario
   */
  async updateNotificationSettings(
    settings: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    try {
      const response = await handleRequest<ApiResponse<NotificationSettings>>({
        body: settings,
        customDefaultErrorMessage: 'Error al actualizar configuración de notificaciones',
        endpoint: API_ENDPOINTS.SETTINGS.NOTIFICATIONS,
        method: 'put',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar configuración de notificaciones');
    } catch (error) {
      console.error('NotificationsService.updateNotificationSettings error:', error);
      throw error;
    }
  }

  /**
   * Habilitar notificaciones push
   */
  async enablePushNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        push: true,
      });
    } catch (error) {
      console.error('NotificationsService.enablePushNotifications error:', error);
      throw error;
    }
  }

  /**
   * Deshabilitar notificaciones push
   */
  async disablePushNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        push: false,
      });
    } catch (error) {
      console.error('NotificationsService.disablePushNotifications error:', error);
      throw error;
    }
  }

  /**
   * Habilitar notificaciones por email
   */
  async enableEmailNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        email: true,
      });
    } catch (error) {
      console.error('NotificationsService.enableEmailNotifications error:', error);
      throw error;
    }
  }

  /**
   * Deshabilitar notificaciones por email
   */
  async disableEmailNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        email: false,
      });
    } catch (error) {
      console.error('NotificationsService.disableEmailNotifications error:', error);
      throw error;
    }
  }

  /**
   * Habilitar notificaciones de marketing/promociones
   */
  async enableMarketingNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        marketing: true,
        promotions: true,
      });
    } catch (error) {
      console.error('NotificationsService.enableMarketingNotifications error:', error);
      throw error;
    }
  }

  /**
   * Deshabilitar notificaciones de marketing/promociones
   */
  async disableMarketingNotifications(): Promise<NotificationSettings> {
    try {
      return await this.updateNotificationSettings({
        marketing: false,
        promotions: false,
      });
    } catch (error) {
      console.error('NotificationsService.disableMarketingNotifications error:', error);
      throw error;
    }
  }

  /**
   * Obtener resumen de notificaciones (contadores por tipo y estado)
   */
  async getNotificationsSummary(): Promise<{
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
  }> {
    try {
      // Como no tenemos endpoint específico para el resumen, construimos la información
      // desde los endpoints existentes
      const [unreadCount, allNotifications] = await Promise.all([
        this.getUnreadCount(),
        this.getNotifications({}, { limit: 100, page: 1 }), // Obtener una muestra grande
      ]);

      const byType: Record<NotificationType, number> = {
        CHECKIN_REMINDER: 0,
        PAYMENT_CONFIRMATION: 0,
        PROMOTION: 0,
        RESERVATION_CANCELLATION: 0,
        RESERVATION_CONFIRMATION: 0,
        SYSTEM_ALERT: 0,
      };

      allNotifications.data.forEach((notification) => {
        if (byType[notification.type] !== undefined) {
          byType[notification.type] += 1;
        }
      });

      return {
        byType,
        total: allNotifications.meta.total,
        unread: unreadCount.count,
      };
    } catch (error) {
      console.error('NotificationsService.getNotificationsSummary error:', error);
      return {
        byType: {
          CHECKIN_REMINDER: 0,
          PAYMENT_CONFIRMATION: 0,
          PROMOTION: 0,
          RESERVATION_CANCELLATION: 0,
          RESERVATION_CONFIRMATION: 0,
          SYSTEM_ALERT: 0,
        },
        total: 0,
        unread: 0,
      };
    }
  }
}

export const notificationsService = new NotificationsService();
export default notificationsService;
