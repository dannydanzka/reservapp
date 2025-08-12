import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from '../slices/authSlice';
import { bookingSlice } from '../slices/bookingSlice';
import { uiSlice } from '../slices/uiSlice';
import notificationsSlice from '../slices/notificationsSlice';
import reservationsSlice from '../slices/reservationsSlice';
import servicesSlice from '../slices/servicesSlice';
import venuesSlice from '../slices/venuesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'reservations', 'notifications'], // Persiste auth, reservations y notifications
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  booking: bookingSlice.reducer,
  notifications: notificationsSlice,
  reservations: reservationsSlice,
  services: servicesSlice,
  ui: uiSlice.reducer,
  venues: venuesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
