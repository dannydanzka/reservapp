import { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  AuthStack: undefined;
  MainDrawer: undefined;
  BookingFlow: undefined;
  VenueDetails: { venueId: string };
  ServiceDetails: { serviceId: string; venueId: string };
}

export interface MainStackParamList extends ParamListBase {
  TabNavigator: undefined;
  Profile: undefined;
  Settings: undefined;
}

export interface AuthStackParamList extends ParamListBase {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
}

export interface MainDrawerParamList extends ParamListBase {
  TabNavigator: undefined;
  Profile: undefined;
  Notifications: undefined;
  MyBookings: undefined;
  PaymentMethods: undefined;
  HelpSupport: undefined;
  About: undefined;
}

export interface TabParamList extends ParamListBase {
  Home: undefined;
  Services: undefined;
  Reservations: undefined;
  Wallet: undefined;
  Settings: undefined;
}

export interface DiscoverStackParamList extends ParamListBase {
  DiscoverHome: undefined;
  VenueList: { category?: string; location?: string };
  VenueDetails: { venueId: string };
  ServiceDetails: { serviceId: string; venueId: string };
}

export interface SearchStackParamList extends ParamListBase {
  SearchHome: undefined;
  SearchResults: { query: string; filters?: any };
  MapView: undefined;
}

export interface BookingFlowParamList extends ParamListBase {
  ServiceSelection: { venueId?: string };
  DateTimeSelection: undefined;
  GuestInfo: undefined;
  Payment: undefined;
  Confirmation: undefined;
}

// Navigation Props Types
export interface NavigationProps<T extends Record<string, object | undefined>> {
  navigation: any;
  route: { params: T[keyof T] };
}
