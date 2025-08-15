import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  PaginationParams,
  Review,
  Service,
  ServiceAvailability,
  ServiceFilters,
  ServiceType,
} from '@shared/types';
import {
  servicesService,
  type ServiceStats,
} from '@modules/mod-services/infrastructure/services/servicesService';

export interface ServicesState {
  services: Service[];
  availableServices: Service[];
  popularServices: Service[];
  selectedService: Service | null;
  searchQuery: string;
  selectedCategory: string | null;
  filters: ServiceFilters;
  availability: ServiceAvailability | null;
  reviews: Review[];
  isLoading: boolean;
  isLoadingDetails: boolean;
  isLoadingReviews: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Async Thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (
    params: {
      filters?: ServiceFilters;
      pagination?: PaginationParams;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServices(params.filters, params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar servicios';
      return rejectWithValue(message);
    }
  }
);

export const fetchServiceDetails = createAsyncThunk(
  'services/fetchServiceDetails',
  async (serviceId: string, { rejectWithValue }) => {
    try {
      const service = await servicesService.getServiceDetails(serviceId);
      return service;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar detalles del servicio';
      return rejectWithValue(message);
    }
  }
);

export const fetchPopularServices = createAsyncThunk(
  'services/fetchPopularServices',
  async (pagination: PaginationParams | undefined = {}, { rejectWithValue }) => {
    try {
      const response = await servicesService.getPopularServices(pagination);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios populares';
      return rejectWithValue(message);
    }
  }
);

export const fetchAvailableServices = createAsyncThunk(
  'services/fetchAvailableServices',
  async (
    params: {
      date: string;
      filters?: ServiceFilters;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getAvailableServices(
        params.date,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios disponibles';
      return rejectWithValue(message);
    }
  }
);

export const searchServices = createAsyncThunk(
  'services/searchServices',
  async (
    params: {
      searchQuery: string;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.searchServices(
        params.searchQuery,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error en la búsqueda';
      return rejectWithValue(message);
    }
  }
);

export const fetchServicesByCategory = createAsyncThunk(
  'services/fetchServicesByCategory',
  async (
    params: {
      category: string;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServicesByCategory(
        params.category,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios por categoría';
      return rejectWithValue(message);
    }
  }
);

export const fetchServicesByType = createAsyncThunk(
  'services/fetchServicesByType',
  async (
    params: {
      type: ServiceType;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServices(
        { ...params.filters, type: params.type },
        params.pagination
      );
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar servicios por tipo';
      return rejectWithValue(message);
    }
  }
);

export const fetchVenueServices = createAsyncThunk(
  'services/fetchVenueServices',
  async (
    params: {
      venueId: string;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServicesByVenue(
        params.venueId,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios del venue';
      return rejectWithValue(message);
    }
  }
);

// Eliminar fetchAvailableServices - ya está implementado más arriba correctamente

export const fetchServicesByPriceRange = createAsyncThunk(
  'services/fetchServicesByPriceRange',
  async (
    params: {
      minPrice: number;
      maxPrice: number;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServices(
        { ...params.filters, maxPrice: params.maxPrice, minPrice: params.minPrice },
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios por rango de precio';
      return rejectWithValue(message);
    }
  }
);

export const fetchServicesByCapacity = createAsyncThunk(
  'services/fetchServicesByCapacity',
  async (
    params: {
      capacity: number;
      filters?: Partial<ServiceFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await servicesService.getServices(
        { ...params.filters, capacity: params.capacity },
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar servicios por capacidad';
      return rejectWithValue(message);
    }
  }
);

export const checkServiceAvailability = createAsyncThunk(
  'services/checkServiceAvailability',
  async (
    availabilityData: {
      serviceId: string;
      date: string;
      startTime: string;
      capacity: number;
      duration?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const availability = await servicesService.checkAvailability(
        availabilityData.serviceId,
        availabilityData.date,
        availabilityData.startTime,
        availabilityData.capacity,
        availabilityData.duration
      );
      return availability;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al verificar disponibilidad';
      return rejectWithValue(message);
    }
  }
);

// fetchServiceReviews removido - las reviews se obtienen con el servicio

export const fetchPublicServices = createAsyncThunk(
  'services/fetchPublicServices',
  async (filters: Partial<ServiceFilters> | undefined, { rejectWithValue }) => {
    try {
      const response = await servicesService.getPublicServices(filters);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar servicios públicos';
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState: ServicesState = {
  availability: null,
  availableServices: [],
  error: null,
  filters: {
    available: undefined,
    capacity: undefined,
    category: undefined,
    duration: undefined,
    maxPrice: undefined,
    minPrice: undefined,
    search: undefined,
    type: undefined,
    venueId: undefined,
  },
  isLoading: false,
  isLoadingDetails: false,
  isLoadingReviews: false,
  pagination: {
    hasMore: false,
    limit: 10,
    page: 1,
    total: 0,
  },
  popularServices: [],
  reviews: [],
  searchQuery: '',
  selectedCategory: null,
  selectedService: null,
  services: [],
};

// Slice
const servicesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Service Details
      .addCase(fetchServiceDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.error = action.payload as string;
      })
      // Fetch Popular Services
      .addCase(fetchPopularServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularServices = action.payload.data;
      })
      .addCase(fetchPopularServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Available Services
      .addCase(fetchAvailableServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableServices = action.payload.data;
      })
      .addCase(fetchAvailableServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Search Services
      .addCase(searchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check Service Availability
      .addCase(checkServiceAvailability.pending, (state) => {
        state.isLoading = true;
        state.availability = null;
      })
      .addCase(checkServiceAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        // Store the availability result - action.payload is { available: boolean, timeSlot?: TimeSlot }
      })
      .addCase(checkServiceAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Services by Category
      .addCase(fetchServicesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServicesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchServicesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Services by Type
      .addCase(fetchServicesByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServicesByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchServicesByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Venue Services
      .addCase(fetchVenueServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenueServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchVenueServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Public Services
      .addCase(fetchPublicServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
      })
      .addCase(fetchPublicServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Services by Price Range
      .addCase(fetchServicesByPriceRange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServicesByPriceRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchServicesByPriceRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Services by Capacity
      .addCase(fetchServicesByCapacity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServicesByCapacity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data;
        state.pagination = {
          hasMore: action.payload.meta.hasMore,
          limit: action.payload.meta.limit,
          page: action.payload.meta.page,
          total: action.payload.meta.total,
        };
      })
      .addCase(fetchServicesByCapacity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  initialState,
  name: 'services',
  reducers: {
    clearAvailability: (state) => {
      state.availability = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.selectedCategory = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ServiceFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  clearAvailability,
  clearError,
  clearFilters,
  setSearchQuery,
  setSelectedCategory,
  setSelectedService,
  updateFilters,
} = servicesSlice.actions;

// Selectors
export const selectServices = (state: { services: ServicesState }) => state.services;
export const selectServicesList = (state: { services: ServicesState }) => state.services.services;
export const selectPopularServices = (state: { services: ServicesState }) =>
  state.services.popularServices;
export const selectAvailableServices = (state: { services: ServicesState }) =>
  state.services.availableServices;
export const selectSelectedService = (state: { services: ServicesState }) =>
  state.services.selectedService;
export const selectServicesLoading = (state: { services: ServicesState }) =>
  state.services.isLoading;
export const selectServicesDetailsLoading = (state: { services: ServicesState }) =>
  state.services.isLoadingDetails;
export const selectServicesReviewsLoading = (state: { services: ServicesState }) =>
  state.services.isLoadingReviews;
export const selectServicesError = (state: { services: ServicesState }) => state.services.error;
export const selectServicesFilters = (state: { services: ServicesState }) => state.services.filters;
export const selectServicesPagination = (state: { services: ServicesState }) =>
  state.services.pagination;
export const selectServiceAvailability = (state: { services: ServicesState }) =>
  state.services.availability;
export const selectServiceReviews = (state: { services: ServicesState }) => state.services.reviews;

export { servicesSlice };
export default servicesSlice.reducer;
