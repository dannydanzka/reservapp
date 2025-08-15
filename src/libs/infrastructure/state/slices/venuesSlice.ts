import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LocationParams,
  PaginationParams,
  Review,
  ReviewStats,
  Venue,
  VenueFilters,
  VenueStats,
} from '@shared/types';

import venuesService from '../../../../modules/mod-profile/infrastructure/services/venuesService';

export interface VenuesState {
  venues: Venue[];
  featuredVenues: Venue[];
  nearbyVenues: Venue[];
  popularVenues: Venue[];
  favoriteVenues: Venue[];
  selectedVenue: Venue | null;
  searchQuery: string;
  selectedCategory: string | null;
  filters: VenueFilters;
  stats: VenueStats | null;
  reviews: Review[];
  reviewsStats: ReviewStats | null;
  isLoading: boolean;
  isLoadingDetails: boolean;
  isLoadingReviews: boolean;
  isLoadingFavorites: boolean;
  error: string | null;
  favoriteIds: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Async Thunks
export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (
    params: {
      filters?: VenueFilters;
      pagination?: PaginationParams;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await venuesService.getVenues(params.filters, params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar venues';
      return rejectWithValue(message);
    }
  }
);

export const fetchVenueDetails = createAsyncThunk(
  'venues/fetchVenueDetails',
  async (venueId: string, { rejectWithValue }) => {
    try {
      const venue = await venuesService.getVenueDetails(venueId);
      return venue;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar detalles del venue';
      return rejectWithValue(message);
    }
  }
);

export const fetchNearbyVenues = createAsyncThunk(
  'venues/fetchNearbyVenues',
  async (
    params: {
      location: LocationParams;
      filters?: Partial<VenueFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await venuesService.getNearbyVenues(
        params.location,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar venues cercanos';
      return rejectWithValue(message);
    }
  }
);

export const fetchPopularVenues = createAsyncThunk(
  'venues/fetchPopularVenues',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await venuesService.getPopularVenues(pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar venues populares';
      return rejectWithValue(message);
    }
  }
);

export const fetchVenuesStats = createAsyncThunk(
  'venues/fetchVenuesStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await venuesService.getVenuesStats();
      return stats;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar estadísticas';
      return rejectWithValue(message);
    }
  }
);

export const fetchVenueReviews = createAsyncThunk(
  'venues/fetchVenueReviews',
  async (params: { venueId: string; pagination?: PaginationParams }, { rejectWithValue }) => {
    try {
      const response = await venuesService.getVenueReviews(params.venueId, params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar reviews';
      return rejectWithValue(message);
    }
  }
);

export const fetchVenueReviewsStats = createAsyncThunk(
  'venues/fetchVenueReviewsStats',
  async (venueId: string, { rejectWithValue }) => {
    try {
      const stats = await venuesService.getVenueReviewsSummary(venueId);
      return stats;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar resumen de reviews';
      return rejectWithValue(message);
    }
  }
);

export const searchVenues = createAsyncThunk(
  'venues/searchVenues',
  async (
    params: {
      searchQuery: string;
      filters?: Partial<VenueFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await venuesService.searchVenues(
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

export const fetchVenuesByCategory = createAsyncThunk(
  'venues/fetchVenuesByCategory',
  async (
    params: {
      category: string;
      filters?: Partial<VenueFilters>;
      pagination?: PaginationParams;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await venuesService.getVenuesByCategory(
        params.category,
        params.filters,
        params.pagination
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cargar venues por categoría';
      return rejectWithValue(message);
    }
  }
);

export const fetchFavoriteVenues = createAsyncThunk(
  'venues/fetchFavoriteVenues',
  async (pagination: PaginationParams | undefined, { rejectWithValue }) => {
    try {
      const response = await venuesService.getFavoriteVenues(pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar venues favoritos';
      return rejectWithValue(message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'venues/addToFavorites',
  async (venueId: string, { rejectWithValue }) => {
    try {
      await venuesService.addToFavorites(venueId);
      return venueId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al agregar a favoritos';
      return rejectWithValue(message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'venues/removeFromFavorites',
  async (venueId: string, { rejectWithValue }) => {
    try {
      await venuesService.removeFromFavorites(venueId);
      return venueId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al remover de favoritos';
      return rejectWithValue(message);
    }
  }
);

export const checkIsFavorite = createAsyncThunk(
  'venues/checkIsFavorite',
  async (venueId: string, { rejectWithValue }) => {
    try {
      const isFavorite = await venuesService.isFavorite(venueId);
      return { isFavorite, venueId };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al verificar favorito';
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState: VenuesState = {
  error: null,
  favoriteIds: [],
  favoriteVenues: [],
  featuredVenues: [],
  filters: {
    category: undefined,
    city: undefined,
    featured: undefined,
    isActive: undefined,
    maxPrice: undefined,
    minPrice: undefined,
    rating: undefined,
    search: undefined,
  },
  isLoading: false,
  isLoadingDetails: false,
  isLoadingFavorites: false,
  isLoadingReviews: false,
  nearbyVenues: [],
  pagination: {
    hasMore: false,
    limit: 10,
    page: 1,
    total: 0,
  },
  popularVenues: [],
  reviews: [],
  reviewsStats: null,
  searchQuery: '',
  selectedCategory: null,
  selectedVenue: null,
  stats: null,
  venues: [],
};

// Slice
const venuesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Venues
      .addCase(fetchVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload.data || [];
        state.pagination = {
          hasMore: action.payload.meta?.hasMore || false,
          limit: action.payload.meta?.limit || 0 || 20,
          page: action.payload.meta?.page || 1,
          total: action.payload.meta?.total || 0,
        };
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Venue Details
      .addCase(fetchVenueDetails.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(fetchVenueDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.selectedVenue = action.payload;
      })
      .addCase(fetchVenueDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.error = action.payload as string;
      })
      // Fetch Nearby Venues
      .addCase(fetchNearbyVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nearbyVenues = action.payload.data || [];
      })
      .addCase(fetchNearbyVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Popular Venues
      .addCase(fetchPopularVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularVenues = action.payload.data || [];
      })
      .addCase(fetchPopularVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Venues Stats
      .addCase(fetchVenuesStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVenuesStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchVenuesStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Venue Reviews
      .addCase(fetchVenueReviews.pending, (state) => {
        state.isLoadingReviews = true;
      })
      .addCase(fetchVenueReviews.fulfilled, (state, action) => {
        state.isLoadingReviews = false;
        state.reviews = action.payload.data || [];
      })
      .addCase(fetchVenueReviews.rejected, (state, action) => {
        state.isLoadingReviews = false;
        state.error = action.payload as string;
      })
      // Fetch Venue Reviews Stats
      .addCase(fetchVenueReviewsStats.pending, (state) => {
        state.isLoadingReviews = true;
      })
      .addCase(fetchVenueReviewsStats.fulfilled, (state, action) => {
        state.isLoadingReviews = false;
        state.reviewsStats = action.payload;
      })
      .addCase(fetchVenueReviewsStats.rejected, (state, action) => {
        state.isLoadingReviews = false;
        state.error = action.payload as string;
      })
      // Search Venues
      .addCase(searchVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload.data || [];
        state.pagination = {
          hasMore: action.payload.meta?.hasMore || false,
          limit: action.payload.meta?.limit || 0 || 20,
          page: action.payload.meta?.page || 1,
          total: action.payload.meta?.total || 0,
        };
      })
      .addCase(searchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Venues by Category
      .addCase(fetchVenuesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenuesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload.data || [];
        state.pagination = {
          hasMore: action.payload.meta?.hasMore || false,
          limit: action.payload.meta?.limit || 0 || 20,
          page: action.payload.meta?.page || 1,
          total: action.payload.meta?.total || 0,
        };
      })
      .addCase(fetchVenuesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Favorite Venues
      .addCase(fetchFavoriteVenues.pending, (state) => {
        state.isLoadingFavorites = true;
        state.error = null;
      })
      .addCase(fetchFavoriteVenues.fulfilled, (state, action) => {
        state.isLoadingFavorites = false;
        state.favoriteVenues = action.payload.data || [];
        // Update favorite IDs array
        state.favoriteIds = (action.payload.data || []).map((venue) => venue.id);
      })
      .addCase(fetchFavoriteVenues.rejected, (state, action) => {
        state.isLoadingFavorites = false;
        state.error = action.payload as string;
      })
      // Add to Favorites
      .addCase(addToFavorites.pending, (state) => {
        state.isLoadingFavorites = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoadingFavorites = false;
        if (!state.favoriteIds.includes(action.payload)) {
          state.favoriteIds.push(action.payload);
        }
        // Update venue in lists if present
        [state.venues, state.featuredVenues, state.nearbyVenues, state.popularVenues].forEach(
          (venueList) => {
            const venue = venueList.find((v) => v.id === action.payload);
            if (venue) {
              venue.isFavorite = true;
            }
          }
        );
        // Update selected venue if it's the one being favorited
        if (state.selectedVenue && state.selectedVenue.id === action.payload) {
          state.selectedVenue.isFavorite = true;
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoadingFavorites = false;
        state.error = action.payload as string;
      })
      // Remove from Favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoadingFavorites = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoadingFavorites = false;
        state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
        // Remove from favorite venues list
        state.favoriteVenues = state.favoriteVenues.filter((venue) => venue.id !== action.payload);
        // Update venue in lists if present
        [state.venues, state.featuredVenues, state.nearbyVenues, state.popularVenues].forEach(
          (venueList) => {
            const venue = venueList.find((v) => v.id === action.payload);
            if (venue) {
              venue.isFavorite = false;
            }
          }
        );
        // Update selected venue if it's the one being unfavorited
        if (state.selectedVenue && state.selectedVenue.id === action.payload) {
          state.selectedVenue.isFavorite = false;
        }
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoadingFavorites = false;
        state.error = action.payload as string;
      })
      // Check Is Favorite
      .addCase(checkIsFavorite.fulfilled, (state, action) => {
        const { isFavorite, venueId } = action.payload;
        if (isFavorite) {
          if (!state.favoriteIds.includes(venueId)) {
            state.favoriteIds.push(venueId);
          }
        } else {
          state.favoriteIds = state.favoriteIds.filter((id) => id !== venueId);
        }
      });
  },
  initialState,
  name: 'venues',
  reducers: {
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
    setSelectedVenue: (state, action: PayloadAction<Venue | null>) => {
      state.selectedVenue = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<VenueFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  clearError,
  clearFilters,
  setSearchQuery,
  setSelectedCategory,
  setSelectedVenue,
  updateFilters,
} = venuesSlice.actions;

// Selectors
export const selectVenues = (state: { venues: VenuesState }) => state.venues;
export const selectVenuesList = (state: { venues: VenuesState }) => state.venues.venues;
export const selectFeaturedVenues = (state: { venues: VenuesState }) => state.venues.featuredVenues;
export const selectNearbyVenues = (state: { venues: VenuesState }) => state.venues.nearbyVenues;
export const selectPopularVenues = (state: { venues: VenuesState }) => state.venues.popularVenues;
export const selectSelectedVenue = (state: { venues: VenuesState }) => state.venues.selectedVenue;
export const selectVenuesLoading = (state: { venues: VenuesState }) => state.venues.isLoading;
export const selectVenuesDetailsLoading = (state: { venues: VenuesState }) =>
  state.venues.isLoadingDetails;
export const selectVenuesReviewsLoading = (state: { venues: VenuesState }) =>
  state.venues.isLoadingReviews;
export const selectVenuesError = (state: { venues: VenuesState }) => state.venues.error;
export const selectVenuesFilters = (state: { venues: VenuesState }) => state.venues.filters;
export const selectVenuesPagination = (state: { venues: VenuesState }) => state.venues.pagination;
export const selectVenuesStats = (state: { venues: VenuesState }) => state.venues.stats;
export const selectVenueReviews = (state: { venues: VenuesState }) => state.venues.reviews;
export const selectVenueReviewsStats = (state: { venues: VenuesState }) =>
  state.venues.reviewsStats;
export const selectFavoriteVenues = (state: { venues: VenuesState }) => state.venues.favoriteVenues;
export const selectFavoriteIds = (state: { venues: VenuesState }) => state.venues.favoriteIds;
export const selectIsLoadingFavorites = (state: { venues: VenuesState }) =>
  state.venues.isLoadingFavorites;

// Helper selector to check if a venue is favorite
export const selectIsVenueFavorite = (venueId: string) => (state: { venues: VenuesState }) =>
  state.venues.favoriteIds.includes(venueId);

export { venuesSlice };
export const venuesReducer = venuesSlice.reducer;
