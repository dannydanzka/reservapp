import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock lucide-react-native
jest.mock('lucide-react-native', () => {
  const React = require('react');
  return new Proxy({}, {
    get: (target, name) => {
      if (name === '__esModule') return true;
      return React.forwardRef((props: any, ref: any) => 
        React.createElement('Text', { ...props, ref }, name.toString())
      );
    }
  });
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Mock styled-components
jest.mock('styled-components/native', () => ({
  __esModule: true,
  default: (component: any) => component,
  css: (strings: TemplateStringsArray) => strings.join(''),
  ThemeProvider: ({ children }: any) => children,
}));

// Global test timeout
jest.setTimeout(10000);