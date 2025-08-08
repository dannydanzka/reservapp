export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Reservation {
  id: string;
  userId: string;
  date: Date;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Reservations: undefined;
};

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}