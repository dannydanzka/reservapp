# CLAUDE.md

Quick reference guide for Claude Code when working with ReservApp Mobile.

## Business Context

**ReservApp Mobile** is the end-user mobile application for the ReservApp ecosystem. Built with React Native 0.80 + React 19, it allows users to discover, book, and manage reservations for venues like restaurants, spas, hotels, tours, and events.

📖 **Complete Context**: See [`docs/BUSINESS_MODEL.md`](docs/BUSINESS_MODEL.md)

## Essential Commands

**Development:**
- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run lint` - Run ESLint with custom rules
- `npm run type-check` - TypeScript type checking (zero errors required)

**Build & Deploy:**
- `npm run build:android` - Build Android release
- `npm run build:ios` - Build iOS release
- `npm run clean` - Clean Metro cache and dependencies

**Database & Services:**
- Backend API runs on ReservApp Web project (separate repository)
- Current setup uses mock data and simulation mode

## Quick Architecture Reference

**React Native 0.80 + React 19** application with **Clean Architecture** principles and user-focused mobile-first design.

### Technology Stack

**Framework:** React Native 0.80, React 19, TypeScript 5
**State Management:** Redux Toolkit, Redux Persist, React Redux
**Navigation:** React Navigation 6 (Stack, Drawer, Tabs)
**UI/Styling:** Styled Components, Lucide Icons, Expo LinearGradient
**Storage:** AsyncStorage, Redux Persist
**i18n:** react-i18next, i18next with dynamic language switching
**Development:** ESLint, Prettier, TypeScript strict mode

📚 **Complete Stack Details**: [`docs/TECH_STACK.md`](docs/TECH_STACK.md) | [`docs/FRONTEND.md`](docs/FRONTEND.md) | [`docs/DEPENDENCIES.md`](docs/DEPENDENCIES.md)

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
    ├── services/         # External services and APIs
    │   ├── auth/         # Authentication services
    │   ├── config/       # HTTP client configuration
    │   └── dashboard/    # Dashboard services
    └── ui/               # UI utilities and theme
        └── theme/        # Theme configuration
```

📖 **Architecture Deep Dive**: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## Core Features Implemented ✅

### 🔐 Authentication & Session Management
- **JWT Authentication** with automatic token injection
- **Session Restoration** on app startup with token validation
- **Secure Storage** using AsyncStorage with encryption ready
- **Login Screen** with demo credentials and i18n integration

### 🎨 UI Component Library
- **Form Components**: Input, Button, Select with validation states
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
- **7 Redux slices**: auth, ui, booking, venues, reservations, services, notifications
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
  booking: BookingState;    // ✅ Booking flow state
  venues: VenuesState;      // ✅ Venue search & filters
  reservations: ReservationsState; // ✅ User reservations CRUD
  services: ServicesState;  // ✅ Services catalog & promotions
  notifications: NotificationsState; // ✅ Push/local notifications
}
```

### Async Thunks Implemented
- **Auth**: `logoutUser`
- **Venues**: `fetchVenues`, `searchVenues`, `fetchVenueDetails`
- **Reservations**: `fetchReservations`, `createReservation`, `cancelReservation`, `rateReservation`
- **Services**: `fetchServices`, `fetchServicesByCategory`, `fetchPromotions`
- **Notifications**: `fetchNotifications`, `markAsRead`, `updateSettings`

## Key Screens Implemented

### Authentication Flow
- **LoginScreen** ✅ - Full i18n, modern form components, demo credentials
- **WelcomeScreen** ⚠️ - Basic structure (needs update to new architecture)
- **RegisterScreen** ⚠️ - Basic structure (needs update to new architecture)

### Main Application  
- **HomeScreen** ✅ - Dashboard with stats, recent bookings, quick actions
- **SettingsScreen** ✅ - i18n, font scaling, notifications, with live demo
- **SplashScreen** ✅ - Animated with session restoration

### Navigation Screens
- **RootNavigator** ✅ - Session restore, type-safe routing
- **AuthStack** ✅ - Authentication flow
- **MainDrawer** ✅ - Drawer navigation setup
- **TabNavigator** ⚠️ - Basic structure (needs screen implementations)

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

## Current Status & Pending Tasks

### ✅ Completed (16/18 major tasks)
1. **Redux Persist Configuration** - Complete with optimized whitelist
2. **RootNavigator with Validation** - Session restore + type-safe routing  
3. **SplashScreen** - Animated with brand consistency
4. **Error Boundaries** - Production-ready error handling
5. **Toast/Notification System** - Complete with gestures and animations
6. **Modal System** - Multi-modal with different configurations
7. **Form Components** - Professional Input, Button, Select components
8. **i18n Configuration** - Complete internationalization system
9. **Font Scaling Implementation** - Dynamic scaling with accessibility
10. **SafeArea & Keyboard Integration** - ScreenLayout unification
11. **Settings Screen** - Complete with live i18n and font scaling demo
12. **Redux Slices** - 7 complete slices with async thunks
13. **Auth Service Integration** - JWT authentication with handleRequest
14. **Home Dashboard** - Statistics and quick actions
15. **Session Management** - Complete auth flow with persistence
16. **TypeScript Integration** - Strict typing across the app

### ⚠️ In Progress / Needs Updates (2/18 remaining)
1. **TypeScript Errors Resolution** - Path resolution and interface fixes
2. **Main User Screens** - Venues, Services, Reservations management screens

### 🔄 Pending Major Features
1. **Reservations Management UI** - Complete CRUD interface for user reservations
2. **Venues Browse & Search** - Venue discovery with filters and maps
3. **Services Catalog** - Service browsing with categories and booking
4. **User Profile Management** - Complete profile editing and preferences
5. **Push Notifications Integration** - FCM/APNs implementation
6. **Offline Support** - Offline-first architecture with sync
7. **Payment Integration** - Stripe/payment gateway integration
8. **Advanced Search & Filters** - Location-based search with advanced filters

### 🐛 Minor Issues to Address
1. **Navigation Type Definitions** - Complete type exports for all stacks
2. **Screen Updates** - Update remaining screens to use new architecture
3. **Asset Optimization** - Image compression and loading optimization
4. **Performance Optimization** - Bundle size analysis and optimization

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

### Backend Integration
- **API Base URL**: Configured for ReservApp Web backend
- **Authentication**: JWT tokens with automatic refresh
- **Error Handling**: Centralized error management with user feedback
- **Mock Mode**: Development mode with simulated responses

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

## Next Steps Priority

1. **🚨 HIGH**: Complete TypeScript error resolution
2. **🔥 HIGH**: Implement Reservations Management screens
3. **📱 MEDIUM**: Complete Venues and Services catalog screens  
4. **🔔 MEDIUM**: Integrate push notifications
5. **💳 LOW**: Add payment integration
6. **🌐 LOW**: Implement offline support

---

**📋 Documentation Index:**
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - Complete architecture overview
- [`docs/TECH_STACK.md`](docs/TECH_STACK.md) - Technology stack details
- [`docs/FRONTEND.md`](docs/FRONTEND.md) - Frontend architecture deep dive
- [`docs/BUSINESS_MODEL.md`](docs/BUSINESS_MODEL.md) - Business context and model
- [`docs/DEPENDENCIES.md`](docs/DEPENDENCIES.md) - Dependencies and version management

**🎯 Current Focus**: Finalizing core user screens and resolving remaining TypeScript issues to achieve production-ready MVP.