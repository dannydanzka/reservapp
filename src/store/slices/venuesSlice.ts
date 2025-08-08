import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Types
export interface Venue {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  capacity: number;
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  availableTimeSlots: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VenuesState {
  venues: Venue[];
  featuredVenues: Venue[];
  selectedVenue: Venue | null;
  searchQuery: string;
  selectedCategory: string | null;
  filters: VenueFilters;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface VenueFilters {
  priceRange: {
    min: number;
    max: number;
  };
  capacity: number | null;
  amenities: string[];
  rating: number | null;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
}

// Async Thunks
export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    filters?: Partial<VenueFilters>;
  } = {}) => {
    // TODO: Implementar llamada a API real
    // const response = await venueService.getVenues(params);
    
    // Mock data para desarrollo
    const mockVenues: Venue[] = [
      {
        id: '1',
        name: 'Salón Elegante Vista',
        description: 'Hermoso salón con vista panorámica, perfecto para eventos especiales.',
        category: 'Salones de Eventos',
        images: ['https://example.com/venue1.jpg'],
        location: {
          address: 'Av. Revolución 1234, Col. Centro',
          city: 'Guadalajara, Jalisco',
          coordinates: { lat: 20.6597, lng: -103.3496 }
        },
        amenities: ['WiFi', 'Aire Acondicionado', 'Proyector', 'Sistema de Audio'],
        capacity: 150,
        pricePerHour: 2500,
        rating: 4.8,
        reviewsCount: 47,
        isAvailable: true,
        availableTimeSlots: ['09:00', '14:00', '18:00'],
        tags: ['Elegante', 'Vista', 'Eventos'],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Terraza Jardín Primavera',
        description: 'Terraza al aire libre rodeada de jardines, ideal para celebraciones.',
        category: 'Terrazas',
        images: ['https://example.com/venue2.jpg'],
        location: {
          address: 'Calle Primavera 567, Chapultepec',
          city: 'Guadalajara, Jalisco',
          coordinates: { lat: 20.6736, lng: -103.3370 }
        },
        amenities: ['Jardín', 'Parrilla', 'Pérgola', 'Iluminación'],
        capacity: 80,
        pricePerHour: 1800,
        rating: 4.6,
        reviewsCount: 32,
        isAvailable: true,
        availableTimeSlots: ['10:00', '15:00', '19:00'],
        tags: ['Jardín', 'Al aire libre', 'Celebraciones'],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    ];

    return {
      venues: mockVenues,
      pagination: {
        page: params.page || 1,
        limit: params.limit || 10,
        total: mockVenues.length,
        hasMore: false
      }
    };
  }
);

export const fetchVenueDetails = createAsyncThunk(
  'venues/fetchVenueDetails',
  async (venueId: string) => {
    // TODO: Implementar llamada a API real
    // return await venueService.getVenueDetails(venueId);
    
    // Mock data
    return {
      id: venueId,
      name: 'Salón Elegante Vista',
      description: 'Hermoso salón con vista panorámica...',
      // ... resto de propiedades mock
    } as Venue;
  }
);

// Initial State
const initialState: VenuesState = {
  venues: [],
  featuredVenues: [],
  selectedVenue: null,
  searchQuery: '',
  selectedCategory: null,
  filters: {
    priceRange: { min: 0, max: 10000 },
    capacity: null,
    amenities: [],
    rating: null,
    dateRange: { startDate: null, endDate: null }
  },
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false
  }
};

// Slice
const venuesSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedVenue: (state, action: PayloadAction<Venue | null>) => {
      state.selectedVenue = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<VenueFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.selectedCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Venues
      .addCase(fetchVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload.venues;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar venues';
      })
      // Fetch Venue Details
      .addCase(fetchVenueDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVenueDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedVenue = action.payload;
      })
      .addCase(fetchVenueDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar detalles del venue';
      });
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedVenue,
  updateFilters,
  clearFilters,
  clearError
} = venuesSlice.actions;

export { venuesSlice };
export default venuesSlice.reducer;