import { API_CONFIG, API_ENDPOINTS } from '@http/api.config';
import {
  ApiResponse,
  ChangePasswordData,
  LoginCredentials,
  LoginSession,
  RegisterData,
  User,
} from '@shared/types';
import { clearSession, getAuthToken, saveAuthToken, saveSession } from '@core/utils/sessionStorage';
import handleRequest from '@http/handleRequest.config';

class AuthService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Autenticar usuario con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<LoginSession> {
    try {
      const response = await handleRequest<ApiResponse<LoginSession>>({
        body: credentials,
        customDefaultErrorMessage: 'Error al iniciar sesión',
        endpoint: API_ENDPOINTS.AUTH.LOGIN,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        // Guardar sesión en storage
        await saveSession(response.data.user);
        await saveAuthToken(response.data.token);

        return response.data;
      }
      throw new Error(response.message || 'Error al iniciar sesión');
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
        body: userData,
        customDefaultErrorMessage: 'Error al registrar usuario',
        endpoint: API_ENDPOINTS.AUTH.REGISTER,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        // Guardar sesión en storage
        await saveSession(response.data.user);
        await saveAuthToken(response.data.token);

        return response.data;
      }
      throw new Error(response.message || 'Error al registrar usuario');
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
        customDefaultErrorMessage: 'Error al obtener perfil',
        endpoint: API_ENDPOINTS.AUTH.PROFILE,
        method: 'get',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl,
      });

      if (response.success && response.data) {
        // Actualizar sesión en storage
        await saveSession(response.data);
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener perfil');
    } catch (error) {
      console.error('AuthService.getProfile error:', error);
      throw error;
    }
  }

  /**
   * Verificar si el token actual es válido obteniendo el perfil
   */
  async verifyToken(): Promise<User> {
    try {
      const token = await getAuthToken();

      if (!token) {
        throw new Error('No token found');
      }

      // Usar getProfile como verificación de token (API real no tiene verify-token)
      return await this.getProfile();
    } catch (error) {
      console.error('AuthService.verifyToken error:', error);
      // Si el token no es válido, limpiamos la sesión
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
        customDefaultErrorMessage: false,
        endpoint: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'post',
        timeout: API_CONFIG.TIMEOUT,
        url: this.baseUrl, // No mostrar error si falla
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
      {
        email: 'admin@reservapp.com',
        name: 'Administrador',
        password: 'password123',
        role: 'admin',
      },
      {
        email: 'manager@reservapp.com',
        name: 'Manager',
        password: 'password123',
        role: 'manager',
      },
      {
        email: 'employee@reservapp.com',
        name: 'Empleado',
        password: 'password123',
        role: 'employee',
      },
      {
        email: 'user@reservapp.com',
        name: 'Usuario',
        password: 'password123',
        role: 'user',
      },
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validCredential = validCredentials.find(
          (cred) => cred.email === credentials.email && cred.password === credentials.password
        );

        if (validCredential) {
          const mockUser: User = {
            createdAt: new Date().toISOString(),
            email: validCredential.email,
            id: Math.random().toString(),
            isActive: true,
            name: validCredential.name,
            role: validCredential.role as User['role'],
            updatedAt: new Date().toISOString(),
          };

          const mockSession: LoginSession = {
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            token: `demo_token_${Math.random().toString()}`,
            user: mockUser, // 7 días
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
