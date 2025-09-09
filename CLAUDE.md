# CLAUDE.md

**Autor**: Roberto Ramirez (danny.danzka21@gmail.com)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Contexto del Proyecto ReservApp

**ReservApp** es una plataforma integral de reservaciones que conecta pequeños hoteles y venues de servicios con huéspedes premium. Es el **ecosistema estratégico completo** que va más allá de las reservas tradicionales, ofreciendo comisiones ultra-competitivas (5% vs 15-25% competencia), pagos semanales automáticos y herramientas de gestión empresarial avanzadas.

### 📱 App Móvil en Desarrollo
Esta es la **aplicación móvil nativa React Native** del ecosistema ReservApp, diseñada para usuarios finales que buscan experiencias auténticas y reservas instantáneas. La app se conecta a una **API REST completa ya existente** con 25+ endpoints funcionando en producción.

### 🌐 Plataforma Web en Producción
**URL Live**: https://reservapp-web.vercel.app
- ✅ **Dashboard administrativo completo** con 7 módulos funcionales
- ✅ **Sistema de pagos Stripe** completamente integrado
- ✅ **API-First Architecture** con 25+ endpoints REST documentados
- ✅ **4 roles de usuario**: SUPER_ADMIN, ADMIN, MANAGER, USER
- ✅ **Cuentas demo disponibles** con datos realistas de 6 meses

### 🏢 6 Categorías de Venues (Mercado Expandido)
1. **🏨 Alojamiento** - Hoteles boutique, suites, cabañas
2. **🍽️ Gastronomía** - Restaurantes, experiencias culinarias privadas
3. **💆 Bienestar y Belleza** - Spas, tratamientos, terapias
4. **🎯 Tours y Experiencias** - Actividades locales, tours culturales
5. **🎉 Eventos** - Salones, venues para celebraciones
6. **🎪 Entretenimiento** - Espectáculos, actividades nocturnas

### 💰 Modelo de Negocio Disruptivo
- **Comisión ultra-baja**: 5% primer año, 10-12% estándar (vs 15-25% competencia)
- **Pagos semanales** automáticos vs 30 días de competencia
- **Ahorro comprobado**: Hasta $18,000 MXN mensuales por venue
- **Foco en pequeños negocios** locales vs grandes cadenas

📖 **Contexto Completo**: Ver [`docs/BUSINESS_MODEL.md`](docs/BUSINESS_MODEL.md) y [`docs/FEATURE_PRODUCT.md`](docs/FEATURE_PRODUCT.md)

## Essential Commands

**Development:**
- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android device/emulator (Metro starts automatically via Xcode build script)
- `yarn ios` - Run on iOS device/simulator (Metro starts automatically via Xcode build script)
- `yarn lint` - Run ESLint with custom rules
- `yarn type-check` - TypeScript type checking (zero errors required)

**Build & Deploy:**
- `yarn build:android` - Build Android release
- `yarn build:ios` - Build iOS release
- `yarn clean` - Clean Metro cache and dependencies
- `yarn pods` - Install iOS CocoaPods dependencies
- `yarn pods:update` - Update iOS CocoaPods dependencies

**Database & Services:**
- **Backend API**: Conecta a ReservApp Web (repositorio separado)
- **PRODUCTION READY**: https://reservapp-web.vercel.app/api (25+ endpoints)
- **Code Quality**: Zero ESLint warnings, codebase enterprise-ready
- **Import Management**: Scripts automatizados de organización de imports
- **Debugging**: Comandos específicos para diagnóstico de performance

## Quick Architecture Reference

**React Native 0.80 + React 19** application with **Clean Architecture** principles and user-focused mobile-first design.

### Technology Stack

**Framework:** React Native 0.80, React 19, TypeScript 5
**State Management:** Redux Toolkit, Redux Persist, React Redux
**Navigation:** React Navigation 6 (Stack, Drawer, Tabs)
**UI/Styling:** Styled Components, Lucide Icons, Expo LinearGradient
**Storage:** AsyncStorage, Redux Persist
**i18n:** react-i18next, i18next with dynamic language switching
**Payments:** Stripe integration with complete payment management
**APIs:** Integración real con backend (https://reservapp-web.vercel.app/api)
**Development:** ESLint custom rules, Prettier, TypeScript strict mode

📚 **Stack Completo**: [`docs/TECHNICAL_GUIDE.md`](docs/TECHNICAL_GUIDE.md)
📡 **APIs Documentadas**: [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) - 25+ endpoints REST

### Project Structure

```
src/
├── components/             # Reusable UI Components
│   ├── Form/              # Form components (Input, Button, Select)
│   ├── Layout/            # Layout components (ScreenLayout)
│   ├── Toast/             # Toast notification system
│   ├── Modal/             # Modal system with provider
│   └── ErrorBoundary.tsx  # Error handling component
├── screens/               # Screen Components
│   ├── auth/             # Authentication screens
│   ├── main/             # Main app screens (Home, etc.)
│   ├── drawer/           # Drawer navigation screens
│   └── tabs/             # Tab navigation screens
├── navigation/            # Navigation Configuration
│   ├── stacks/           # Stack navigators
│   ├── drawers/          # Drawer navigators
│   └── types.ts          # Navigation type definitions
├── hooks/                 # Custom React Hooks
│   ├── useI18n.ts        # Internationalization hook
│   ├── useFontScaling.ts # Dynamic font scaling
│   ├── useKeyboard.ts    # Keyboard management
│   └── useSessionRestore.ts # Session restoration
├── store/                 # Redux Store Configuration
│   ├── slices/           # Redux Toolkit slices
│   └── store.ts          # Store configuration with persist
└── libs/                  # Core Libraries
    ├── core/             # Core utilities and providers
    │   ├── i18n/         # Internationalization setup
    │   └── providers/    # App providers stack
    ├── services/         # External services and APIs (REAL APIS)
    │   ├── auth/         # Authentication services (JWT + password recovery)
    │   ├── venues/       # Venues management (search, favorites, details)
    │   ├── services/     # Services catalog and reservation
    │   ├── reservations/ # Reservations CRUD operations
    │   ├── notifications/# Notifications system (real-time)
    │   ├── payments/     # Stripe payment integration
    │   ├── users/        # User profile management
    │   ├── settings/     # User settings and preferences
    │   └── config/       # HTTP client configuration
    └── ui/               # UI utilities and theme
        └── theme/        # Theme configuration
```

📖 **Architecture Deep Dive**: [`docs/TECHNICAL_GUIDE.md`](docs/TECHNICAL_GUIDE.md)

## Core Features Implemented ✅ (PRODUCTION READY)

### 🔐 Authentication & Session Management
- **JWT Authentication** with automatic token injection
- **Password Recovery System** with ForgotPassword + ResetPassword screens
- **Session Restoration** on app startup with token validation
- **Secure Storage** using AsyncStorage with encryption ready
- **Complete Auth Flow** with real API integration

### 🔔 Notifications System (REAL API)
- **NotificationsScreen** with tabs (All, Reservations, Promotions, System)
- **Real-time badge updates** with unread count from API
- **Pagination and filtering** for efficient data handling
- **Mark as read functionality** with instant UI updates
- **Professional loading states** with skeleton screens

### 📋 Complete Reservation System (REAL API)
- **ReservationFlowScreen** with 5-step process (DateTime, Guests, Details, Payment, Confirmation)
- **Form validation** with custom useFormValidation hook
- **Price calculations** with taxes and discounts
- **Real reservation creation** via reservationsService API
- **Professional UX** with loading states and confirmations

### 👤 User Profile Management (REAL API)
- **UserProfileScreen** with 3 tabs (Profile, Password, Preferences)
- **Profile editing** with avatar and personal information
- **Password change** with secure validation
- **Preferences management** (language, notifications, font scaling)
- **Real API integration** for all profile operations

### 🏢 Venue Exploration System (REAL API)
- **DiscoverHomeScreen** - Search, categories, featured venues, favorites
- **VenueDetailsScreen** - Complete details with tabs (Info, Services, Reviews, Amenities)
- **VenueListScreen** - Advanced filtering, sorting, grid/list view, pagination
- **Real venue data** from venuesService API
- **Favorites management** with instant UI updates

### 💳 Stripe Payment Integration (REAL API)
- **Complete stripeService** with payment methods CRUD
- **PaymentMethodsScreen** with security features
- **Payment intents and confirmation** workflow
- **Card validation utilities** (Luhn algorithm, brand detection)
- **Payment history and refunds** support

### 🎨 Advanced UI Component Library
- **Form Components**: Input, Button, Select with validation states
- **Advanced Components**: AutoComplete, Tabs, Badges, LoadingState, Pagination
- **ScreenLayout**: Unified layout with SafeArea + KeyboardAvoiding
- **Toast System**: Swipe-to-dismiss notifications with 4 types
- **Modal System**: Multi-modal support with different sizes/positions
- **Error Boundaries**: Graceful error handling with retry functionality

### 🌍 Internationalization (i18n)
- **Complete i18n setup** with react-i18next
- **Dynamic language switching** (Spanish/English)
- **Currency, date, time formatters** with locale awareness
- **Comprehensive translations** for all app features
- **Pluralization support** and interpolation

### ♿ Accessibility & UX
- **Dynamic font scaling** with 4 sizes (small, medium, large, extraLarge)
- **System font scale integration** respecting device settings
- **Accessibility indicators** for large font sizes
- **WCAG compliant** form components with proper labels
- **Keyboard handling** with platform-specific behavior

### 🏗️ State Management
- **Redux Toolkit** with createAsyncThunk for all async operations
- **Redux Persist** with selective persistence (auth, reservations, notifications)
- **7 Redux slices**: auth, ui, reservation, venues, reservations, services, notifications
- **Type-safe selectors** and actions with full TypeScript support

### 🚀 Navigation & Routing
- **RootNavigator** with session-based routing
- **SplashScreen** with smooth animations and session restore
- **Type-safe navigation** with parameter validation
- **Deep linking ready** architecture

### 📱 Mobile-First Features
- **SafeArea handling** across all screens
- **KeyboardAvoidingView** with intelligent platform detection
- **Pull-to-refresh** support in scrollable screens
- **Gesture handling** for toasts and modals
- **Platform-specific UI** adaptations

## Redux Store Architecture

### Implemented Slices
```typescript
interface RootState {
  auth: AuthState;           // ✅ User authentication & session
  ui: UIState;              // ✅ UI state (modals, loading, etc.)
  reservation: ReservationState;    // ✅ Reservation flow state
  venues: VenuesState;      // ✅ Venue search & filters
  reservations: ReservationsState; // ✅ User reservations CRUD
  services: ServicesState;  // ✅ Services catalog & promotions
  notifications: NotificationsState; // ✅ Push/local notifications
}
```

### Async Thunks Implemented (REAL API)
- **Auth**: `logoutUser`, `forgotPassword`, `resetPassword`, `changePassword`
- **Venues**: `fetchVenues`, `searchVenues`, `fetchVenueDetails`, `addToFavorites`, `removeFromFavorites`
- **Reservations**: `fetchReservations`, `createReservation`, `cancelReservation`, `updateReservation`
- **Services**: `fetchServices`, `fetchServicesByCategory`, `getServicesByVenue`
- **Notifications**: `fetchNotifications`, `markAsRead`, `markAllAsRead`, `getUnreadCount`
- **Payments**: `getPaymentMethods`, `createPaymentIntent`, `confirmPayment`, `getPaymentHistory`
- **Users**: `updateProfile`, `updateSettings`, `getProfile`

## Key Screens Implemented (PRODUCTION READY)

### 🔐 Authentication Flow (REAL API)
- **LoginScreen** ✅ - JWT authentication with real API integration
- **ForgotPasswordScreen** ✅ - Email-based password recovery with API
- **ResetPasswordScreen** ✅ - Token-based password reset with validation
- **WelcomeScreen** ✅ - Professional onboarding experience
- **RegisterScreen** ✅ - Complete user registration flow

### 🏠 Main Application Screens
- **HomeScreen** ✅ - Dashboard with real stats, recent reservations, quick actions
- **SettingsScreen** ✅ - i18n, font scaling, notifications, with live demo
- **SplashScreen** ✅ - Animated with session restoration

### 🔔 Notifications System
- **NotificationsScreen** ✅ - Tabs, filtering, pagination, real API data

### 📋 Reservation & Reservations
- **ReservationFlowScreen** ✅ - Complete 5-step reservation process with real API
- **MyReservationsScreen** ✅ - User reservations management (drawer)

### 👤 User Management
- **UserProfileScreen** ✅ - Complete profile management with 3 tabs
- **ProfileScreen** ✅ - Profile editing in main screens and drawer

### 🏢 Venue Exploration (REAL API)
- **DiscoverHomeScreen** ✅ - Main discovery hub with search and categories
- **VenueDetailsScreen** ✅ - Complete venue details with 4 tabs
- **VenueListScreen** ✅ - Advanced filtering, sorting, grid/list view

### 💳 Payment Management
- **PaymentMethodsScreen** ✅ - Stripe integration with CRUD operations

### 🗂️ Navigation Screens
- **RootNavigator** ✅ - Session restore, type-safe routing with real data
- **AuthStack** ✅ - Complete authentication flow
- **MainDrawer** ✅ - Drawer navigation with all screens implemented
- **TabNavigator** ✅ - Tab navigation with Discover, Search, Reservations, Account

## Development Workflow

### Code Quality Standards
- **TypeScript Strict Mode**: Zero tolerance for type errors
- **ESLint + Prettier**: Automated formatting with custom rules
- **Import Organization**: Automatic import sorting and grouping
- **Component Standards**: Consistent component patterns

### Testing Strategy (Planned)
- **Unit Testing**: Jest + React Native Testing Library
- **Component Testing**: Isolated component testing
- **Hook Testing**: Custom hook testing utilities
- **Integration Testing**: Redux integration testing
- **E2E Testing**: Detox for critical user flows

### Architecture Patterns
- **Clean Architecture**: Separation of concerns across layers
- **Provider Pattern**: Centralized providers stack
- **Custom Hooks**: Business logic abstraction
- **Service Layer**: External API abstraction
- **Type-Safe APIs**: Full TypeScript integration

## Current Status - PRODUCTION READY ✅

### ✅ CORE FUNCTIONALITY COMPLETED (100%)
1. **🔥 API Real Integration** - All services connected to real ReservApp Web API
2. **🔐 Complete Authentication System** - Login, password recovery, JWT management
3. **🔔 Notifications System** - Real-time notifications with API integration
4. **📋 Complete Reservation System** - 5-step reservation flow with real reservations
5. **👤 User Profile Management** - Full profile editing with preferences
6. **🏢 Venue Exploration** - Discovery, details, listing with real data
7. **💳 Stripe Payment Integration** - Complete payment management system
8. **🎨 Advanced UI Library** - Professional components with loading states
9. **🌍 Internationalization** - Complete i18n with Spanish/English
10. **📱 Mobile-First UX** - Responsive design with accessibility features
11. **🏗️ Redux Architecture** - 7 slices with real async thunks
12. **🚀 Navigation System** - Type-safe routing with session management
13. **⚡ Error Handling** - Robust error management with user feedback
14. **🔒 Security Implementation** - JWT tokens, secure storage, validation
15. **📊 Real Data Integration** - All screens display live data from API
16. **🧹 Code Quality Achievement** - **ZERO ESLint warnings** (68 → 0) with custom rules

### ✅ USER EXPERIENCE SCREENS COMPLETED (100%)
17. **🏢 VenueListScreen** - Complete venue discovery with filters, search, and pagination
18. **🛍️ ServiceSelectionScreen** - Full service catalog with category filtering and reservation integration
19. **🔔 NotificationsScreen** - Complete notifications center with filtering and real-time updates
20. **👤 ProfileScreen** - Full profile management with editing, image upload, and navigation menu
21. **📋 MyReservationsScreen** - Comprehensive reservation management with cancellation and status tracking
22. **💰 WalletScreen** - Complete wallet management with transactions, payment methods, and balance
23. **🏠 TabNavigator** - Full implementation with all 5 tabs (Home, Services, Reservations, Wallet, Settings)

### 🎯 CONSTRAINTS COMPLIANCE ✅
- ❌ **No real-time services** - Using REST APIs only
- ❌ **No image management** - External URLs only
- ❌ **No analytics** - No tracking implemented
- ❌ **No biometric auth** - Email/password only
- ❌ **No offline mode** - Requires active connection
- ❌ **No maps/geolocation** - Text-based locations only
- ❌ **No push notifications** - Local/API notifications only
- ❌ **No quick auth** - Traditional flow only
- ❌ **No SMS recovery** - Email-based recovery only
- ❌ **No write reviews** - Read-only reviews
- ✅ **Real API connections only** - 100% implemented
- ✅ **Core functionality complete** - All requested features implemented

### 🚀 READY FOR DEPLOYMENT
- **TypeScript**: Zero errors, strict mode enabled
- **ESLint Quality**: **ZERO warnings** (68 → 0) with custom rules enforcement
- **Code Standards**: Prettier formatting, consistent patterns, no console.log
- **Performance**: Optimized with memoization and lazy loading
- **UX**: Professional UI with loading states and error handling
- **Architecture**: Clean architecture with separation of concerns
- **Testing Ready**: Structure prepared for comprehensive testing
- **Store Ready**: Compliant with iOS App Store and Google Play guidelines

## File Organization Standards

### Component Structure
```typescript
// Standard component structure
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // 1. Hooks and state
  const { t } = useI18n();
  const [state, setState] = useState();

  // 2. Event handlers
  const handleAction = () => {};

  // 3. Effects
  useEffect(() => {}, []);

  // 4. Render
  return <StyledComponent />;
};

// 5. Styled components at bottom
const StyledComponent = styled.View``;

export default ComponentName;
```

### Service Structure
```typescript
// Service class pattern
class ServiceName {
  private baseUrl = API_BASE_URL;

  async methodName(params: Params): Promise<Response> {
    return handleRequest<Response>({
      url: this.baseUrl,
      endpoint: ENDPOINTS.METHOD,
      method: 'post',
      body: params
    });
  }
}

export default new ServiceName();
```

## Integration Points

### Backend Integration (PRODUCTION READY)
- **API Base URL**: https://reservapp-web.vercel.app/api (REAL PRODUCTION API)
- **Authentication**: JWT tokens with automatic injection and refresh
- **Error Handling**: Centralized error management with user feedback
- **Real Data Mode**: All services use real API endpoints (simulation eliminated)
- **40+ Endpoints**: Complete API coverage for all app functionality

### Cross-Platform Consistency
- **Design System**: Matches web platform branding and UX
- **User Experience**: Consistent flows across web and mobile
- **Data Synchronization**: Ready for real-time sync with web platform

## Security Considerations

### Authentication Security
- **JWT Storage**: Secure token storage with AsyncStorage
- **Token Refresh**: Automatic token renewal
- **Session Expiry**: Proper session timeout handling

### Data Security
- **API Security**: HTTPS-only requests
- **Input Validation**: Client-side validation with server-side verification
- **Error Handling**: No sensitive data exposure in error messages

## Performance Optimizations

### Bundle Optimization
- **Tree Shaking**: Configured for minimal bundle size
- **Code Splitting**: Lazy loading for screens and services
- **Asset Optimization**: Optimized images and icons

### Runtime Performance
- **Memoization**: React.memo, useMemo, useCallback usage
- **State Optimization**: Normalized state structure
- **List Virtualization**: Ready for large data sets

## Deployment Preparation

### Build Configuration
- **Environment Variables**: Development/staging/production configs
- **Build Scripts**: Automated build processes
- **Asset Bundling**: Optimized asset delivery

### Store Deployment
- **App Store Guidelines**: Compliant with iOS App Store requirements
- **Play Store Guidelines**: Compliant with Google Play Store requirements
- **Metadata**: App descriptions, screenshots, keywords prepared

## 📡 API Integration & Services - PRODUCCIÓN COMPLETA

**Base URL**: `https://reservapp-web.vercel.app/api` ✅ **LIVE EN PRODUCCIÓN**
**Architecture**: Clean Architecture + HTTP Services + Redux Toolkit
**Documentación**: Ver [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) - Documentación completa de 25+ endpoints

### 🎯 Endpoints Principales para Móvil
**Autenticación** (✅ Funcionando):
- `POST /api/auth/login` - JWT authentication
- `POST /api/auth/register` - Registro de usuarios
- `GET /api/auth/profile` - Validación de token + perfil

**Venues** (✅ API Pública):
- `GET /api/venues` - Catálogo con filtros y paginación
- `GET /api/venues/[id]` - Detalles específicos
- Filtros: categoría, ciudad, precio, calificación

**Reservas** (✅ Con Stripe):
- `POST /api/reservations` - Crear reserva + pago automático
- `GET /api/reservations` - Mis reservas
- `PUT /api/reservations/[id]` - Actualizar/cancelar

**Pagos** (✅ Stripe Production):
- `POST /api/payments/subscription` - Procesar pago
- Webhooks automáticos para confirmación

### 📱 Contexto Móvil Específico
- **User-centric**: Solo endpoints necesarios para experiencia móvil
- **Sin APIs Admin**: Creación de venues en plataforma web
- **Real-time Ready**: Arquitectura preparada para WebSockets
- **Offline-Ready**: Service layer preparado para estrategias de cache

## Services Architecture (REAL API INTEGRATION)

### 🔐 authService (Complete)
```typescript
- login(email, password) → JWT token
- forgotPassword(email) → Password recovery email
- resetPassword(token, newPassword) → Password reset confirmation
- changePassword(currentPassword, newPassword) → Update password
- getProfile() → User profile data
```

### 🏢 venuesService (Complete with Favorites)
```typescript
- getVenues(filters, pagination) → Venue listings
- getVenueById(id) → Venue details
- getNearbyVenues(location, filters) → Location-based venues
- getPopularVenues(pagination) → Popular venues
- searchVenues(query) → Search results
- addToFavorites(venueId) → Add to user favorites
- removeFromFavorites(venueId) → Remove from favorites
- getFavoriteVenues(pagination) → User's favorite venues
- isFavorite(venueId) → Check if venue is favorited
- getVenueReviews(venueId) → Venue reviews
- getVenueReviewsSummary(venueId) → Reviews statistics
```

### 💳 stripeService (Complete)
```typescript
- getPaymentMethods() → User payment methods
- createPaymentMethod(cardData) → Add new payment method
- deletePaymentMethod(id) → Remove payment method
- createPaymentIntent(amount, reservationId) → Payment intent
- confirmPayment(paymentIntentId) → Confirm payment
- getPaymentHistory() → Payment history
```

### 🔔 notificationsService (Complete)
```typescript
- getNotifications(filters, pagination) → Notifications list
- markAsRead(notificationId) → Mark notification as read
- markAllAsRead() → Mark all as read
- getUnreadCount() → Unread notifications count
- updateNotificationSettings(settings) → Update preferences
```

### 📋 reservationsService (Complete)
```typescript
- createReservation(reservationData) → New reservation
- getReservations(filters) → User reservations
- updateReservation(id, updates) → Modify reservation
- cancelReservation(id) → Cancel reservation
- getReservationDetails(id) → Reservation details
```

### 🛍️ servicesService (Complete with Availability)
```typescript
- getServices(filters, pagination) → Services catalog
- getServiceDetails(serviceId) → Service details
- getAvailableServices(date, filters) → Available services for date
- getPopularServices(pagination) → Popular services
- getServicesByCategory(category, filters) → Category-filtered services
- getServicesByVenue(venueId, filters) → Venue-specific services
- getServiceAvailability(serviceId, date, duration) → Service availability
- getAvailableTimeSlots(serviceId, date, capacity) → Available time slots
- checkAvailability(serviceId, date, startTime, capacity) → Availability check
- calculateFinalPrice(service, capacity, duration, discount) → Price calculation
- getServiceCategories() → Available categories
- formatPrice(amount, currency) → Price formatting
```

---

## 📚 Documentación Completa del Ecosistema

### 📋 Índice de Documentación
- [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md) - **API REST completa** - 25+ endpoints documentados
- [`docs/BUSINESS_MODEL.md`](docs/BUSINESS_MODEL.md) - **Modelo de negocio** - Contexto estratégico y competencia
- [`docs/FEATURE_PRODUCT.md`](docs/FEATURE_PRODUCT.md) - **Guía del producto** - Funcionalidades y UX completo
- [`docs/COMPLETE_DEVELOPER.md`](docs/COMPLETE_DEVELOPER.md) - **Guía técnica** - Stack y desarrollo completo
- [`docs/ROUTES_AND_SITEMAP.md`](docs/ROUTES_AND_SITEMAP.md) - **Rutas y navegación** - Sitemap completo
- [`docs/TECHNICAL_GUIDE.md`](docs/TECHNICAL_GUIDE.md) - **Arquitectura técnica** - Redux y stack details
- [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) - **CI/CD y deployment** - Fastlane y scripts

### 🌐 Cuentas Demo Disponibles (password: `password123`)
```bash
# Sistema Administrador (Ve TODO)
admin@reservapp.com - SUPER_ADMIN 🔥

# Propietarios de Negocios
admin.salazar@reservapp.com - ADMIN (Hotel Boutique) 🏨
admin.restaurant@reservapp.com - ADMIN (Restaurante) 🍽️

# Gestores/Managers
gestor.salazar@reservapp.com - MANAGER (Carlos Mendoza) 👤
gestor.restaurant@reservapp.com - MANAGER (Ana García) 👤

# Clientes Finales
juan.perez@gmail.com - USER (Juan Carlos) 🧑‍💼
maria.lopez@gmail.com - USER (María Elena) 🧑‍💼
```

**🎯 STATUS: APLICACIÓN MÓVIL EN DESARROLLO**
**🚀 Backend API Completo en Producción - Mobile App con Redux + React Native 0.80**
**💯 Clean Architecture, TypeScript strict, Zero ESLint warnings**