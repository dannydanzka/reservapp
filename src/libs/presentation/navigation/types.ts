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
  ReservationFlow: { venueId: string; serviceId?: string };
  [key: string]: any;
}

export interface DrawerParamList {
  HomeTabs: undefined;
  Reservations: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
  [key: string]: any;
}

export interface TabParamList {
  Home: undefined;
  Discover: undefined;
  Reservations: undefined;
  Wallet: undefined;
  Profile: undefined;
  [key: string]: any;
}
