module.exports = {
  // Clear mocks between tests
  clearMocks: true,

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
  ],

  coverageDirectory: '<rootDir>/coverage',

  coverageReporters: ['text', 'lcov', 'html'],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // React Native specific configurations
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  // Performance optimizations
  maxWorkers: '50%',

  moduleDirectories: ['node_modules', '<rootDir>/'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  preset: 'react-native',

  resetMocks: true,

  restoreMocks: true,

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jsdom',

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/ios/', '<rootDir>/android/'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|react-redux|@reduxjs/toolkit)/)',
  ],
  verbose: true,
};
