// Jest setup file for React Native testing
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useFocusEffect: jest.fn(),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock Redux store
jest.mock('./src/store/store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

// Mock styled-components
jest.mock('styled-components/native', () => {
  const styled = require('styled-components/native');
  return {
    ...styled,
    ThemeProvider: ({ children }) => children,
  };
});

// Mock Lucide icons
jest.mock('lucide-react-native', () => ({
  Home: 'MockedHomeIcon',
  Search: 'MockedSearchIcon',
  Calendar: 'MockedCalendarIcon',
  User: 'MockedUserIcon',
  Settings: 'MockedSettingsIcon',
}));

// Global test utilities
global.console = {
  ...console,
  // Suppress console.warn and console.error in tests
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup test environment
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});