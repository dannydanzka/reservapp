// Navigation types para toda la aplicación

export interface RootStackParamList {
  Auth: undefined;
  Main: undefined;
  Splash: undefined;
  [key: string]: any;
}

export interface AuthStackParamList {
  Login: undefined;
  [key: string]: any;
}

export interface MainStackParamList {
  MainDrawer: undefined;
  VenueDetails: { venueId: string };
  ReservationDetails: { serviceId?: string; reservationId?: string };
  ReservationFlow: { venueId: string; serviceId?: string; service?: any };
  ServiceDetail: { serviceId: string };
  [key: string]: any;
}

export interface DrawerParamList {
  HomeTabs: undefined;
  Reservations: undefined;
  Notifications: undefined;
  Profile: undefined;
  Pagos: undefined;
  [key: string]: any;
}

export interface TabParamList {
  Home: undefined;
  Services: undefined;
  Reservations: undefined;
  Notifications: undefined;
  Payments: undefined;
  [key: string]: any;
}
