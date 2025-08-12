import { AuthToken, CreateUserData, UpdateUserData, User } from '../entities';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: AuthToken;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  logout(): Promise<void>;
  forgotPassword(data: ForgotPasswordData): Promise<{ message: string }>;
  resetPassword(data: ResetPasswordData): Promise<{ message: string }>;
  changePassword(data: ChangePasswordData): Promise<{ message: string }>;
  refreshToken(refreshToken: string): Promise<AuthToken>;
  validateToken(token: string): Promise<boolean>;
}

export interface UserRepository {
  getProfile(): Promise<User>;
  updateProfile(data: UpdateUserData): Promise<User>;
  createUser(data: CreateUserData): Promise<User>;
  deleteAccount(): Promise<void>;
}
