// Enums
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  TRIAL = 'trial',
  CANCELLED = 'cancelled',
}

export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error',
}

// Interfaces básicas - Usar índice para compatibilidad
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  subscriptionStatus?: SubscriptionStatus;
  permissions?: string[];
  avatar?: string;
  isActive: boolean;
  businessName?: string;
  phone?: string;
  address?: string;
  stripeCustomerId?: string;
  subscriptionId?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown; // Índice para compatibilidad
}

export interface LoginCredentials {
  email: string;
  password: string;
  [key: string]: unknown; // Índice para compatibilidad
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  businessName?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown; // Índice para compatibilidad
}

export interface LoginSession {
  token: string;
  user: User;
  expiresAt: string;
  refreshToken?: string;
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

// API Response
export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
  meta?: ApiMeta;
}

// Dashboard types
export interface DashboardStats {
  totalReservations: number;
  totalVenues: number;
  totalRevenue: number;
  averageStay: number;
}

export interface RecentBooking {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
}