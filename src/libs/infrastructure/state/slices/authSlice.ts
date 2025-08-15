import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authService } from '@auth/authService';
import { LoginCredentials, LoginSession, RegisterData, User } from '@shared/types';

import { clearSession, saveAuthToken, saveSession } from '../../services/core/utils/sessionStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastLogin: string | null;
}

// Async thunk para login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const session = await authService.login(credentials);
      return session;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
      return rejectWithValue(message);
    }
  }
);

// Async thunk para registro
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const session = await authService.register(userData);
      return session;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrar usuario';
      return rejectWithValue(message);
    }
  }
);

// Async thunk para obtener perfil
export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const user = await authService.getProfile();
    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener perfil';
    return rejectWithValue(message);
  }
});

// Async thunk para verificar token
export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, { rejectWithValue }) => {
  try {
    const user = await authService.verifyToken();
    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token inválido';
    return rejectWithValue(message);
  }
});

// Async thunk para logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue: _rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (_error) {
      // Incluso si falla el logout del servidor, limpiamos la sesión local
      if (__DEV__) {
        console.warn('Server logout failed, continuing with local logout');
      }
    }
    // Siempre limpiamos la sesión local
    // await clearSession(); // TODO: implement clearSession
  }
);

// Async thunk para forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(email);
      return { message: 'Email de recuperación enviado exitosamente' };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al enviar email de recuperación';
      return rejectWithValue(message);
    }
  }
);

// Async thunk para reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { token: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await authService.resetPassword(data.token, data.newPassword);
      return { message: 'Contraseña restablecida exitosamente' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al restablecer contraseña';
      return rejectWithValue(message);
    }
  }
);

// Async thunk para change password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    data: { currentPassword: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await authService.changePassword(data);
      return { message: 'Contraseña cambiada exitosamente' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cambiar contraseña';
      return rejectWithValue(message);
    }
  }
);

const initialState: AuthState = {
  error: null,
  isAuthenticated: false,
  isLoading: false,
  lastLogin: null,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.lastLogin = new Date().toISOString();
        // Save token to AsyncStorage
        saveAuthToken(action.payload.token);
        saveSession(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.lastLogin = new Date().toISOString();
        // Save token to AsyncStorage
        saveAuthToken(action.payload.token);
        saveSession(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Get profile cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify token cases
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
        state.lastLogin = null;
        // Clear session from AsyncStorage
        clearSession();
      })
      .addCase(logoutUser.rejected, (state) => {
        // Incluso si falla, limpiamos la sesión
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
        state.lastLogin = null;
        // Clear session from AsyncStorage even if logout failed
        clearSession();
      });
  },
  initialState,
  name: 'auth',
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      state.lastLogin = null;
      // Clear session from AsyncStorage
      clearSession();
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSession: (state, action: PayloadAction<LoginSession>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.lastLogin = new Date().toISOString();
      // Save token to AsyncStorage
      saveAuthToken(action.payload.token);
      saveSession(action.payload.user);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
});

export const { clearError, logout, setError, setLoading, setSession, setUser } = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectLastLogin = (state: { auth: AuthState }) => state.auth.lastLogin;
