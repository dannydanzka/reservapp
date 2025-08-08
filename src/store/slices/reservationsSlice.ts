import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Types
export interface Reservation {
  id: string;
  userId: string;
  venueId: string;
  venueName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  duration: number; // en horas
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod: string;
  specialRequests: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  venueDetails: {
    address: string;
    images: string[];
    amenities: string[];
  };
  createdAt: string;
  updatedAt: string;
  cancellationReason?: string;
  rating?: number;
  review?: string;
}

export interface CreateReservationData {
  venueId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  duration: number;
  guests: number;
  specialRequests?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface ReservationsState {
  reservations: Reservation[];
  activeReservations: Reservation[];
  pastReservations: Reservation[];
  selectedReservation: Reservation | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  error: string | null;
  filters: {
    status: string[];
    dateRange: {
      startDate: string | null;
      endDate: string | null;
    };
  };
}

// Async Thunks
export const fetchUserReservations = createAsyncThunk(
  'reservations/fetchUserReservations',
  async (params: { userId: string; status?: string[] } = { userId: '' }) => {
    // TODO: Implementar llamada a API real
    // return await reservationService.getUserReservations(params);
    
    // Mock data
    const mockReservations: Reservation[] = [
      {
        id: '1',
        userId: 'user123',
        venueId: 'venue1',
        venueName: 'Salón Elegante Vista',
        serviceId: 'service1',
        serviceName: 'Evento Premium',
        date: '2025-01-20',
        timeSlot: '18:00',
        duration: 4,
        guests: 50,
        status: 'confirmed',
        totalAmount: 10000,
        paymentStatus: 'paid',
        paymentMethod: 'Tarjeta de Crédito',
        specialRequests: 'Mesa especial para pastel',
        customerInfo: {
          name: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '+52 33 1234 5678'
        },
        venueDetails: {
          address: 'Av. Revolución 1234',
          images: ['https://example.com/venue1.jpg'],
          amenities: ['WiFi', 'Aire Acondicionado']
        },
        createdAt: '2025-01-10T10:00:00Z',
        updatedAt: '2025-01-10T10:00:00Z'
      },
      {
        id: '2',
        userId: 'user123',
        venueId: 'venue2',
        venueName: 'Terraza Jardín',
        serviceId: 'service2',
        serviceName: 'Celebración Familiar',
        date: '2025-01-05',
        timeSlot: '15:00',
        duration: 3,
        guests: 25,
        status: 'completed',
        totalAmount: 5400,
        paymentStatus: 'paid',
        paymentMethod: 'Efectivo',
        specialRequests: '',
        customerInfo: {
          name: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '+52 33 1234 5678'
        },
        venueDetails: {
          address: 'Calle Primavera 567',
          images: ['https://example.com/venue2.jpg'],
          amenities: ['Jardín', 'Parrilla']
        },
        rating: 5,
        review: 'Excelente servicio, muy recomendado',
        createdAt: '2024-12-20T10:00:00Z',
        updatedAt: '2025-01-05T18:00:00Z'
      }
    ];

    return mockReservations;
  }
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData: CreateReservationData) => {
    // TODO: Implementar llamada a API real
    // return await reservationService.createReservation(reservationData);
    
    // Mock response
    const newReservation: Reservation = {
      id: Date.now().toString(),
      userId: 'user123',
      venueId: reservationData.venueId,
      serviceId: reservationData.serviceId,
      date: reservationData.date,
      time: reservationData.time,
      duration: reservationData.duration,
      guests: reservationData.guests,
      specialRequests: reservationData.specialRequests || '',
      venueName: 'Venue Mock',
      serviceName: 'Service Mock',
      status: 'pending',
      totalAmount: reservationData.duration * 2500,
      paymentStatus: 'pending',
      paymentMethod: '',
      venueDetails: {
        address: 'Dirección Mock',
        images: [],
        amenities: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return newReservation;
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async (params: { 
    reservationId: string; 
    updates: Partial<Reservation> 
  }) => {
    // TODO: Implementar llamada a API real
    // return await reservationService.updateReservation(params.reservationId, params.updates);
    
    // Mock response
    return { id: params.reservationId, ...params.updates };
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (params: { 
    reservationId: string; 
    reason: string 
  }) => {
    // TODO: Implementar llamada a API real
    // return await reservationService.cancelReservation(params.reservationId, params.reason);
    
    return {
      id: params.reservationId,
      status: 'cancelled' as const,
      cancellationReason: params.reason,
      updatedAt: new Date().toISOString()
    };
  }
);

export const rateReservation = createAsyncThunk(
  'reservations/rateReservation',
  async (params: {
    reservationId: string;
    rating: number;
    review?: string;
  }) => {
    // TODO: Implementar llamada a API real
    // return await reservationService.rateReservation(params);
    
    return {
      id: params.reservationId,
      rating: params.rating,
      review: params.review,
      updatedAt: new Date().toISOString()
    };
  }
);

// Initial State
const initialState: ReservationsState = {
  reservations: [],
  activeReservations: [],
  pastReservations: [],
  selectedReservation: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,
  filters: {
    status: [],
    dateRange: {
      startDate: null,
      endDate: null
    }
  }
};

// Slice
const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setSelectedReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.selectedReservation = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Separar reservaciones en activas y pasadas
    categorizeReservations: (state) => {
      const now = new Date().toISOString();
      state.activeReservations = state.reservations.filter(
        r => r.date >= now && ['pending', 'confirmed'].includes(r.status)
      );
      state.pastReservations = state.reservations.filter(
        r => r.date < now || ['cancelled', 'completed'].includes(r.status)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reservations
      .addCase(fetchUserReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
        // Auto-categorizar
        const now = new Date().toISOString();
        state.activeReservations = action.payload.filter(
          r => r.date >= now && ['pending', 'confirmed'].includes(r.status)
        );
        state.pastReservations = action.payload.filter(
          r => r.date < now || ['cancelled', 'completed'].includes(r.status)
        );
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar reservaciones';
      })
      // Create Reservation
      .addCase(createReservation.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isCreating = false;
        state.reservations.push(action.payload);
        // Recategorizar
        const now = new Date().toISOString();
        if (action.payload.date >= now && ['pending', 'confirmed'].includes(action.payload.status)) {
          state.activeReservations.push(action.payload);
        }
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || 'Error al crear reservación';
      })
      // Update Reservation
      .addCase(updateReservation.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = { ...state.reservations[index], ...action.payload };
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message || 'Error al actualizar reservación';
      })
      // Cancel Reservation
      .addCase(cancelReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = { ...state.reservations[index], ...action.payload };
        }
        // Remover de activas y agregar a pasadas
        state.activeReservations = state.activeReservations.filter(r => r.id !== action.payload.id);
      })
      // Rate Reservation
      .addCase(rateReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = { ...state.reservations[index], ...action.payload };
        }
      });
  }
});

export const {
  setSelectedReservation,
  updateFilters,
  clearFilters,
  clearError,
  categorizeReservations
} = reservationsSlice.actions;

export { reservationsSlice };
export default reservationsSlice.reducer;