import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  venueId: string;
  venueName: string;
  duration: number; // en horas
  basePrice: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  includes: string[];
  restrictions: string[];
  availableDays: string[]; // ['monday', 'tuesday', etc.]
  availableTimeSlots: string[];
  isPopular: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  promotions?: ServicePromotion[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicePromotion {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: string;
  validUntil: string;
  conditions: string[];
  isActive: boolean;
}

export interface ServicesState {
  services: Service[];
  popularServices: Service[];
  servicesByCategory: { [category: string]: Service[] };
  selectedService: Service | null;
  searchQuery: string;
  selectedCategory: string | null;
  filters: ServiceFilters;
  isLoading: boolean;
  error: string | null;
}

export interface ServiceFilters {
  priceRange: {
    min: number;
    max: number;
  };
  duration: number | null;
  maxGuests: number | null;
  amenities: string[];
  rating: number | null;
  hasPromotions: boolean;
  availableDate: string | null;
}

// Async Thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (params: {
    category?: string;
    search?: string;
    filters?: Partial<ServiceFilters>;
    venueId?: string;
  } = {}) => {
    // TODO: Implementar llamada a API real
    // return await serviceService.getServices(params);
    
    // Mock data
    const mockServices: Service[] = [
      {
        id: '1',
        name: 'Evento Premium',
        description: 'Servicio completo para eventos especiales con atención personalizada.',
        category: 'Eventos',
        venueId: 'venue1',
        venueName: 'Salón Elegante Vista',
        duration: 4,
        basePrice: 2500,
        maxGuests: 150,
        images: ['https://example.com/service1.jpg'],
        amenities: ['Meseros', 'DJ', 'Decoración', 'Fotografía'],
        includes: ['Setup completo', 'Limpieza', 'Coordinación'],
        restrictions: ['No mascotas', 'No fumar en interiores'],
        availableDays: ['friday', 'saturday', 'sunday'],
        availableTimeSlots: ['18:00', '19:00', '20:00'],
        isPopular: true,
        rating: 4.8,
        reviewsCount: 156,
        tags: ['Premium', 'Completo', 'Profesional'],
        promotions: [
          {
            id: 'promo1',
            title: '15% de descuento',
            description: 'Reserva con 30 días de anticipación',
            discountType: 'percentage',
            discountValue: 15,
            validFrom: '2025-01-01T00:00:00Z',
            validUntil: '2025-03-31T23:59:59Z',
            conditions: ['Mínimo 30 días de anticipación', 'Pago completo al reservar'],
            isActive: true
          }
        ],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2025-01-08T00:00:00Z'
      },
      {
        id: '2',
        name: 'Reunión Familiar',
        description: 'Espacio íntimo para reuniones familiares y celebraciones pequeñas.',
        category: 'Familiares',
        venueId: 'venue2',
        venueName: 'Terraza Jardín',
        duration: 3,
        basePrice: 1200,
        maxGuests: 50,
        images: ['https://example.com/service2.jpg'],
        amenities: ['Parrilla', 'Música ambiente', 'Vajilla'],
        includes: ['Mesa y sillas', 'Iluminación', 'Área de cocina'],
        restrictions: ['Máximo 50 personas', 'Terminar antes de 22:00'],
        availableDays: ['saturday', 'sunday'],
        availableTimeSlots: ['10:00', '14:00', '16:00'],
        isPopular: false,
        rating: 4.5,
        reviewsCount: 89,
        tags: ['Familiar', 'Íntimo', 'Jardín'],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Conferencia Empresarial',
        description: 'Sala equipada para presentaciones y reuniones de negocios.',
        category: 'Corporativos',
        venueId: 'venue3',
        venueName: 'Centro de Negocios',
        duration: 8,
        basePrice: 3500,
        maxGuests: 100,
        images: ['https://example.com/service3.jpg'],
        amenities: ['Proyector 4K', 'Sistema de audio', 'WiFi empresarial', 'Catering'],
        includes: ['Equipo audiovisual', 'Soporte técnico', 'Coffee breaks'],
        restrictions: ['Vestimenta formal', 'No comida externa'],
        availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        availableTimeSlots: ['08:00', '09:00', '14:00'],
        isPopular: true,
        rating: 4.9,
        reviewsCount: 203,
        tags: ['Corporativo', 'Profesional', 'Tecnología'],
        promotions: [
          {
            id: 'promo2',
            title: 'Paquete semanal',
            description: '20% descuento en reservas de toda la semana',
            discountType: 'percentage',
            discountValue: 20,
            validFrom: '2025-01-01T00:00:00Z',
            validUntil: '2025-06-30T23:59:59Z',
            conditions: ['Mínimo 5 días consecutivos', 'Una sola factura'],
            isActive: true
          }
        ],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2025-01-05T00:00:00Z'
      }
    ];

    return mockServices;
  }
);

export const fetchServiceDetails = createAsyncThunk(
  'services/fetchServiceDetails',
  async (serviceId: string) => {
    // TODO: Implementar llamada a API real
    // return await serviceService.getServiceDetails(serviceId);
    
    // Mock response - devolver uno de los servicios mock
    const mockService = {
      id: serviceId,
      name: 'Evento Premium',
      description: 'Servicio completo para eventos especiales...',
      // ... resto de propiedades mock
    } as Service;

    return mockService;
  }
);

export const fetchServiceAvailability = createAsyncThunk(
  'services/fetchServiceAvailability',
  async (params: { serviceId: string; date: string; month?: string }) => {
    // TODO: Implementar llamada a API real
    // return await serviceService.getServiceAvailability(params);
    
    // Mock response
    return {
      serviceId: params.serviceId,
      date: params.date,
      availableSlots: ['10:00', '14:00', '18:00'],
      bookedSlots: ['16:00', '20:00'],
      pricing: {
        basePrice: 2500,
        weekendSurcharge: 500,
        holidaySurcharge: 1000
      }
    };
  }
);

// Initial State
const initialState: ServicesState = {
  services: [],
  popularServices: [],
  servicesByCategory: {},
  selectedService: null,
  searchQuery: '',
  selectedCategory: null,
  filters: {
    priceRange: { min: 0, max: 50000 },
    duration: null,
    maxGuests: null,
    amenities: [],
    rating: null,
    hasPromotions: false,
    availableDate: null
  },
  isLoading: false,
  error: null
};

// Slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ServiceFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.selectedCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Organizar servicios por categoría
    categorizeServices: (state) => {
      state.servicesByCategory = state.services.reduce((acc, service) => {
        if (!acc[service.category]) {
          acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
      }, {} as { [category: string]: Service[] });
      
      // Servicios populares
      state.popularServices = state.services.filter(service => service.isPopular);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
        
        // Auto-categorizar servicios
        state.servicesByCategory = action.payload.reduce((acc, service) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push(service);
          return acc;
        }, {} as { [category: string]: Service[] });
        
        // Servicios populares
        state.popularServices = action.payload.filter(service => service.isPopular);
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar servicios';
      })
      // Fetch Service Details
      .addCase(fetchServiceDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar detalles del servicio';
      });
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedService,
  updateFilters,
  clearFilters,
  clearError,
  categorizeServices
} = servicesSlice.actions;

export { servicesSlice };
export default servicesSlice.reducer;