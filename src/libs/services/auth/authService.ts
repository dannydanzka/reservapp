import handleRequest from '../config/handleRequest.config';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { 
  LoginCredentials, 
  RegisterData, 
  LoginSession, 
  User, 
  ApiResponse 
} from '../types/auth.types';
import { saveSession, saveAuthToken, getAuthToken, clearSession } from '../../core/utils/sessionStorage';

class AuthService {
  private baseUrl = API_CONFIG.BASE_URL;

  /**
   * Autenticar usuario con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<LoginSession> {
    try {
      const response = await handleRequest<ApiResponse<LoginSession>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.LOGIN,
        method: 'post',
        body: credentials,
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al iniciar sesión',
      });

      if (response.success && response.data) {
        // Guardar sesión en storage
        await saveSession(response.data.user);
        await saveAuthToken(response.data.token);
        
        return response.data;
      } else {
        throw new Error(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('AuthService.login error:', error);
      throw error;
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(userData: RegisterData): Promise<LoginSession> {
    try {
      const response = await handleRequest<ApiResponse<LoginSession>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.REGISTER,
        method: 'post',
        body: userData,
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al registrar usuario',
      });

      if (response.success && response.data) {
        // Guardar sesión en storage
        await saveSession(response.data.user);
        await saveAuthToken(response.data.token);
        
        return response.data;
      } else {
        throw new Error(response.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('AuthService.register error:', error);
      throw error;
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<User> {
    try {
      const response = await handleRequest<ApiResponse<User>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.PROFILE,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al obtener perfil',
      });

      if (response.success && response.data) {
        // Actualizar sesión en storage
        await saveSession(response.data);
        return response.data;
      } else {
        throw new Error(response.message || 'Error al obtener perfil');
      }
    } catch (error) {
      console.error('AuthService.getProfile error:', error);
      throw error;
    }
  }

  /**
   * Verificar si el token actual es válido
   */
  async verifyToken(): Promise<User> {
    try {
      const token = await getAuthToken();
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await handleRequest<ApiResponse<User>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.VERIFY_TOKEN,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Token inválido',
      });

      if (response.success && response.data) {
        // Actualizar sesión en storage
        await saveSession(response.data);
        return response.data;
      } else {
        throw new Error(response.message || 'Token inválido');
      }
    } catch (error) {
      console.error('AuthService.verifyToken error:', error);
      // Si el token no es válido, limpiamos la sesión
      await clearSession();
      throw error;
    }
  }

  /**
   * Refrescar token de autenticación
   */
  async refreshToken(): Promise<LoginSession> {
    try {
      const response = await handleRequest<ApiResponse<LoginSession>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.REFRESH,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: 'Error al refrescar token',
      });

      if (response.success && response.data) {
        // Actualizar tokens en storage
        await saveSession(response.data.user);
        await saveAuthToken(response.data.token);
        
        return response.data;
      } else {
        throw new Error(response.message || 'Error al refrescar token');
      }
    } catch (error) {
      console.error('AuthService.refreshToken error:', error);
      // Si no se puede refrescar, limpiamos la sesión
      await clearSession();
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      // Intentamos notificar al servidor (opcional)
      await handleRequest<ApiResponse<void>>({
        url: this.baseUrl,
        endpoint: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        customDefaultErrorMessage: false, // No mostrar error si falla
      }).catch(() => {
        // Ignoramos errores del logout en servidor
        console.log('Server logout failed, continuing with local logout');
      });

      // Siempre limpiamos la sesión local
      await clearSession();
    } catch (error) {
      console.error('AuthService.logout error:', error);
      // Siempre limpiamos la sesión aunque falle el servidor
      await clearSession();
    }
  }

  /**
   * Simular login para desarrollo (usando las credenciales demo)
   */
  async simulateLogin(credentials: LoginCredentials): Promise<LoginSession> {
    // Credenciales demo válidas
    const validCredentials = [
      { email: 'admin@reservapp.com', password: 'password123', role: 'admin', name: 'Administrador' },
      { email: 'manager@reservapp.com', password: 'password123', role: 'manager', name: 'Manager' },
      { email: 'employee@reservapp.com', password: 'password123', role: 'employee', name: 'Empleado' },
      { email: 'user@reservapp.com', password: 'password123', role: 'user', name: 'Usuario' },
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validCredential = validCredentials.find(
          cred => cred.email === credentials.email && cred.password === credentials.password
        );

        if (validCredential) {
          const mockUser: User = {
            id: Math.random().toString(),
            email: validCredential.email,
            name: validCredential.name,
            role: validCredential.role as any,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const mockSession: LoginSession = {
            token: 'demo_token_' + Math.random().toString(),
            user: mockUser,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
          };

          resolve(mockSession);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1500); // Simular delay de red
    });
  }
}

export const authService = new AuthService();
export default authService;