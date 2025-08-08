# Frontend Architecture

## React Native Application Structure

### Core Framework
ReservApp Mobile utiliza **React Native 0.80** con **React 19** y **TypeScript 5** para crear una experiencia móvil nativa con performance optimizado y type-safety completo.

### Project Structure

```
src/
├── components/           # Reusable UI Components
│   ├── Form/            # Form components (Input, Button, Select)
│   ├── Layout/          # Layout components (ScreenLayout)
│   ├── Toast/           # Toast notification system
│   ├── Modal/           # Modal system with provider
│   └── ErrorBoundary.tsx
├── screens/             # Screen Components
│   ├── auth/           # Authentication screens
│   ├── main/           # Main app screens (Home, etc.)
│   ├── drawer/         # Drawer navigation screens
│   └── tabs/           # Tab navigation screens
├── navigation/          # Navigation Configuration
│   ├── stacks/         # Stack navigators
│   ├── drawers/        # Drawer navigators
│   └── types.ts        # Navigation type definitions
├── hooks/              # Custom React Hooks
│   ├── useI18n.ts      # Internationalization hook
│   ├── useFontScaling.ts # Dynamic font scaling
│   ├── useKeyboard.ts  # Keyboard management
│   └── useSessionRestore.ts # Session restoration
├── store/              # Redux Store Configuration
│   ├── slices/         # Redux Toolkit slices
│   ├── selectors/      # Reusable selectors (planned)
│   └── store.ts        # Store configuration
└── libs/               # Core Libraries
    ├── core/           # Core utilities and providers
    ├── services/       # External services and APIs
    └── ui/             # UI utilities (theme, etc.)
```

## Component Architecture

### 1. Design System Components

**Form Components:**
- **Input**: Advanced input with validation, icons, and accessibility
- **Button**: Multi-variant button with loading states
- **Select**: Modal-based select with search and options

**Layout Components:**
- **ScreenLayout**: Unified screen wrapper con SafeArea y Keyboard handling
- **ErrorBoundary**: Error handling con retry functionality
- **LoadingSpinner**: Consistent loading states

**Feedback Components:**
- **ToastProvider**: Sistema de notificaciones toast con gestures
- **ModalProvider**: Sistema de modales con múltiples tipos y posiciones

### 2. Screen Components

**Authentication Flow:**
```tsx
// LoginScreen con i18n y form components modernos
const LoginScreen = () => {
  const { t } = useI18n();
  return (
    <ScreenLayout keyboardAvoiding scrollable>
      <Input 
        label={t('auth.email')} 
        validation="email" 
        required 
      />
      <Button 
        variant="primary" 
        loading={isLoading}
        onPress={handleLogin}
      >
        {t('auth.login')}
      </Button>
    </ScreenLayout>
  );
};
```

**Main App Screens:**
- **HomeScreen**: Dashboard con estadísticas y acciones rápidas
- **ReservationsScreen**: CRUD de reservaciones del usuario
- **ServicesScreen**: Catálogo de servicios disponibles
- **SettingsScreen**: Configuración de i18n, fonts, notificaciones

### 3. State Management Pattern

**Redux Architecture:**
```typescript
// Slice moderno con createAsyncThunk
export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (params: SearchParams) => {
    const response = await venueService.search(params);
    return response.data;
  }
);

const venuesSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      });
  },
});
```

## Navigation Architecture

### Navigation Structure
```
RootNavigator (con Session Restore)
├── SplashScreen
├── AuthStack
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
└── MainDrawer
    ├── TabNavigator
    │   ├── HomeTab
    │   ├── ReservationsTab
    │   └── ServicesTab
    └── DrawerScreens
        ├── ProfileScreen
        ├── SettingsScreen
        └── HelpScreen
```

### Type-Safe Navigation
```typescript
// Navigation types para type safety completo
export type RootStackParamList = {
  AuthStack: undefined;
  MainDrawer: undefined;
  BookingFlow: { venueId: string };
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

// Usage en componentes
const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
```

## UI & Styling System

### 1. Theme Architecture
```typescript
// Sistema de theming escalable y consistente
export const theme = {
  colors: {
    primary: { 50: '#eef2ff', 500: '#4F46E5', 900: '#1e1b4b' },
    secondary: { 50: '#fff7ed', 500: '#FF8A00', 900: '#7c2d12' },
    gray: { 50: '#f9fafb', 500: '#6B7280', 900: '#111827' },
    success: { 500: '#22c55e' },
    error: { 500: '#ef4444' },
    warning: { 500: '#f59e0b' },
    info: { 500: '#3b82f6' },
  },
  typography: {
    fontFamily: {
      primary: { regular: 'Lato-Regular', bold: 'Lato-Bold' },
      secondary: { regular: 'Montserrat-Regular', bold: 'Montserrat-Bold' }
    },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16 },
  shadows: { sm: '...', md: '...', lg: '...', xl: '...' }
};
```

### 2. Styled Components Pattern
```tsx
// Componentes con theming y TypeScript
const StyledButton = styled.TouchableOpacity<{ $variant: ButtonVariant }>`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${({ $variant }) => 
    $variant === 'primary' 
      ? theme.colors.primary[500] 
      : theme.colors.secondary[500]
  };
  ${theme.shadows.sm}
`;
```

## Internationalization (i18n)

### 1. i18n Architecture
```typescript
// Hook avanzado de i18n con formatters
const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat(i18n.language === 'es' ? 'es-MX' : 'en-US', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
    
  const formatDate = (date: Date) => 
    new Intl.DateTimeFormat(i18n.language === 'es' ? 'es-MX' : 'en-US')
      .format(date);
      
  return { t, changeLanguage, formatCurrency, formatDate };
};
```

### 2. Translation Structure
```json
// Estructura organizada por features
{
  "auth": {
    "login": "Iniciar Sesión",
    "email": "Correo Electrónico",
    "password": "Contraseña"
  },
  "home": {
    "greeting": "¡Hola, {{name}}!",
    "totalReservations": "Total Reservaciones"
  },
  "validation": {
    "required": "Este campo es requerido",
    "email": "Ingresa un correo electrónico válido"
  }
}
```

## Accessibility & User Experience

### 1. Font Scaling System
```typescript
// Sistema de escalado dinámico de fuentes
const useFontScaling = () => {
  const [currentScale, setCurrentScale] = useState<FontScale>('medium');
  
  const getScaledSize = (baseSize: number) => {
    const scaleFactor = FONT_SCALES[currentScale].scale;
    const systemScale = Dimensions.get('window').fontScale;
    return Math.round(baseSize * scaleFactor * systemScale);
  };
  
  const isAccessibleScale = () => currentScale >= 'large';
  
  return { currentScale, setFontScale, getScaledSize, isAccessibleScale };
};
```

### 2. Keyboard & SafeArea Handling
```tsx
// ScreenLayout unificado para consistent UX
<ScreenLayout
  keyboardAvoiding={true}
  scrollable={true}
  safeArea={true}
  safeAreaEdges={['top', 'bottom']}
  refreshable={true}
  onRefresh={handleRefresh}
>
  {children}
</ScreenLayout>
```

## Performance Optimization

### 1. Component Optimization
```tsx
// Memoization patterns para performance
const ExpensiveComponent = React.memo(({ data, onPress }) => {
  const memoizedData = useMemo(() => 
    processComplexData(data), [data]
  );
  
  const handlePress = useCallback((id: string) => 
    onPress(id), [onPress]
  );
  
  return <ComplexUI data={memoizedData} onPress={handlePress} />;
});
```

### 2. State Management Optimization
- **Normalized State**: Estado plano para evitar re-renders innecesarios
- **Selective Subscriptions**: useSelector con shallow comparison
- **Redux Persist**: Solo datos críticos (auth, reservations, notifications)

### 3. Image & Asset Optimization
- **Lazy Loading**: Carga diferida de imágenes
- **Cached Images**: Sistema de cache para imágenes
- **Optimized Assets**: Compresión y multiple resolutions

## Testing Strategy (Planned)

### 1. Component Testing
```tsx
// Testing con React Native Testing Library
describe('LoginScreen', () => {
  it('should validate email input', async () => {
    const { getByLabelText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    
    fireEvent.changeText(emailInput, 'invalid-email');
    await waitFor(() => {
      expect(getByText('Email inválido')).toBeOnTheScreen();
    });
  });
});
```

### 2. Hook Testing
```tsx
// Testing custom hooks
describe('useI18n', () => {
  it('should format currency correctly', () => {
    const { result } = renderHook(() => useI18n());
    const formatted = result.current.formatCurrency(1000);
    expect(formatted).toBe('$1,000.00 MXN');
  });
});
```

## Development Workflow

### 1. Code Quality
- **ESLint + Prettier**: Automated code formatting
- **TypeScript Strict**: Zero tolerance para type errors
- **Import Organization**: Automated import sorting

### 2. Component Development
- **Storybook Ready**: Component documentation y testing
- **Design System**: Consistent component library
- **Atomic Design**: Component hierarchy clara

### 3. Debugging
- **Flipper Integration**: Advanced debugging tools
- **Redux DevTools**: State inspection y time-travel
- **Console Logging**: Structured logging en desarrollo

## Future Enhancements

### 1. Advanced UI
- **Dark Mode**: Sistema completo de tema dark/light
- **Animations**: React Native Reanimated integration
- **Gestures**: Advanced gesture handling

### 2. Performance
- **List Virtualization**: Para listas largas de datos
- **Image Caching**: Sistema avanzado de cache
- **Bundle Splitting**: Code splitting por features

### 3. User Experience
- **Offline Support**: Offline-first architecture
- **Push Notifications**: Real-time notifications
- **Deep Linking**: Advanced URL handling