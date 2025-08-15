import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CreateReservationData,
  PaginationParams,
  Reservation,
  ReservationFilters,
  ReservationStatus,
} from '@shared/types';
import { reservationsService } from '@libs/services';

export interface ReservationsState {
  reservations: Reservation[];
  upcomingReservations: Reservation[];
  pastReservations: Reservation[];
  selectedReservation: Reservation | null;
  filters: ReservationFilters;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isCancelling: boolean;
  isCheckingIn: boolean;
  isCheckingOut: boolean;
  error: string | null;
  availability: { available: boolean; message?: string } | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Async Thunks
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (
    params: {
      filters?: ReservationFilters;
      pagination?: PaginationParams;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await reservationsService.getReservations(params.filters, params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar reservaciones';
      return rejectWithValue(message);
    }
  }
);

export const fetchMyReservations = createAsyncThunk(
  'reservations/fetchMyReservations',
  async (
    params: {
      filters?: Partial<ReservationFilters>;
      pagination?: PaginationParams;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await reservationsService.getMyReservations(
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar mis reservaciones';
      return rejectWithValue(message);
    }
  }
);

export const fetchUpcomingReservations = createAsyncThunk(
  'reservations/fetchUpcomingReservations',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await reservationsService.getUpcomingReservations(pagination);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar reservaciones próximas';
      return rejectWithValue(message);
    }
  }
);

export const fetchReservationHistory = createAsyncThunk(
  'reservations/fetchReservationHistory',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await reservationsService.getReservationHistory(pagination);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar historial de reservaciones';
      return rejectWithValue(message);
    }
  }
);

export const fetchReservationDetails = createAsyncThunk(
  'reservations/fetchReservationDetails',
  async (reservationId: string, { rejectWithValue }) => {
    try {
      const reservation = await reservationsService.getReservationDetails(reservationId);
      return reservation;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar detalles de la reservación';
      return rejectWithValue(message);
    }
  }
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData: CreateReservationData, { rejectWithValue }) => {
    try {
      const reservation = await reservationsService.createReservation(reservationData);
      return reservation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear reservación';
      return rejectWithValue(message);
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async (
    params: {
      reservationId: string;
      updateData: Partial<CreateReservationData>;
    },
    { rejectWithValue }
  ) => {
    try {
      const reservation = await reservationsService.updateReservation(
        params.reservationId,
        params.updateData
      );
      return reservation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar reservación';
      return rejectWithValue(message);
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (params: { reservationId: string; reason?: string }, { rejectWithValue }) => {
    try {
      const reservation = await reservationsService.cancelReservation(
        params.reservationId,
        params.reason
      );
      return reservation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cancelar reservación';
      return rejectWithValue(message);
    }
  }
);

export const checkinReservation = createAsyncThunk(
  'reservations/checkinReservation',
  async (reservationId: string, { rejectWithValue }) => {
    try {
      const reservation = await reservationsService.checkinReservation(reservationId);
      return reservation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al realizar check-in';
      return rejectWithValue(message);
    }
  }
);

export const checkoutReservation = createAsyncThunk(
  'reservations/checkoutReservation',
  async (reservationId: string, { rejectWithValue }) => {
    try {
      const reservation = await reservationsService.checkoutReservation(reservationId);
      return reservation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al realizar check-out';
      return rejectWithValue(message);
    }
  }
);

export const checkAvailability = createAsyncThunk(
  'reservations/checkAvailability',
  async (
    checkData: {
      serviceId: string;
      date: string;
      startTime: string;
      endTime?: string;
      capacity?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const availability = await reservationsService.checkAvailability(checkData);
      return availability;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al verificar disponibilidad';
      return rejectWithValue(message);
    }
  }
);

export const fetchReservationsByStatus = createAsyncThunk(
  'reservations/fetchReservationsByStatus',
  async (
    params: { status: ReservationStatus; pagination?: PaginationParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await reservationsService.getReservationsByStatus(
        params.status,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar reservaciones por estado';
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState: ReservationsState = {
  availability: null,
  error: null,
  filters: {
    dateFrom: undefined,
    dateTo: undefined,
    includeDetails: true,
    search: undefined,
    serviceId: undefined,
    status: undefined,
    userId: undefined,
    venueId: undefined,
  },
  isCancelling: false,
  isCheckingIn: false,
  isCheckingOut: false,
  isCreating: false,
  isLoading: false,
  isUpdating: false,
  pagination: {
    hasMore: false,
    limit: 10,
    page: 1,
    total: 0,
  },
  pastReservations: [],
  reservations: [],
  selectedReservation: null,
  upcomingReservations: [],
};

// Slice
const reservationsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Reservations
      .addCase(fetchReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch My Reservations
      .addCase(fetchMyReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchMyReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Upcoming Reservations
      .addCase(fetchUpcomingReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingReservations = action.payload.data;
      })
      .addCase(fetchUpcomingReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Reservation History
      .addCase(fetchReservationHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservationHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastReservations = action.payload.data;
      })
      .addCase(fetchReservationHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Reservation Details
      .addCase(fetchReservationDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReservationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedReservation = action.payload;
      })
      .addCase(fetchReservationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Reservation
      .addCase(createReservation.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isCreating = false;
        state.reservations.unshift(action.payload);
        state.selectedReservation = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      // Update Reservation
      .addCase(updateReservation.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
        if (state.selectedReservation?.id === action.payload.id) {
          state.selectedReservation = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      // Cancel Reservation
      .addCase(cancelReservation.pending, (state) => {
        state.isCancelling = true;
        state.error = null;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.isCancelling = false;
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
        if (state.selectedReservation?.id === action.payload.id) {
          state.selectedReservation = action.payload;
        }
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.isCancelling = false;
        state.error = action.payload as string;
      })
      // Checkin Reservation
      .addCase(checkinReservation.pending, (state) => {
        state.isCheckingIn = true;
        state.error = null;
      })
      .addCase(checkinReservation.fulfilled, (state, action) => {
        state.isCheckingIn = false;
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
        if (state.selectedReservation?.id === action.payload.id) {
          state.selectedReservation = action.payload;
        }
      })
      .addCase(checkinReservation.rejected, (state, action) => {
        state.isCheckingIn = false;
        state.error = action.payload as string;
      })
      // Checkout Reservation
      .addCase(checkoutReservation.pending, (state) => {
        state.isCheckingOut = true;
        state.error = null;
      })
      .addCase(checkoutReservation.fulfilled, (state, action) => {
        state.isCheckingOut = false;
        const index = state.reservations.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
        if (state.selectedReservation?.id === action.payload.id) {
          state.selectedReservation = action.payload;
        }
      })
      .addCase(checkoutReservation.rejected, (state, action) => {
        state.isCheckingOut = false;
        state.error = action.payload as string;
      })
      // Check Availability
      .addCase(checkAvailability.pending, (state) => {
        state.isLoading = true;
        state.availability = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availability = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.availability = {
          available: false,
          message: action.payload as string,
        };
      })
      // Fetch Reservations by Status
      .addCase(fetchReservationsByStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservationsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchReservationsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  initialState,
  name: 'reservations',
  reducers: {
    clearAvailability: (state) => {
      state.availability = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.selectedReservation = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ReservationFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  clearAvailability,
  clearError,
  clearFilters,
  setLoading,
  setSelectedReservation,
  updateFilters,
} = reservationsSlice.actions;

// Selectors
export const selectReservations = (state: { reservations: ReservationsState }) =>
  state.reservations;
export const selectReservationsList = (state: { reservations: ReservationsState }) =>
  state.reservations.reservations;
export const selectUpcomingReservations = (state: { reservations: ReservationsState }) =>
  state.reservations.upcomingReservations;
export const selectPastReservations = (state: { reservations: ReservationsState }) =>
  state.reservations.pastReservations;
export const selectSelectedReservation = (state: { reservations: ReservationsState }) =>
  state.reservations.selectedReservation;
export const selectReservationsLoading = (state: { reservations: ReservationsState }) =>
  state.reservations.isLoading;
export const selectReservationsCreating = (state: { reservations: ReservationsState }) =>
  state.reservations.isCreating;
export const selectReservationsUpdating = (state: { reservations: ReservationsState }) =>
  state.reservations.isUpdating;
export const selectReservationsCancelling = (state: { reservations: ReservationsState }) =>
  state.reservations.isCancelling;
export const selectReservationsError = (state: { reservations: ReservationsState }) =>
  state.reservations.error;
export const selectReservationsFilters = (state: { reservations: ReservationsState }) =>
  state.reservations.filters;
export const selectReservationsPagination = (state: { reservations: ReservationsState }) =>
  state.reservations.pagination;
export const selectAvailability = (state: { reservations: ReservationsState }) =>
  state.reservations.availability;

export { reservationsSlice };
export default reservationsSlice.reducer;
