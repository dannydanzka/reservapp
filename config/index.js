/**
 * Configuration Index
 * 
 * Centralized configuration management for ReservApp Mobile
 * Following clean architecture and modular design principles
 */

// Build Configurations
module.exports.babel = require('./build/babel.config.cjs');
module.exports.metro = require('./build/metro.config.cjs');
module.exports.reactNative = require('./build/react-native.config.cjs');

// Environment Configurations  
module.exports.development = require('./environment/development.config.js');
module.exports.production = require('./environment/production.config.js');

// Deployment Configurations
module.exports.appStore = require('./deployment/app-store.config.js');

// Linting and Code Quality (consolidated)
module.exports.eslint = require('./linting/eslint.config.js');
module.exports.prettier = require('./linting/prettier.config.js');
module.exports.stylelint = require('./linting/stylelint.config.js');

// Testing Configuration
module.exports.jest = require('./testing/jest.config.js');

// Application Configuration
module.exports.app = require('./app.config.cjs');
module.exports.store = require('./store.config.js');

// TypeScript Configuration
module.exports.typescript = require('./typescript/tsconfig.json');

/**
 * Get configuration by environment
 * @param {string} env - Environment name (development, production, etc.)
 * @returns {object} Environment configuration
 */
module.exports.getConfig = (env = 'development') => {
  const configs = {
    development: module.exports.development,
    production: module.exports.production,
  };
  
  return configs[env] || configs.development;
};

/**
 * Get build configuration
 * @param {string} platform - Platform name (ios, android, web)
 * @returns {object} Build configuration
 */
module.exports.getBuildConfig = (platform = 'mobile') => {
  const buildConfigs = {
    mobile: {
      babel: module.exports.babel,
      metro: module.exports.metro,
    },
  };
  
  return buildConfigs[platform] || buildConfigs.mobile;
};
