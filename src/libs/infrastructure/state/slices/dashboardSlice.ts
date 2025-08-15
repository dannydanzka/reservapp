import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import authService from '../../services/core/auth/authService';

export interface DashboardData {
  statistics: {
    totalReservations: number;
    upcomingReservations: number;
    completedReservations: number;
    favoriteVenues: number;
    totalSpent: string;
    unreadNotifications: number;
  };
  recentReservations: any[];
  favoriteVenues: any[];
  nextReservation: any | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: DashboardState = {
  data: null,
  error: null,
  isLoading: false,
  lastUpdated: null,
};

// Async Thunk para obtener dashboard
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getDashboard();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar dashboard';
      return rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  initialState,
  name: 'dashboard',
  reducers: {
    clearDashboard: (state) => {
      state.data = null;
      state.error = null;
      state.lastUpdated = null;
    },
    updateDashboardStats: (state, action: PayloadAction<Partial<DashboardData['statistics']>>) => {
      if (state.data) {
        state.data.statistics = { ...state.data.statistics, ...action.payload };
      }
    },
  },
});

export const { clearDashboard, updateDashboardStats } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
