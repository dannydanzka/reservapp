export type RootStackParamList = {
  AuthStack: undefined;
  MainDrawer: undefined;
  BookingFlow: undefined;
  VenueDetails: { venueId: string };
  ServiceDetails: { serviceId: string; venueId: string };
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainDrawerParamList = {
  TabNavigator: undefined;
  Profile: undefined;
  Settings: undefined;
  MyBookings: undefined;
  PaymentMethods: undefined;
  HelpSupport: undefined;
  About: undefined;
};

export type TabParamList = {
  Discover: undefined;
  Search: undefined;
  Favorites: undefined;
  Bookings: undefined;
  Account: undefined;
};

export type DiscoverStackParamList = {
  DiscoverHome: undefined;
  VenueList: { category?: string; location?: string };
  VenueDetails: { venueId: string };
  ServiceDetails: { serviceId: string; venueId: string };
};

export type SearchStackParamList = {
  SearchHome: undefined;
  SearchResults: { query: string; filters?: any };
  MapView: undefined;
};

export type BookingFlowParamList = {
  ServiceSelection: { venueId?: string };
  DateTimeSelection: undefined;
  GuestInfo: undefined;
  Payment: undefined;
  Confirmation: undefined;
};

// Navigation Props Types
export type NavigationProps<T extends Record<string, object | undefined>> = {
  navigation: any;
  route: { params: T[keyof T] };
};