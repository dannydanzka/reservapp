/**
 * Scripts Index
 *
 * Centralized script management for ReservApp Mobile
 * Provides programmatic access to all build and development scripts
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * Execute a script with proper error handling
 * @param {string} scriptPath - Path to the script
 * @param {string[]} args - Script arguments
 * @param {object} options - Execution options
 */
const executeScript = (scriptPath, args = [], options = {}) => {
  try {
    const fullPath = path.resolve(__dirname, scriptPath);
    const command = `${fullPath} ${args.join(' ')}`;

    console.log(`Executing: ${command}`);

    const result = execSync(command, {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
      ...options,
    });

    return result;
  } catch (error) {
    console.error(`Script execution failed: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Available scripts
 */
const scripts = {
  buildAndroid: (args = []) => executeScript('build/android-build.sh', args),
  // Build scripts
  buildIOS: (args = []) => executeScript('build/ios-build.sh', args),

  // Utility functions
  help: () => {
    console.log('\nAvailable scripts:');
    console.log('  buildIOS([args])     - Build iOS app');
    console.log('  buildAndroid([args]) - Build Android app');
    console.log('  setup([args])        - Setup development environment');
    console.log('\nExample usage:');
    console.log('  const scripts = require("./scripts");');
    console.log('  scripts.buildIOS(["--release"]);');
    console.log('  scripts.buildAndroid(["--clean", "--install"]);');
    console.log('  scripts.setup();');
  },

  // Development scripts
  setup: (args = []) => executeScript('development/setup.sh', args),
};

// Export scripts
module.exports = scripts;

// CLI interface
if (require.main === module) {
  const [, , scriptName, ...args] = process.argv;

  if (!scriptName || !scripts[scriptName]) {
    console.error('Error: Invalid or missing script name');
    scripts.help();
    process.exit(1);
  }

  scripts[scriptName](args);
}
