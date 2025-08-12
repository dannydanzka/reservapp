export interface Reservation {
  id: string;
  userId: string;
  venueId: string;
  serviceId: string;

  // Booking Details
  date: string;
  time: string;
  duration: number; // in minutes
  guests: number;

  // Guest Information
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;

  // Pricing
  basePrice: number;
  taxes: number;
  discounts: number;
  totalAmount: number;
  currency: string;

  // Payment
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentIntentId?: string;

  // Status
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  cancellationReason?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
}

export interface CreateReservationData {
  venueId: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
}

export interface UpdateReservationData {
  date?: string;
  time?: string;
  guests?: number;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  specialRequests?: string;
}

export interface ReservationFilters {
  status?: Reservation['status'][];
  dateFrom?: string;
  dateTo?: string;
  venueId?: string;
  serviceId?: string;
}

export interface ReservationSummary {
  id: string;
  venueName: string;
  serviceName: string;
  date: string;
  time: string;
  guests: number;
  status: Reservation['status'];
  totalAmount: number;
  currency: string;
}
