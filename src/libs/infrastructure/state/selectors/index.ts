/**
 * Centralized selectors for easy component usage
 */
import { RootState } from '../store/store';

// Re-export all selectors from individual slices
export * from '../slices/authSlice';
export * from '../slices/venuesSlice';
export * from '../slices/servicesSlice';
export * from '../slices/bookingSlice';
export * from '../slices/uiSlice';

// Compound selectors that use multiple slices
export const selectCurrentVenueServices = (state: RootState) => {
  const selectedVenue = state.venues.selectedVenue;
  if (!selectedVenue) return [];
  
  return state.services.services.filter(
    service => service.venueId === selectedVenue.id
  );
};

export const selectVenuesWithFavoriteStatus = (state: RootState) => {
  const { venues, favoriteIds } = state.venues;
  
  return venues.map(venue => ({
    ...venue,
    isFavorite: favoriteIds.includes(venue.id)
  }));
};

export const selectServicesWithAvailability = (state: RootState) => {
  const { services, availability } = state.services;
  
  return services.map(service => ({
    ...service,
    availability: service.id === state.services.selectedService?.id ? availability : null
  }));
};

export const selectBookingFormData = (state: RootState) => {
  const { booking, services, venues } = state;
  
  return {
    selectedVenue: venues.selectedVenue,
    selectedService: services.selectedService,
    bookingData: booking
  };
};

export const selectDashboardData = (state: RootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    recentReservations: state.reservations.items.slice(0, 3),
    favoriteVenues: state.venues.favoriteVenues.slice(0, 5),
    popularServices: state.services.popularServices.slice(0, 5),
    unreadNotifications: state.notifications.unreadCount,
    isLoading: state.auth.isLoading || state.reservations.isLoading
  };
};

// Type helpers for components
export type VenueWithFavoriteStatus = ReturnType<typeof selectVenuesWithFavoriteStatus>[0];
export type ServiceWithAvailability = ReturnType<typeof selectServicesWithAvailability>[0];
export type BookingFormData = ReturnType<typeof selectBookingFormData>;
export type DashboardData = ReturnType<typeof selectDashboardData>;