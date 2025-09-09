# Guía de Arquitectura Frontend - Modular Domain-Based Clean Architecture

**Documento Técnico para React Native Mobile App**
**Autor**: Arquitectura de Software - JAFRA
**Fecha**: Agosto 2025
**Versión**: 2.0

---

## 📋 Resumen Ejecutivo

**Elaborado por:** Arquitectura de Software JAFRA
**Dirigido a:** Equipo de desarrollo y consultores externos
**Propósito:** Establecer estándares arquitectónicos para desarrollo mobile con enfoque Clean Architecture

Este documento define los estándares arquitectónicos para JAFRA Plus Mobile, estableciendo una arquitectura modular basada en dominios de negocio que sigue los principios de Clean Architecture. La guía está optimizada para React Native con referencias adaptativas para desarrollo web (Next.js + Nx).

## 🎯 Alcance y Objetivos

### Objetivos Técnicos
- Establecer separación clara de responsabilidades por capas y dominios
- Garantizar modularidad, escalabilidad y mantenibilidad del código
- Optimizar la experiencia de desarrollo (DX) y colaboración entre equipos
- Facilitar testing, refactoring y evolución tecnológica

### Alcance de Aplicación
- **Primario**: React Native Mobile App (JAFRA Plus Mobile)
- **Referencial**: Arquitectura web con Next.js App Router + Nx (monorepo)
- **Cobertura**: Estructura de módulos, capas, convenciones y patrones de desarrollo

---

## 🏗️ Principios Arquitectónicos Fundamentales

### 1. **Modularidad por Dominio de Negocio**
Cada funcionalidad del negocio se encapsula en un módulo independiente:
- `mod-auth` - Autenticación y gestión de sesiones
- `mod-home` - Dashboard, perfil de usuario y configuraciones
- `mod-consultant` - Gestión de consultores y registros
- `mod-orders` - Captura de órdenes y gestión de productos

### 2. **Clean Architecture en 7 Capas**
Separación estricta de responsabilidades con dependencias unidireccionales:

| Capa | Responsabilidad | Dependencias |
|------|----------------|--------------|
| **Domain** | Lógica de negocio pura | Ninguna |
| **Data** | Adaptación de fuentes externas | Domain |
| **Presentation** | Lógica de presentación | Domain, Data |
| **App** | UI y navegación | Presentation, UI |
| **Store** | Estado global | Domain, Data |
| **Services** | Comunicación HTTP | Domain |
| **Core** | Infraestructura y configuración | Ninguna |

### 3. **Inversión de Dependencias**
- Interfaces definidas en `domain/`
- Implementaciones en `data/` y `services/`
- UI depende de abstracciones, no de implementaciones concretas

---

## 📁 Estructura de Proyecto Mobile (React Native)

### Estructura Base del Proyecto

```
src/
├── app/                     # UI y navegación principal
│   ├── navigation/          # Configuración de React Navigation
│   └── App.tsx             # Componente raíz
├── apps/                    # Módulos por dominio
│   ├── mod-auth/           # 🔐 Autenticación
│   ├── mod-home/           # 🏠 Dashboard y perfil
│   ├── mod-consultant/     # 👥 Gestión consultores
│   └── mod-orders/         # 📦 Captura de órdenes
├── libs/                    # Librerías compartidas
│   ├── core/               # Configuración y utilidades
│   ├── domain/             # Tipos y helpers transversales
│   ├── services/           # Clientes HTTP
│   ├── store/              # Estado global Redux
│   └── ui/                 # Componentes reutilizables
└── assets/                 # Recursos estáticos
```

### Estructura de Módulo por Dominio

Cada módulo en `src/apps/mod-{domain}/` sigue esta estructura:

```
apps/mod-auth/
├── app/                    # 📱 Screens (React Native)
│   ├── login/
│   │   ├── Login.page.tsx
│   │   ├── Login.styled.ts
│   │   ├── Login.test.tsx
│   │   └── Login.interface.ts
│   └── register/
├── domain/                 # 🧠 Lógica de negocio
│   ├── entities/
│   ├── usecases/
│   ├── repositories/       # Interfaces
│   └── interfaces/
├── data/                   # 🔄 Adaptadores de datos
│   ├── models/             # DTOs
│   ├── mappers/            # DTO ↔ Entity
│   ├── repositories/       # Implementaciones
│   └── mocks/
├── presentation/           # 🎭 ViewModels y hooks
│   ├── viewModels/
│   └── hooks/
├── store/                  # 🗄️ Estado del módulo
│   ├── slices/
│   ├── selectors/
│   └── thunks/
└── ui/                     # 🎨 Componentes específicos
    ├── components/
    └── layouts/
```

> **💡 Diferencia con Web**: En Next.js se usa App Router con `page.tsx` y `layout.tsx` por ruta. En React Native usamos `*.page.tsx` con React Navigation.

---

## 🧱 Definición Detallada de Capas

### `libs/` - Librerías Globales Compartidas

#### `libs/core/` - Infraestructura y Configuración
```
libs/core/
├── config/              # Variables de entorno y configuración
├── utils/               # Utilidades puras transversales
├── constants/           # Valores inmutables globales
└── types/               # Tipos TypeScript globales
```

**Responsabilidades:**
- Configuración de entorno (API URLs, timeouts)
- Utilidades puras sin lógica de negocio
- Constantes y enums globales
- Tipos base de TypeScript

#### `libs/domain/` - Contratos de Negocio Transversales
```
libs/domain/
├── interfaces/          # Contratos compartidos
├── types/               # Tipos de dominio globales
├── helpers/             # Funciones puras de negocio
└── constants/           # Constantes de negocio
```

**Responsabilidades:**
- Interfaces compartidas entre módulos
- Tipos de dominio transversales
- Helpers de formateo y validación
- Constantes de negocio (regex, mensajes)

#### `libs/services/` - Clientes HTTP
```
libs/services/
├── config/              # Configuración de Axios
├── interceptors/        # Request/Response interceptors
└── clients/             # Clientes HTTP específicos
```

**Responsabilidades:**
- Configuración base de Axios
- Interceptores de autenticación y errores
- Clientes HTTP reutilizables

#### `libs/store/` - Estado Global Redux
```
libs/store/
├── store.ts             # Configuración principal
├── rootReducer.ts       # Combinación de reducers
└── middlewares/         # Middlewares personalizados
```

#### `libs/ui/` - Design System
```
libs/ui/
├── components/          # Componentes atómicos
├── theme/               # Tokens de diseño
├── hooks/               # Hooks de UI
└── utils/               # Utilidades de UI
```

### `apps/mod-{domain}/` - Módulos por Dominio

#### `domain/` - Lógica de Negocio Pura
```
domain/
├── entities/            # Modelos de negocio
├── usecases/            # Casos de uso
├── repositories/        # Interfaces (contratos)
└── interfaces/          # Tipos del dominio
```

**Principios Críticos:**
- **Cero dependencias externas** (ni React, ni HTTP, ni frameworks)
- Solo lógica de negocio pura
- Interfaces que definen qué necesita el negocio

**Ejemplo:**
```typescript
// ✅ Correcto - Solo lógica de negocio
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private _isActive: boolean
  ) {}

  activate(): void {
    if (!this.email) throw new Error('Email required');
    this._isActive = true;
  }

  get isActive(): boolean {
    return this._isActive;
  }
}

// ✅ Correcto - Interfaz sin implementación
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

#### `data/` - Adaptadores de Datos
```
data/
├── models/              # DTOs (Data Transfer Objects)
├── mappers/             # Transformaciones DTO ↔ Entity
├── repositories/        # Implementaciones concretas
└── mocks/               # Datos simulados
```

**Responsabilidades:**
- Adaptación de APIs externas al dominio
- Transformación de DTOs a entidades de negocio
- Implementación de interfaces del dominio

**Ejemplo:**
```typescript
// DTO de la API
export interface UserDTO {
  user_id: string;
  email_address: string;
  status: 'active' | 'inactive';
}

// Mapper
export const UserMapper = {
  toDomain(dto: UserDTO): User {
    return new User(
      dto.user_id,
      dto.email_address,
      dto.status === 'active'
    );
  },

  toDTO(user: User): UserDTO {
    return {
      user_id: user.id,
      email_address: user.email,
      status: user.isActive ? 'active' : 'inactive'
    };
  }
};
```

#### `presentation/` - Lógica de Presentación
```
presentation/
├── viewModels/          # MVVM pattern
├── hooks/               # Custom hooks del módulo
└── providers/           # Context providers específicos
```

**Responsabilidades:**
- Orquestar casos de uso con UI
- Manejo de estado de presentación
- Lógica de formularios y validaciones UI

#### `app/` - UI y Pantallas (Mobile)
```
app/
├── login/
│   ├── Login.page.tsx         # Screen principal
│   ├── Login.styled.ts        # Styled components
│   ├── Login.test.tsx         # Tests unitarios
│   └── Login.interface.ts     # Tipos de props/state
└── components/                # Componentes específicos
```

**Responsabilidades:**
- Renderizado de componentes React Native
- Navegación entre pantallas
- Gestión de eventos de UI

> **🌐 Variación Web**: En Next.js se usan `page.tsx`, `layout.tsx` y rutas por carpetas del App Router

---

## 📐 Convenciones y Estándares

### Nomenclatura de Archivos

| Tipo | Sufijo | Ejemplo | Propósito |
|------|--------|---------|-----------|
| **Entidades** | `.entity.ts` | `User.entity.ts` | Modelos de negocio |
| **Casos de Uso** | `.usecase.ts` | `loginUser.usecase.ts` | Lógica de negocio |
| **DTOs** | `.model.ts` | `UserDTO.model.ts` | Modelos de datos |
| **Mappers** | `.mapper.ts` | `user.mapper.ts` | Transformaciones |
| **Interfaces** | `.interface.ts` | `UserRepository.interface.ts` | Contratos |
| **Hooks** | `use*.ts` | `useLogin.ts` | Custom hooks |
| **ViewModels** | `*ViewModel.ts` | `LoginViewModel.ts` | MVVM |
| **Pantallas** | `*.page.tsx` | `Login.page.tsx` | Screens RN |
| **Estilos** | `*.styled.ts` | `Login.styled.ts` | Styled components |
| **Tests** | `*.test.tsx` | `Login.test.tsx` | Pruebas unitarias |
| **Redux** | `.slice.ts` | `auth.slice.ts` | Redux slices |

### Reglas de Dependencias

#### ✅ Dependencias Permitidas
- `domain/` → **Ninguna dependencia externa**
- `data/` → `domain/`
- `presentation/` → `domain/`, `data/`
- `app/` → `presentation/`, `ui/`
- `store/` → `domain/`, `data/`

#### ❌ Dependencias Prohibidas
- `domain/` no puede depender de nada
- Módulos no pueden importar directamente de otros módulos
- UI no puede depender directamente de `data/` o `services/`

**Ejemplo de Violación:**
```typescript
// ❌ PROHIBIDO - mod-auth importando de mod-home
import { ProfileDTO } from '@apps/mod-home/data/models/ProfileDTO.model';

// ✅ CORRECTO - usar libs/ compartidas
import { BaseUserDTO } from '@libs/domain/interfaces/User.interface';
```

### Exportaciones y Imports

#### Exportaciones Nombradas (Preferidas)
```typescript
// ✅ Preferido
export const LoginUseCase = {
  execute: async (credentials: LoginCredentials) => { }
};

// ❌ Evitar default exports
export default LoginUseCase;
```

#### Path Aliases
```typescript
// ✅ Usar aliases definidos
import { User } from '@apps/mod-auth/domain/entities/User.entity';
import { apiClient } from '@libs/services/clients/apiClient';
import { Button } from '@libs/ui/components/Button';

// ❌ Evitar imports relativos largos
import { User } from '../../../mod-auth/domain/entities/User.entity';
```

### Testing Co-ubicado

```typescript
// Login.page.tsx
export const LoginPage = () => { };

// Login.test.tsx (mismo directorio)
describe('LoginPage', () => {
  it('should render login form', () => { });
});
```

---

## 🔧 Implementación por Fases

### Fase 1: Corrección de Estructura Base
- Corregir path aliases rotos
- Reorganizar archivos según convenciones
- Eliminar cross-module dependencies

### Fase 2: Implementación de Capas
- Separar lógica de negocio en `domain/`
- Crear mappers en `data/`
- Implementar ViewModels en `presentation/`

### Fase 3: Testing y Optimización
- Implementar tests co-ubicados
- Configurar coverage mínimo 85%
- Optimizar imports y tree-shaking

---

## 🌐 Adaptaciones para Desarrollo Web

### Diferencias Clave con Next.js + Nx

| Aspecto | Mobile (React Native) | Web (Next.js + Nx) |
|---------|----------------------|-------------------|
| **Estructura** | `src/apps/mod-*` | `apps/web-*` (proyectos Nx) |
| **Navegación** | React Navigation | Next.js App Router |
| **Pantallas** | `*.page.tsx` | `page.tsx` por carpeta |
| **Layouts** | Componentes | `layout.tsx` |
| **Estilos** | Styled Components | CSS Modules / Tailwind |
| **Routing** | Navigation stacks | File-system routing |

### Configuración Nx (Referencial)
```json
// project.json en cada app web
{
  "name": "web-auth",
  "sourceRoot": "apps/web-auth/src",
  "targets": {
    "build": { "executor": "@nx/next:build" },
    "test": { "executor": "@nx/jest:jest" }
  }
}
```

---

## ✅ Checklist de Cumplimiento Arquitectónico

### Estructura de Módulos
- [ ] Cada módulo tiene las 7 capas definidas
- [ ] `domain/` no tiene dependencias externas
- [ ] Interfaces en `domain/`, implementaciones en `data/`
- [ ] ViewModels conectan use cases con UI

### Convenciones de Código
- [ ] Sufijos de archivos según tabla de nomenclatura
- [ ] Exportaciones nombradas (evitar default)
- [ ] Path aliases configurados y funcionando
- [ ] Tests co-ubicados con código

### Clean Architecture
- [ ] Dependencias unidireccionales respetadas
- [ ] Sin cross-module dependencies
- [ ] Separación clara UI ↔ Lógica de negocio
- [ ] DTOs mapeados a entidades de dominio

### Calidad y Testing
- [ ] Coverage mínimo 85% en use cases
- [ ] Tests unitarios para cada capa
- [ ] Mocks apropiados para dependencies
- [ ] Lint y format configurados correctamente

---

## 🎯 Resultado Esperado

### Beneficios de Implementación Completa
- **Mantenibilidad**: Código organizado y fácil de modificar
- **Escalabilidad**: Nuevos módulos siguen patrones establecidos
- **Testabilidad**: Cada capa es testeable independientemente
- **Colaboración**: Estructura clara para múltiples desarrolladores
- **Performance**: Tree-shaking optimizado y builds eficientes

### Métricas de Éxito
- 95% cumplimiento con estándares arquitectónicos
- Tiempo de onboarding reducido en 60%
- Bugs en producción reducidos en 40%
- Velocidad de desarrollo de features +25%

---

## 🔗 Referencias y Recursos

- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Native Navigation](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

---

**Elaborado por:** Arquitectura de Software JAFRA
**Revisado por:** Tech Lead JAFRA
**Destinatario:** Equipo de desarrollo y consultores externos
**Fecha:** Agosto 2025
**Proyecto:** JAFRA Plus Mobile (Arquitectura Clean)
**Clasificación:** Estándares Técnicos - Arquitectura Frontend
**Versión:** 2.0