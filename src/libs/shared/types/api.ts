/**
 * API Types for ReservApp Mobile
 * Based on ReservApp-Web backend API structure
 */

// =============================================================================
// COMMON TYPES
// =============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasMore?: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

export type UserRole = 'USER' | 'MANAGER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  stripeCustomerId?: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  settings?: UserSettings;
}

export interface LoginCredentials {
  email: string;
  password: string;
  [key: string]: any;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role?: UserRole;
  [key: string]: any;
}

export interface LoginSession {
  token: string;
  user: User;
  expiresAt: string;
  refreshToken?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: any;
}

// =============================================================================
// USER SETTINGS TYPES
// =============================================================================

export interface UserSettings {
  id: string;
  userId: string;
  notifications: NotificationSettings;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  reservationUpdates: boolean;
  promotions: boolean;
}

export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
}

// =============================================================================
// VENUE TYPES
// =============================================================================

export type VenueType =
  | 'ACCOMMODATION'
  | 'RESTAURANT'
  | 'SPA'
  | 'TOUR_OPERATOR'
  | 'EVENT_CENTER'
  | 'ENTERTAINMENT';

export type VenueAmenity =
  | 'WIFI'
  | 'PARKING'
  | 'PAYMENT_CARDS'
  | 'SECURITY'
  | 'COFFEE'
  | 'AWARD_WINNING';

export interface Venue {
  id: string;
  name: string;
  description: string;
  type: VenueType;
  category: string;
  images: string[];
  imageUrl?: string; // For backward compatibility
  location: string; // String representation of address
  phone?: string; // Direct phone access
  email?: string; // Direct email access
  address: Address;
  contact: ContactInfo;
  amenities: VenueAmenity[];
  hours?: Record<string, string>; // Day -> Hours mapping
  rating: number;
  reviewCount: number;
  priceRange:
    | {
        min: number;
        max: number;
        currency: string;
      }
    | string; // Allow string for display (e.g., "$$")
  isActive: boolean;
  featured: boolean;
  isNew?: boolean; // New venue flag
  isFavorite?: boolean; // Client-side favorite status
  createdAt: string;
  updatedAt: string;
  services?: Service[];
  reviews?: Review[];
  stats?: VenueStats;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface VenueStats {
  totalReservations: number;
  averageRating: number;
  totalRevenue: number;
  occupancyRate: number;
}

export interface VenueFilters {
  category?: string;
  search?: string;
  city?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  featured?: boolean;
}

// =============================================================================
// SERVICE TYPES
// =============================================================================

export type ServiceType =
  | 'ACCOMMODATION'
  | 'DINING'
  | 'SPA_WELLNESS'
  | 'TOUR_EXPERIENCE'
  | 'EVENT_MEETING'
  | 'TRANSPORTATION'
  | 'ENTERTAINMENT';

export type ServiceCategory = ServiceType;

export interface Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  category: ServiceCategory;
  venueId: string;
  venue?: Venue;
  images: string[];
  basePrice: number; // For simplified pricing
  priceType?: 'PER_PERSON' | 'PER_GROUP' | 'FIXED';
  duration: number; // Duration in minutes for simplicity
  maxCapacity?: number; // Max capacity for simplicity
  price: {
    amount: number;
    currency: string;
    unit: 'per_person' | 'per_group' | 'per_hour' | 'per_day';
  };
  capacity: {
    min: number;
    max: number;
  };
  features: string[];
  includes: string[];
  excludes: string[];
  requirements: string[];
  cancellationPolicy: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isAvailable: boolean;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

export interface ServiceFilters {
  category?: string;
  venueId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  duration?: number;
  available?: boolean;
  type?: ServiceType;
}

export interface ServiceAvailability {
  serviceId: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  capacity: number;
  reserved: number;
  price?: number;
}

// =============================================================================
// RESERVATION TYPES
// =============================================================================

export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Reservation {
  id: string;
  userId: string;
  user?: User;
  venueId: string;
  venue?: Venue;
  serviceId: string;
  service?: Service;
  status: ReservationStatus;
  reservationReference: string;
  guestInfo: GuestInfo;
  dateTime: {
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
  };
  pricing: {
    basePrice: number;
    taxes: number;
    fees: number;
    discount: number;
    total: number;
    currency: string;
  };
  payment: {
    method: string;
    status: 'pending' | 'paid' | 'refunded' | 'failed';
    transactionId?: string;
    paidAt?: string;
  };
  specialRequests?: string;
  cancellationReason?: string;
  checkinAt?: string;
  checkoutAt?: string;
  createdAt: string;
  updatedAt: string;
  review?: Review;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface CreateReservationData {
  venueId: string;
  serviceId: string;
  dateTime: {
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
  };
  guestInfo: GuestInfo;
  specialRequests?: string;
  paymentMethodId?: string;
  [key: string]: any;
}

export interface ReservationFilters {
  userId?: string;
  venueId?: string;
  serviceId?: string;
  status?: ReservationStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  includeDetails?: boolean;
}

// =============================================================================
// NOTIFICATION TYPES
// =============================================================================

export type NotificationType =
  | 'RESERVATION_CONFIRMATION'
  | 'RESERVATION_CANCELLATION'
  | 'PAYMENT_CONFIRMATION'
  | 'CHECKIN_REMINDER'
  | 'SYSTEM_ALERT'
  | 'PROMOTION';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  metadata?: {
    reservationId?: string;
    paymentId?: string;
    venueId?: string;
    venueName?: string;
    amount?: number;
  };
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationFilters {
  page?: number;
  limit?: number;
  isRead?: boolean;
  type?: NotificationType;
}

// =============================================================================
// REVIEW TYPES
// =============================================================================

export interface Review {
  id: string;
  userId: string;
  user?: User;
  venueId?: string;
  venue?: Venue;
  serviceId?: string;
  service?: Service;
  reservationId?: string;
  reservation?: Reservation;
  rating: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  venueId?: string;
  serviceId?: string;
  reservationId?: string;
  rating: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
  images?: string[];
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number; // 1-5 stars
  };
}

// =============================================================================
// PAYMENT TYPES
// =============================================================================

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentConfirmation {
  paymentIntentId: string;
  paymentMethodId?: string;
  returnUrl?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR';

// =============================================================================
// QUERY TYPES
// =============================================================================

export interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
  page?: number;
  limit?: number;
}

export interface LocationParams {
  latitude: number;
  longitude: number;
  radius?: number; // in kilometers
}

// =============================================================================
// DASHBOARD/STATS TYPES
// =============================================================================

export interface DashboardStats {
  totalReservations: number;
  totalRevenue: number;
  totalUsers: number;
  totalVenues: number;
  averageRating: number;
  occupancyRate: number;
  revenueGrowth: number;
  reservationGrowth: number;
}
