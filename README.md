# 📱 ReservApp Mobile

**Aplicación móvil React Native para el ecosistema de reservas ReservApp**

**Autor**: Roberto Ramirez (danny.danzka21@gmail.com)

> **Estado**: ✅ **LISTO PARA PRODUCCIÓN** - App completa con API real integrada

---

## 🚀 Quick Start

### Prerrequisitos
- **Node.js** 18+ LTS
- **Yarn** (recomendado) o npm
- **React Native CLI**: `npm install -g react-native-cli`
- **Xcode** 15+ (para iOS)
- **Android Studio** (para Android)
- **CocoaPods** 1.11+ (para iOS)

### Instalación Rápida

```bash
# 1. Clonar repositorio
git clone <repository-url>
cd ReservApp

# 2. Instalar dependencias
yarn install

# 3. Configurar iOS
cd ios && bundle install && npx pod-install && cd ..

# 4. Copiar variables de entorno
cp .env.example .env
# ✅ No necesitas modificar nada - funciona out-of-the-box

# 5. Ejecutar la aplicación
yarn start          # Metro bundler
yarn ios            # iOS (en otra terminal)
yarn android        # Android (en otra terminal)
```

### 🎯 Uso Inmediato
- La app se conecta automáticamente a la **API de producción** en Vercel
- **Cuentas demo** ya configuradas (ver sección Cuentas Demo)
- **No requiere backend local** - todo funciona desde el primer momento

---

## 🛠️ Tecnologías Implementadas

### Stack Principal
- **React Native** 0.80 + **React** 19 + **TypeScript** 5.0
- **Redux Toolkit** + **Redux Persist** (estado global)
- **React Navigation** 6 (navegación type-safe)
- **Styled Components** (estilos)
- **i18next** (internacionalización ES/EN)
- **Axios** (HTTP cliente)

### Servicios Integrados
- **API REST**: https://reservapp-web.vercel.app/api (25+ endpoints)
- **Stripe**: Pagos reales integrados
- **Vercel**: Hosting de la API backend
- **Fastlane**: CI/CD automático para iOS/Android

### Arquitectura
- **Clean Architecture** con separación por módulos
- **Domain-Driven Design** (DDD)
- **Repository Pattern** para servicios
- **Type-safe** al 100% con TypeScript strict

---

## 📱 Funcionalidades Implementadas

### ✅ Autenticación Completa
- Login/Logout con JWT
- Recuperación de contraseña por email
- Registro de usuarios
- Persistencia de sesión automática

### ✅ Sistema de Reservas
- Exploración de venues con filtros
- Selección de servicios con disponibilidad real
- Proceso de reserva en 5 pasos
- Gestión completa de reservas (ver, modificar, cancelar)

### ✅ Pagos con Stripe
- Integración completa con Stripe
- Gestión de métodos de pago
- Procesamiento seguro de tarjetas
- Historial de pagos y recibos

### ✅ Experiencia de Usuario
- Centro de notificaciones con filtros
- Perfil de usuario con edición completa
- Tema claro/oscuro automático
- Font scaling para accesibilidad
- Interfaz bilingüe (ES/EN)

### ✅ Navegación Profesional
- Stack navigation con auth flow
- Drawer navigation para el menú principal
- Tab navigation para secciones principales
- Deep linking preparado

---

## 🔑 Cuentas Demo

**Password para todas las cuentas**: `password123`

### Administradores
- `admin@reservapp.com` - **SUPER_ADMIN** (acceso total)
- `admin.salazar@reservapp.com` - **ADMIN** (Hotel Boutique)
- `admin.restaurant@reservapp.com` - **ADMIN** (Restaurante)

### Gestores
- `gestor.salazar@reservapp.com` - **MANAGER** (Carlos Mendoza)
- `gestor.restaurant@reservapp.com` - **MANAGER** (Ana García)

### Usuarios Finales
- `juan.perez@gmail.com` - **USER** (Juan Carlos)
- `maria.lopez@gmail.com` - **USER** (María Elena)

---

## 🏃‍♂️ Comandos de Desarrollo

### Desarrollo Diario
```bash
# Ejecutar la app
yarn start              # Metro bundler
yarn ios                # iOS simulator
yarn android            # Android emulator

# Calidad de código
yarn lint               # ESLint + Prettier + TypeScript
yarn type-check         # Solo TypeScript checking
yarn format             # Auto-formatear código

# Limpieza
yarn clean              # Limpiar caché Metro
yarn clean:ios          # Limpiar build iOS
yarn clean:android      # Limpiar build Android
```

### Builds de Distribución
```bash
# Verificar builds
yarn verify:bundle      # Verificar que la app compila

# APK/IPA builds
yarn build:android:debug     # APK debug
yarn build:android:release   # APK release
yarn build:ios:debug         # iOS debug build
yarn build:ios:release       # iOS release build
```

### Fastlane (CI/CD)
```bash
# Setup inicial
yarn fastlane:setup     # Instalar Fastlane dependencies

# iOS builds
yarn fastlane:ios:beta      # Build + TestFlight
yarn fastlane:ios:release   # Build + App Store

# Android builds  
yarn fastlane:android:beta      # Build + Play Store (internal)
yarn fastlane:android:release   # Build + Play Store (production)
```

---

## 🔧 Configuración Adicional

### Variables de Entorno Opcionales

Para desarrollo básico **no necesitas configurar nada**. Para builds y servicios adicionales:

```bash
# Copiar y editar si necesitas builds o servicios extras
cp .env.example .env
```

**Variables importantes para builds:**
- `FASTLANE_USER` - Apple ID para builds iOS
- `DEVELOPER_TEAM_ID` - Team ID de Apple Developer
- `KEYSTORE_PASSWORD` - Password del keystore Android

### Firebase (Opcional)
Si quieres analytics y crash reporting:
1. Crear proyecto en Firebase Console
2. Agregar apps iOS/Android
3. Configurar variables `REACT_APP_FIREBASE_*` en .env

### Sentry (Opcional)
Para error tracking avanzado:
1. Crear cuenta en Sentry
2. Configurar `REACT_APP_SENTRY_DSN` en .env

---

## 📡 API Backend

### Información de la API
- **URL**: https://reservapp-web.vercel.app/api
- **Documentación**: Ver `docs/API_DOCUMENTATION.md`
- **Endpoints**: 25+ endpoints REST funcionando
- **Autenticación**: JWT Bearer tokens
- **Status**: ✅ **EN PRODUCCIÓN** (100% funcional)

### Servicios Disponibles
- **Auth**: Login, registro, recuperación de contraseña
- **Venues**: Listado, búsqueda, detalles, favoritos
- **Services**: Catálogo de servicios con precios
- **Reservations**: CRUD completo de reservas
- **Payments**: Integración completa con Stripe
- **Notifications**: Sistema de notificaciones
- **Users**: Gestión de perfiles y configuraciones

**No necesitas configurar backend** - todo está funcionando en producción.

---

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
│   ├── Form/           # Inputs, Buttons, Selects
│   ├── Layout/         # ScreenLayout, SafeArea
│   └── Toast/          # Sistema de notificaciones
├── libs/               # Core libraries
│   ├── infrastructure/ # Servicios e HTTP clients
│   ├── presentation/   # Hooks, navegación, componentes
│   └── shared/         # Utilidades y configuración
├── modules/            # Módulos de dominio
│   ├── mod-auth/       # Autenticación
│   ├── mod-home/       # Dashboard principal
│   ├── mod-notification/ # Notificaciones
│   ├── mod-payments/   # Pagos y Stripe
│   ├── mod-profile/    # Perfil de usuario
│   ├── mod-reservation/ # Sistema de reservas
│   └── mod-services/   # Catálogo de servicios
├── hooks/              # Custom React hooks
└── api/                # HTTP cliente y configuración
```

---

## 🚀 Deployment

### Preparación para Stores

**iOS App Store:**
```bash
# Configurar certificados
fastlane ios setup_certificates

# Build y deploy
fastlane ios production upload_to_testflight:true
```

**Google Play Store:**
```bash
# Configurar signing
# Editar android/keystore/keystore.properties

# Build y deploy
fastlane android production upload_to_play_store:true
```

### GitHub Actions (Automático)
- **Push a `main`**: Builds de release automáticos
- **Tags `v*.*.*`**: Builds de producción + store upload
- **Pull Requests**: Builds de verificación

---

## 📚 Documentación Adicional

### Guías Detalladas
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Todos los endpoints
- **[Technical Guide](docs/TECHNICAL_GUIDE.md)** - Arquitectura y desarrollo
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - CI/CD y store deployment
- **[Feature Guide](docs/FEATURE_PRODUCT.md)** - Funcionalidades del producto

### Archivos de Configuración
- **[CLAUDE.md](CLAUDE.md)** - Guía para Claude Code
- **[Fastfile](fastlane/Fastfile)** - Configuración Fastlane completa
- **[package.json](package.json)** - Dependencias y scripts

---

## 🐛 Troubleshooting

### Problemas Comunes

**Metro bundler no inicia:**
```bash
yarn start:reset        # Reset cache
```

**Pods no instalan (iOS):**
```bash
cd ios && rm -rf Pods Podfile.lock && npx pod-install
```

**Build falla en Android:**
```bash
cd android && ./gradlew clean && cd ..
yarn clean:android
```

**TypeScript errors:**
```bash
yarn type-check         # Ver errores específicos
```

### Comandos de Limpieza
```bash
yarn clean:all          # Limpieza completa
yarn clean:modules      # Reinstalar node_modules
```

---

## 📊 Calidad del Código

### Métricas Actuales
- **TypeScript**: 100% tipado, 0 errores
- **ESLint**: 0 warnings (configuración estricta)
- **Prettier**: Formateo automático
- **Bundle Size**: Optimizado con tree shaking

### Comandos de Calidad
```bash
yarn lint:errors        # Solo errores críticos
yarn lint:fix           # Auto-fix problemas
yarn security:audit     # Audit de dependencias
```

---

## 🤝 Contribución

### Para Desarrolladores
1. **Fork** del repositorio
2. **Branch** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** con mensajes descriptivos
4. **Push** y crear **Pull Request**

### Estándares de Código
- **TypeScript strict** mode obligatorio
- **ESLint** rules deben pasar
- **Prettier** formateo automático
- **Tests** para nuevas funcionalidades (cuando aplique)

---

## 🎉 Estado del Proyecto

**ReservApp Mobile está 100% funcional y listo para producción:**

### ✅ Completado
- **Backend API** funcionando en Vercel
- **Stripe payments** integrados y funcionando
- **Sistema completo de reservas** end-to-end
- **Autenticación** con JWT y recuperación de contraseña
- **Centro de notificaciones** con API real
- **Perfil de usuario** completo con upload de imágenes
- **Navegación** type-safe con React Navigation
- **Internacionalización** ES/EN completa
- **CI/CD** con Fastlane para ambas plataformas
- **Documentación** completa y actualizada

### 🚀 Ready for Launch
- **App Store** metadata preparado
- **Google Play** store listing listo
- **Builds** automáticos funcionando
- **Error handling** robusto
- **Performance** optimizado

---

**¡La aplicación está lista para usar desde el primer `yarn install`!**

*Última actualización: Agosto 2025*