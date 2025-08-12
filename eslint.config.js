import { fileURLToPath } from 'url';
import path from 'path';

import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import restrictedGlobals from 'eslint-restricted-globals';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

import js from '@eslint/js';

import { customImportOrderRule } from './scripts/eslint-rules/custom-import-order.js';
import { requireDefaultPropsRule } from './scripts/eslint-rules/require-default-props.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ESLint Configuration for React Native ReservApp Mobile
 * 
 * Adapted from web version with React Native specific adjustments:
 * - React Native plugin integration for mobile-specific rules
 * - TypeScript path mapping for custom aliases
 * - React Navigation and mobile-specific patterns
 * - React Native Metro bundler compatibility
 * - Mobile development best practices
 */

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/android/**',
      '**/ios/**',
      '**/.expo/**',
      '**/build/**',
      '**/coverage/**',
      'eslint.config.js',
      '.stylelintrc.cjs',
      'scripts/**/*.cjs',
      'scripts/eslint-rules/**',
      'jest.setup.js',
      'jest.config.cjs',
      'metro.config.js',
      'babel.config.js',
      'config/**/*.js',
      'config/**/*.cjs',
      'src/__tests__/__mocks__/**',
      'src/__tests__/examples/**',
      '**/__tests__/**/*.mock.js',
      '**/__tests__/**/setup/**/*.js',
      'test-eslint.ts', // Exclude temporary test file
    ],
  },
  js.configs.recommended,
  prettierConfig,
  // JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2020,
        ...globals.jest,
        // React Native globals
        __DEV__: 'readonly',
        global: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        XMLHttpRequest: 'readonly',
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      sourceType: 'module',
    },
    plugins: {
      'react-native': reactNativePlugin,
      custom: {
        rules: {
          'import-order': customImportOrderRule,
          'require-default-props': requireDefaultPropsRule,
        },
      },
      import: importPlugin,
      jest: jestPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
      'testing-library': testingLibraryPlugin,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
      'react-native/style-sheet-object': true,
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js', '.native.ts', '.ios.js', '.ios.ts', '.android.js', '.android.ts'],
        },
      },
      'import/extensions': [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.native.js',
        '.native.ts',
        '.ios.js', 
        '.ios.ts',
        '.android.js',
        '.android.ts',
      ],
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactNativePlugin.configs.all.rules,
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // React Native specific rules
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/split-platform-components': 'warn',
      
      // JSX-A11y rules adapted for React Native
      'jsx-a11y/accessible-emoji': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off', // Not applicable to React Native
      'jsx-a11y/no-static-element-interactions': 'off', // Not applicable to React Native
      'jsx-a11y/no-noninteractive-element-interactions': 'off', // Not applicable to React Native
      'jsx-a11y/anchor-is-valid': 'off', // No anchor tags in React Native
      'jsx-a11y/label-has-associated-control': 'off', // Different pattern in React Native
      'jsx-a11y/control-has-associated-label': 'warn',
      
      // React rules adapted for React Native
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unescaped-entities': 'warn',
      
      // Import rules
      'import/default': 'warn',
      'import/named': 'warn',
      'import/namespace': 'warn',
      'import/no-cycle': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'import/no-mutable-exports': 'warn',
      'import/no-named-as-default': 'warn',
      'import/no-namespace': 'off',
      'import/no-unused-modules': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',
      'import/no-unresolved': 'warn',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/max-dependencies': ['warn', { max: 20 }],

      // Other rules
      'consistent-return': 'warn',
      eqeqeq: 'warn',
      'func-names': 'warn',
      'global-require': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-alert': 'off',
      'no-await-in-loop': 'warn',
      'no-nested-ternary': 'off',
      'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
      'no-param-reassign': 'warn',
      'no-restricted-syntax': [
        'warn',
        {
          message: 'Avoid default exports. Use named exports instead.',
          selector: 'ExportDefaultDeclaration',
        },
      ],

      // React specific rules
      'react/jsx-no-bind': [
        'warn',
        {
          ignoreDOMComponents: true,
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: true,
          allowBind: false,
        },
      ],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/self-closing-comp': ['warn', { component: true, html: false }],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/destructuring-assignment': ['warn', 'always', { destructureInSignature: 'ignore' }],
      'react/display-name': 'warn',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-props-no-spreading': [
        'warn',
        {
          custom: 'ignore',
          explicitSpread: 'ignore',
          exceptions: ['View', 'Text', 'TouchableOpacity', 'ScrollView'],
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: false,
          shorthandFirst: false,
        },
      ],
      'react/no-array-index-key': 'off',
      'react/no-unstable-nested-components': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      // Sorting rules
      'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: false }],
      'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { caseSensitive: true, natural: false }],

      // Formatting
      'prettier/prettier': 'warn',
      'no-trailing-spaces': 'warn',
      'no-multi-spaces': 'warn',
      'eol-last': 'warn',
      'no-multiple-empty-lines': 'warn',
      'no-mixed-spaces-and-tabs': 'warn',
    },
  },
  // TypeScript files  
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2020,
        ...globals.jest,
        // React Native globals
        __DEV__: 'readonly',
        global: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        XMLHttpRequest: 'readonly',
        React: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react-native': reactNativePlugin,
      custom: {
        rules: {
          'import-order': customImportOrderRule,
          'require-default-props': requireDefaultPropsRule,
        },
      },
      import: importPlugin,
      jest: jestPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
      'testing-library': testingLibraryPlugin,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
      'react-native/style-sheet-object': true,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js', '.native.ts', '.ios.js', '.ios.ts', '.android.js', '.android.ts'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/extensions': [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.native.js',
        '.native.ts',
        '.ios.js', 
        '.ios.ts',
        '.android.js',
        '.android.ts',
      ],
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactNativePlugin.configs.all.rules,
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,

      // React Native specific rules
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off', // Allow text in Text components
      'react-native/split-platform-components': 'warn',
      
      // JSX-A11y rules adapted for React Native
      'jsx-a11y/accessible-emoji': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off', // Not applicable to React Native
      'jsx-a11y/no-static-element-interactions': 'off', // Not applicable to React Native
      'jsx-a11y/no-noninteractive-element-interactions': 'off', // Not applicable to React Native
      'jsx-a11y/anchor-is-valid': 'off', // No anchor tags in React Native
      'jsx-a11y/label-has-associated-control': 'off', // Different pattern in React Native
      'jsx-a11y/control-has-associated-label': 'warn',
      
      // React rules adapted for React Native
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unescaped-entities': 'warn',
      
      // TypeScript preferences - React Native adapted
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          fixToUnknown: false,
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      
      // Disable base ESLint rules that are covered by TypeScript equivalents
      'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      'no-use-before-define': 'off', // Handled by @typescript-eslint/no-use-before-define
      'no-shadow': 'off', // Handled by @typescript-eslint/no-shadow
      'no-undef': 'off', // TypeScript handles this better
      'no-redeclare': 'off', // Handled by @typescript-eslint/no-redeclare
      
      // TypeScript-specific rules (replacing ESLint equivalents)
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-shadow': 'warn', 
      '@typescript-eslint/no-redeclare': 'warn',
      
      // Additional TypeScript rules for better code quality
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'off', // Allow require in test setup files
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      
      // Custom import order rule
      'custom/import-order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'styled'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'builtin',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'react-native',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '@/**',
              position: 'after',
            },
            {
              group: 'styled',
              pattern: '**/*.styled',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
        },
      ],

      // Custom require-default-props - React Native adapted
      'custom/require-default-props': [
        'warn',
        {
          checkAllFunctions: false,
          exclude: ['children', 'navigation', 'route', 'style', 'testID', 'key', 'ref'],
        },
      ],

      'consistent-return': 'warn',
      'default-param-last': 'off',
      eqeqeq: 'warn',
      'func-names': 'warn',
      'global-require': 'warn',

      // Import rules
      'import/default': 'warn',
      'import/named': 'warn',
      'import/namespace': 'warn',
      'import/no-cycle': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'import/no-mutable-exports': 'warn',
      'import/no-named-as-default': 'warn',
      'import/no-namespace': 'off',
      'import/no-unused-modules': 'off',
      'import/order': 'off', // Using custom import order rule
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',
      'import/no-unresolved': 'warn',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/max-dependencies': ['warn', { max: 20 }], // Higher limit for React Native

      // Console statements - allow in React Native development
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'], // Allow more console methods for React Native debugging
        },
      ],

      'no-alert': 'off', // Alert is commonly used in React Native
      'no-await-in-loop': 'warn',
      'no-nested-ternary': 'off',
      'no-plusplus': [
        'warn',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      'no-param-reassign': 'warn',
      'no-restricted-syntax': [
        'warn',
        {
          message: 'Avoid default exports. Use named exports instead.',
          selector: 'ExportDefaultDeclaration',
        },
      ],

      // React specific rules adapted for React Native
      'react/jsx-no-bind': [
        'warn',
        {
          ignoreDOMComponents: true,
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: true,
          allowBind: false,
        },
      ],
      'react/jsx-curly-brace-presence': ['warn', {
        props: 'never',
        children: 'never'
      }],
      'react/self-closing-comp': ['warn', {
        component: true,
        html: false // Not applicable to React Native
      }],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/destructuring-assignment': [
        'warn',
        'always',
        {
          destructureInSignature: 'ignore',
        },
      ],
      'react/display-name': 'warn',
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.jsx', '.tsx'], // React Native uses .tsx primarily
        },
      ],
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-props-no-spreading': [
        'warn',
        {
          custom: 'ignore', // More permissive for React Native components
          explicitSpread: 'ignore',
          exceptions: ['View', 'Text', 'TouchableOpacity', 'ScrollView'],
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: false,
          shorthandFirst: false,
        },
      ],
      'react/no-array-index-key': 'off', // Common pattern in React Native lists
      'react/no-unstable-nested-components': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/require-default-props': 'off', // Using custom rule instead

      // Sorting rules
      'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: false }],
      'sort-keys-fix/sort-keys-fix': [
        'warn',
        'asc',
        {
          caseSensitive: true,
          natural: false,
        },
      ],

      // Formatting
      'prettier/prettier': 'warn',
      'no-trailing-spaces': 'warn',
      'no-multi-spaces': 'warn',
      'eol-last': 'warn',
      'no-multiple-empty-lines': 'warn',
      'no-mixed-spaces-and-tabs': 'warn',
      
      // React Native specific adjustments
      'jsx-a11y/no-autofocus': 'warn', // Allow but warn for autofocus
      'no-useless-escape': 'warn',
      'no-case-declarations': 'warn',
      'import/export': 'warn', // Multiple exports handling
      'testing-library/no-await-sync-queries': 'warn',
      'react-native/sort-styles': 'warn',
    },
  },
  // Import resolver improvements for TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Turn off problematic import rules for TypeScript
      'import/no-unresolved': 'off',
      'import/export': 'off',
    },
  },
  // React Navigation screens - allow default exports
  {
    files: ['src/**/screens/**/*.{ts,tsx}', 'src/navigation/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off',
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },
  // Styled components files
  {
    files: ['**/*.styled.{ts,tsx}'],
    rules: {
      'import/prefer-default-export': 'off',
      'no-unused-expressions': 'off',
    },
  },
  // Hook files
  {
    files: ['**/hooks/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      'consistent-return': 'off',
    },
  },
  // Test files - React Native Testing Library
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}', '**/setup.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off', // Allow require in test files
      'react/jsx-props-no-spreading': 'off',
      'no-alert': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/display-name': 'off',
      'react-native/no-inline-styles': 'off',
      'global-require': 'off', // Allow global require in test files
    },
  },
  // Services and API files
  {
    files: ['src/**/services/**/*.{ts,tsx}', 'src/**/api/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'warn', // Allow console in services for debugging
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  },
  // Config files
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-plusplus': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-restricted-syntax': 'off',
      'import/no-default-export': 'off',
    },
  },
];