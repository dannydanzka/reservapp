import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from '../state/slices/authSlice';
import { dashboardReducer } from '../state/slices/dashboardSlice';
import { notificationsReducer, notificationsSlice } from '../state/slices/notificationsSlice';
import { reservationReducer, reservationSlice } from '../state/slices/reservationSlice';
import { reservationsReducer, reservationsSlice } from '../state/slices/reservationsSlice';
import { servicesReducer, servicesSlice } from '../state/slices/servicesSlice';
import { venuesReducer, venuesSlice } from '../state/slices/venuesSlice';

// Configuración de persistencia para diferentes slices
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'isAuthenticated', 'lastLogin'],
};

const reservationsPersistConfig = {
  key: 'reservations',
  storage: AsyncStorage,
  whitelist: ['draftReservation'],
};

const venuesPersistConfig = {
  key: 'venues',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

const reservationPersistConfig = {
  key: 'reservation',
  storage: AsyncStorage,
  whitelist: ['currentReservation'],
};

// Root reducer combinando todos los slices
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  dashboard: dashboardReducer,
  notifications: notificationsReducer,
  reservation: persistReducer(reservationPersistConfig, reservationReducer),
  reservations: persistReducer(reservationsPersistConfig, reservationsReducer),
  services: servicesReducer,
  venues: persistReducer(venuesPersistConfig, venuesReducer),
});

// Configuración del store
export const store = configureStore({
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: rootReducer, // Solo en desarrollo
});

export const persistor = persistStore(store);

// Types para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Selectors helpers
export const useAppDispatch = () => store.dispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  selector(store.getState());
