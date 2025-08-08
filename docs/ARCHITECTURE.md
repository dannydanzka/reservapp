# Architecture Documentation

## Overview

ReservApp Mobile es una aplicación React Native que implementa **Clean Architecture** con una estructura modular y escalable. La aplicación está diseñada para usuarios finales que realizan reservaciones en venues y servicios.

## Architecture Patterns

### Clean Architecture Implementation

```
src/
├── components/          # UI Components Layer
├── screens/            # Presentation Layer  
├── hooks/              # Business Logic Hooks
├── store/              # State Management Layer
├── libs/
│   ├── core/           # Core Business Logic
│   ├── services/       # External Services Layer
│   └── ui/             # UI Infrastructure
└── navigation/         # Navigation Infrastructure
```

### Key Architectural Principles

1. **Separation of Concerns**: Cada capa tiene responsabilidades específicas
2. **Dependency Inversion**: Capas externas dependen de capas internas
3. **Single Responsibility**: Cada módulo tiene una única responsabilidad
4. **Open/Closed Principle**: Abierto para extensión, cerrado para modificación

## Core Components

### 1. State Management (Redux Toolkit)

**Store Structure:**
```typescript
interface RootState {
  auth: AuthState;
  ui: UIState;
  booking: BookingState;
  venues: VenuesState;
  reservations: ReservationsState;
  services: ServicesState;
  notifications: NotificationsState;
}
```

**Slices Implemented:**
- **AuthSlice**: Manejo de autenticación y sesión
- **VenuesSlice**: Gestión de venues y filtros
- **ReservationsSlice**: CRUD de reservaciones del usuario
- **ServicesSlice**: Catálogo de servicios y promociones
- **NotificationsSlice**: Sistema de notificaciones push/local

### 2. Navigation Architecture

**Stack Structure:**
```
RootNavigator
├── SplashScreen (Session Restore)
├── AuthStack (Login/Register)
└── MainDrawer
    ├── TabNavigator
    │   ├── HomeTab
    │   ├── ReservationsTab
    │   └── ServicesTab
    └── BookingFlow (Modal)
```

**Navigation Features:**
- Session restoration automática
- Deep linking ready
- Type-safe navigation
- Persistent navigation state

### 3. Service Layer

**Services Architecture:**
```typescript
// Core Services
handleRequest()     // HTTP Client con token injection
authService        // Autenticación y sesión
dashboardService   // Dashboard y estadísticas

// Future Services
venueService       // Venues y filtros
reservationService // CRUD reservaciones  
notificationService // Push notifications
```

**Service Features:**
- Automatic token injection
- Error handling centralizado
- Request/Response interceptors
- Offline capability ready

## Infrastructure Components

### 1. Providers Stack

```tsx
<ErrorBoundary>
  <GestureHandlerRootView>
    <SafeAreaProvider>
      <ReduxProvider>
        <PersistGate>
          <ThemeProvider>
            <ModalProvider>
              <ToastProvider>
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </ToastProvider>
            </ModalProvider>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
</ErrorBoundary>
```

### 2. Core Hooks

**Custom Hooks:**
- `useI18n()` - Internacionalización completa
- `useFontScaling()` - Escalado dinámico de fuentes
- `useKeyboard()` - Manejo inteligente del teclado
- `useSessionRestore()` - Restauración de sesión
- `useErrorHandler()` - Manejo de errores

### 3. UI Components

**Component Library:**
```
components/
├── Form/
│   ├── Input.tsx          # Input con validación
│   ├── Button.tsx         # Button con estados
│   └── Select.tsx         # Select con modal
├── Layout/
│   └── ScreenLayout.tsx   # Layout unificado
├── Toast/
│   └── ToastProvider.tsx  # Sistema de notificaciones
├── Modal/
│   └── ModalProvider.tsx  # Sistema de modales
└── ErrorBoundary.tsx      # Error boundaries
```

## Data Flow

### 1. User Action Flow

```
User Action → Component → Hook → Service → API → Redux → Component Update
```

### 2. State Management Flow

```
UI Event → Action Creator → Thunk → API Call → Reducer → State Update → UI Re-render
```

### 3. Navigation Flow

```
User Action → Navigation Action → Stack Navigator → Screen Component → Data Fetch
```

## Performance Considerations

### 1. Code Splitting
- Lazy loading de pantallas
- Dynamic imports para servicios pesados
- Component-level splitting

### 2. State Optimization
- Redux Persist con whitelist selectiva
- Memoization en selectores
- Normalized state structure

### 3. Rendering Optimization
- React.memo para componentes puros
- useMemo/useCallback para expensive operations
- Virtualized lists para datos largos

## Security Architecture

### 1. Authentication
- JWT token management
- Secure storage (Keychain/Keystore)
- Auto-refresh de tokens

### 2. Data Protection
- API key obfuscation
- Secure HTTP-only requests
- Input validation y sanitization

### 3. Error Handling
- No sensitive data en logs
- Graceful degradation
- User-friendly error messages

## Scalability Patterns

### 1. Modular Structure
- Feature-based organization
- Shared components library
- Pluggable services

### 2. Configuration Management
- Environment-based configs
- Feature flags ready
- A/B testing support

### 3. Monitoring & Observability
- Error tracking preparado
- Performance monitoring hooks
- User analytics integration points

## Testing Strategy

### 1. Unit Testing
- Hooks testing con renderHook
- Component testing con RTL
- Service layer testing con mocks

### 2. Integration Testing
- Redux integration testing
- Navigation flow testing
- API integration testing

### 3. E2E Testing (Planned)
- Critical user journeys
- Cross-platform testing
- Performance testing

## Development Workflow

### 1. Code Quality
- ESLint + Prettier configurado
- TypeScript strict mode
- Styled Components con theming

### 2. Git Workflow
- Feature branch workflow
- Conventional commits
- Automated testing en PRs

### 3. Deployment
- Environment-specific builds
- Automated versioning
- Distribution via stores

## Future Architecture Considerations

### 1. Offline-First
- Redux Persist enhancement
- Local database (SQLite)
- Sync strategies

### 2. Micro-Frontend
- Module federation
- Independent deployments
- Shared component library

### 3. Advanced Features
- Push notifications
- Background sync
- Real-time updates
- Analytics integration