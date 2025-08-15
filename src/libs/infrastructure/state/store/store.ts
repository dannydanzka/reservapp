import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from '../slices/authSlice';
import { notificationsReducer, notificationsSlice } from '../slices/notificationsSlice';
import { reservationReducer, reservationSlice } from '../slices/reservationSlice';
import { reservationsReducer, reservationsSlice } from '../slices/reservationsSlice';
import { servicesReducer, servicesSlice } from '../slices/servicesSlice';
import { uiSlice } from '../slices/uiSlice';
import { venuesReducer, venuesSlice } from '../slices/venuesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'reservations', 'notifications'], // Persiste auth, reservations y notifications
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  notifications: notificationsReducer,
  reservation: reservationReducer,
  reservations: reservationsReducer,
  services: servicesReducer,
  ui: uiSlice.reducer,
  venues: venuesReducer,
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
