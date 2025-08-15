import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../../libs/infrastructure/store/store';

// Base selectors
const selectReservationsState = (state: RootState) => state.reservations;
const selectVenuesState = (state: RootState) => state.venues;
const selectAuthState = (state: RootState) => state.auth;
const selectDashboardState = (state: RootState) => state.dashboard;

// User selector
export const selectUser = createSelector([selectAuthState], (auth) => auth.user);

// Reservations selectors
export const selectReservations = createSelector(
  [selectReservationsState],
  (reservations) => reservations.reservations
);

export const selectUpcomingReservations = createSelector(
  [selectReservationsState],
  (reservations) => reservations.upcomingReservations
);

export const selectReservationsLoading = createSelector(
  [selectReservationsState],
  (reservations) => reservations.isLoading
);

export const selectReservationsError = createSelector(
  [selectReservationsState],
  (reservations) => reservations.error
);

// Venues selectors
export const selectPopularVenues = createSelector(
  [selectVenuesState],
  (venues) => venues.popularVenues
);

export const selectFavoriteVenues = createSelector(
  [selectVenuesState],
  (venues) => venues.favoriteVenues
);

export const selectVenuesLoading = createSelector(
  [selectVenuesState],
  (venues) => venues.isLoading
);

export const selectVenuesError = createSelector([selectVenuesState], (venues) => venues.error);

// Dashboard loading selector
export const selectDashboardLoading = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.isLoading
);

// Combined loading state
export const selectHomeLoading = createSelector(
  [selectReservationsLoading, selectVenuesLoading, selectDashboardLoading],
  (reservationsLoading, venuesLoading, dashboardLoading) =>
    reservationsLoading || venuesLoading || dashboardLoading
);

// Dashboard error selector
export const selectDashboardError = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.error
);

// Combined error state
export const selectHomeError = createSelector(
  [selectReservationsError, selectVenuesError, selectDashboardError],
  (reservationsError, venuesError, dashboardError) =>
    reservationsError || venuesError || dashboardError
);

// Dashboard stats selector
export const selectDashboardStats = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.statistics
);

// Home stats - memoized calculation with dashboard priority
export const selectHomeStats = createSelector(
  [selectDashboardStats, selectReservations, selectUpcomingReservations, selectFavoriteVenues],
  (dashboardStats, reservations, upcomingReservations, favoriteVenues) => {
    // Use dashboard stats if available, otherwise fallback to slice data
    if (dashboardStats) {
      return {
        completed: dashboardStats.completedReservations || 0,
        favorites: dashboardStats.favoriteVenues || 0,
        total: dashboardStats.totalReservations || 0,
        upcoming: dashboardStats.upcomingReservations || 0,
      };
    }

    // Fallback to existing calculation
    const total = reservations?.length || 0;
    const upcoming = upcomingReservations?.length || 0;
    const completed = reservations?.filter((r) => r.status === 'COMPLETED').length || 0;
    const favorites = favoriteVenues?.length || 0;

    return {
      completed,
      favorites,
      total,
      upcoming,
    };
  }
);

// Top recommendations - memoized
export const selectTopRecommendations = createSelector([selectPopularVenues], (popularVenues) =>
  (popularVenues || []).slice(0, 3)
);

// Favorite recommendations - memoized
export const selectFavoriteRecommendations = createSelector(
  [selectFavoriteVenues],
  (favoriteVenues) => (favoriteVenues || []).slice(0, 2)
);

// Dashboard user selector
export const selectDashboardUser = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.user
);

// Dashboard data selectors
export const selectDashboardRecentReservations = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.recentReservations || []
);

export const selectDashboardFavoriteVenues = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.favoriteVenues || []
);

export const selectDashboardNextReservation = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.nextReservation
);

// Dashboard total spent selector
export const selectDashboardTotalSpent = createSelector([selectDashboardState], (dashboard) => {
  const amount = dashboard.data?.statistics?.totalSpent;
  if (!amount) return '$0 MXN';

  // Si ya viene formateado, devolverlo tal cual
  if (typeof amount === 'string' && amount.includes('$')) {
    return amount;
  }

  // Si es un número, formatearlo a pesos mexicanos
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('es-MX', {
    currency: 'MXN',
    style: 'currency',
  }).format(numericAmount || 0);
});

// Dashboard unread notifications selector
export const selectDashboardUnreadNotifications = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data?.statistics?.unreadNotifications || 0
);

// User greeting - memoized with dashboard priority
export const selectUserGreeting = createSelector(
  [selectDashboardUser, selectUser],
  (dashboardUser, authUser) => {
    const user = dashboardUser || authUser;
    const firstName = user?.firstName;
    const isPremium = user?.isPremium;

    if (firstName) {
      return isPremium ? `¡Hola, ${firstName}! 👋 ✨` : `¡Hola, ${firstName}! 👋`;
    }

    return isPremium ? '¡Hola! 👋 ✨' : '¡Hola! 👋';
  }
);

// Check if user has data - memoized
export const selectHasUserData = createSelector(
  [selectReservations, selectFavoriteVenues],
  (reservations, favoriteVenues) => {
    return (reservations?.length || 0) > 0 || (favoriteVenues?.length || 0) > 0;
  }
);
