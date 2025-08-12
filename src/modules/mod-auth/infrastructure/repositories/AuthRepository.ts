import {
  AuthRepository as IAuthRepository,
  UserRepository as IUserRepository,
} from '../../../../domains/auth/interfaces';
import {
  AuthToken,
  ChangePasswordData,
  CreateUserData,
  ForgotPasswordData,
  LoginCredentials,
  LoginResponse,
  ResetPasswordData,
  UpdateUserData,
  User,
} from '../../../../domains/auth/entities';
import authService from '../../services/domains/auth/authService';
import userService from '../../services/domains/user/userService';

class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await authService.login(credentials.email, credentials.password);
      return {
        token: {
          accessToken: response.token,
          expiresIn: response.expiresIn || 86400,
          tokenType: 'Bearer', // 24 hours default
        },
        user: response.user,
      };
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await authService.logout();
    } catch (error) {
      // Logout should not throw, just log the error
      console.warn('Logout warning:', error);
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    try {
      const response = await authService.forgotPassword(data.email);
      return {
        message: response.message || 'Password reset email sent successfully',
      };
    } catch (error) {
      throw new Error(
        `Forgot password failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    try {
      const response = await authService.resetPassword(data.token, data.newPassword);
      return { message: response.message || 'Password reset successfully' };
    } catch (error) {
      throw new Error(
        `Reset password failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    try {
      const response = await authService.changePassword(data.currentPassword, data.newPassword);
      return { message: response.message || 'Password changed successfully' };
    } catch (error) {
      throw new Error(
        `Change password failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    try {
      const response = await authService.refreshToken(refreshToken);
      return {
        accessToken: response.token,
        expiresIn: response.expiresIn || 86400,
        tokenType: 'Bearer',
      };
    } catch (error) {
      throw new Error(
        `Refresh token failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await authService.validateToken(token);
      return response.isValid || false;
    } catch (error) {
      console.warn('Token validation failed:', error);
      return false;
    }
  }
}

class UserRepository implements IUserRepository {
  async getProfile(): Promise<User> {
    try {
      const response = await userService.getProfile();
      return response;
    } catch (error) {
      throw new Error(
        `Get profile failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async updateProfile(data: UpdateUserData): Promise<User> {
    try {
      const response = await userService.updateProfile(data);
      return response;
    } catch (error) {
      throw new Error(
        `Update profile failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async createUser(data: CreateUserData): Promise<User> {
    try {
      const response = await userService.createUser(data);
      return response;
    } catch (error) {
      throw new Error(
        `Create user failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await userService.deleteAccount();
    } catch (error) {
      throw new Error(
        `Delete account failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// Export singleton instances
export const authRepository = new AuthRepository();
export const userRepository = new UserRepository();

export default authRepository;
