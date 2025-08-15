#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImportVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.projectRoot = process.cwd();
    this.srcPath = path.join(this.projectRoot, 'src');
    this.tsConfigPath = path.join(this.projectRoot, 'tsconfig.json');
    this.babelConfigPath = path.join(this.projectRoot, 'babel.config.cjs');

    // Load configurations
    this.loadConfigurations();
  }

  loadConfigurations() {
    try {
      // Load tsconfig.json for path mappings
      if (fs.existsSync(this.tsConfigPath)) {
        this.tsConfig = JSON.parse(fs.readFileSync(this.tsConfigPath, 'utf8'));
      }

      // Load babel config for module resolver mappings
      if (fs.existsSync(this.babelConfigPath)) {
        // This is a simplified approach - in reality, babel configs can be more complex
        const babelContent = fs.readFileSync(this.babelConfigPath, 'utf8');
        this.babelConfig = { content: babelContent };
      }
    } catch (error) {
      this.warnings.push(`Warning: Could not load configuration files: ${error.message}`);
    }
  }

  // Get all TypeScript/JavaScript files in src directory
  getAllSourceFiles() {
    const files = [];
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];

    const walkDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip common directories that don't need checking
          if (!['node_modules', '.git', 'build', 'dist', '__tests__'].includes(entry.name)) {
            walkDir(fullPath);
          }
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    };

    if (fs.existsSync(this.srcPath)) {
      walkDir(this.srcPath);
    }

    // Also check root level files
    ['App.tsx', 'index.js', 'index.ts'].forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        files.push(filePath);
      }
    });

    return files;
  }

  // Extract imports from a file
  extractImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];

      // Match various import patterns
      const importPatterns = [
        // import something from 'module'
        /import\s+(?:(?:\{[^}]*\})|(?:\*\s+as\s+\w+)|(?:\w+))\s+from\s+['"`]([^'"`]+)['"`]/g,
        // import 'module'
        /import\s+['"`]([^'"`]+)['"`]/g,
        // require('module')
        /require\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
        // import('module') - dynamic import
        /import\(\s*['"`]([^'"`]+)['"`]\s*\)/g
      ];

      let match;
      for (const pattern of importPatterns) {
        while ((match = pattern.exec(content)) !== null) {
          const importPath = match[1];
          const lineNumber = content.substring(0, match.index).split('\n').length;
          imports.push({
            path: importPath,
            line: lineNumber,
            fullMatch: match[0]
          });
        }
      }

      return imports;
    } catch (error) {
      this.errors.push({
        type: 'FILE_READ_ERROR',
        file: filePath,
        message: `Could not read file: ${error.message}`
      });
      return [];
    }
  }

  // Check if an import path exists
  checkImportPath(importPath, sourceFile) {
    // Skip checking for these types of imports
    const skipPatterns = [
      /^react$/,
      /^react-native$/,
      /^@react-native/,
      /^@react-navigation/,
      /^@reduxjs/,
      /^react-redux$/,
      /^styled-components$/,
      /^styled-components\/native$/,  // Add native variant
      /^lucide-react-native$/,
      /^i18next$/,
      /^react-i18next$/,
      /^axios$/,
      /^uuid$/,
      /^await-to-js$/,
      /^redux-persist/,
      /^querystring$/,
      /^react-native-/,
      /^@.*\/.*$/, // Scoped packages
    ];

    if (skipPatterns.some(pattern => pattern.test(importPath))) {
      return { exists: true, type: 'EXTERNAL_PACKAGE' };
    }

    const sourceDir = path.dirname(sourceFile);
    let resolvedPath;

    // Handle different import types
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      // Relative import
      resolvedPath = path.resolve(sourceDir, importPath);
    } else if (importPath.startsWith('/')) {
      // Absolute import from root
      resolvedPath = path.join(this.projectRoot, importPath.substring(1));
    } else if (importPath.startsWith('@')) {
      // Path mapping import (like @components, @screens, etc.)
      return this.checkPathMappingImport(importPath, sourceFile);
    } else {
      // Could be a node module or relative import without ./
      resolvedPath = path.resolve(sourceDir, importPath);
    }

    // Try different file extensions
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

    for (const ext of extensions) {
      const fullPath = resolvedPath + ext;
      if (fs.existsSync(fullPath)) {
        return { exists: true, type: 'LOCAL_FILE', resolvedPath: fullPath };
      }
    }

    return { exists: false, type: 'NOT_FOUND', attemptedPath: resolvedPath };
  }

  // Check path mapping imports (like @components, @screens)
  checkPathMappingImport(importPath, sourceFile) {
    // Common path mappings based on the project structure (updated to match babel.config.cjs)
    const pathMappings = {
      '@': 'src',
      '@modules': 'src/modules',
      '@libs': 'src/libs',
      '@api': 'src/api',
      '@navigation': 'src/navigation',
      '@assets': 'src/libs/shared/assets',
      '@core': 'src/libs/core',
      '@shared': 'src/libs/shared',
      '@infrastructure': 'src/libs/infrastructure',
      '@presentation': 'src/libs/presentation',

      // Presentation layer
      '@components': 'src/libs/presentation/components',
      '@screens': 'src/libs/presentation/screens',
      '@hooks': 'src/libs/presentation/hooks',
      '@providers': 'src/libs/presentation/providers',
      '@layouts': 'src/libs/presentation/layouts',
      '@styles': 'src/libs/presentation/styles',

      // Infrastructure layer
      '@services': 'src/libs/infrastructure/services',
      '@state': 'src/libs/infrastructure/state',
      '@repositories': 'src/libs/infrastructure/repositories',
      '@store': 'src/libs/infrastructure/state',
      '@slices': 'src/libs/infrastructure/state/slices',

      // Shared resources
      '@config': 'src/libs/shared/config',
      '@types': 'src/libs/shared/types',
      '@constants': 'src/libs/shared/constants',
      '@utils': 'src/libs/shared/utils',
      '@i18n': 'src/libs/shared/i18n',

      // Core services
      '@auth': 'src/libs/infrastructure/services/core/auth',
      '@http': 'src/libs/infrastructure/services/core/http',

      // Modules
      '@mod-auth': 'src/modules/mod-auth',
      '@mod-reservation': 'src/modules/mod-reservation',
      '@mod-notification': 'src/modules/mod-notification',
      '@mod-payments': 'src/modules/mod-payments',
      '@mod-profile': 'src/modules/mod-profile',
    };

    // Find matching path mapping
    const mappingKey = Object.keys(pathMappings).find(key => importPath.startsWith(key));

    if (!mappingKey) {
      return { exists: false, type: 'UNKNOWN_PATH_MAPPING', message: `Unknown path mapping: ${importPath}` };
    }

    const basePath = pathMappings[mappingKey];
    const remainingPath = importPath.substring(mappingKey.length);
    const fullPath = path.join(this.projectRoot, basePath, remainingPath);

    // Try different file extensions
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

    for (const ext of extensions) {
      const testPath = fullPath + ext;
      if (fs.existsSync(testPath)) {
        return { exists: true, type: 'PATH_MAPPING', resolvedPath: testPath };
      }
    }

    return {
      exists: false,
      type: 'PATH_MAPPING_NOT_FOUND',
      attemptedPath: fullPath,
      mapping: `${mappingKey} -> ${basePath}`
    };
  }

  // Verify all imports in the project
  verifyAllImports() {
    console.log('🔍 Verificando importaciones...\n');

    const files = this.getAllSourceFiles();
    console.log(`📁 Archivos encontrados: ${files.length}`);

    let totalImports = 0;
    let errorCount = 0;

    for (const file of files) {
      const relativePath = path.relative(this.projectRoot, file);
      const imports = this.extractImports(file);
      totalImports += imports.length;

      for (const importInfo of imports) {
        const result = this.checkImportPath(importInfo.path, file);

        if (!result.exists) {
          errorCount++;
          this.errors.push({
            type: result.type || 'IMPORT_NOT_FOUND',
            file: relativePath,
            line: importInfo.line,
            import: importInfo.path,
            fullMatch: importInfo.fullMatch,
            message: result.message || `Import not found: ${importInfo.path}`,
            suggestion: this.getSuggestion(importInfo.path, result)
          });
        }
      }
    }

    return { totalImports, errorCount, files: files.length };
  }

  // Get suggestions for fixing import errors
  getSuggestion(importPath, result) {
    const suggestions = [];

    if (result.type === 'PATH_MAPPING_NOT_FOUND') {
      suggestions.push(`Path mapping: ${result.mapping}`);
      suggestions.push(`Attempted path: ${result.attemptedPath}`);
      suggestions.push('Check if the file exists or if the path mapping is correct in babel.config.cjs or tsconfig.json');
    } else if (result.type === 'UNKNOWN_PATH_MAPPING') {
      suggestions.push('Add this path mapping to babel.config.cjs or tsconfig.json');
      suggestions.push('Or use relative imports like ./components/ComponentName');
    } else if (result.type === 'NOT_FOUND') {
      suggestions.push(`Check if the file exists at: ${result.attemptedPath}`);
      suggestions.push('Verify file extension (.ts, .tsx, .js, .jsx)');
      suggestions.push('Check for typos in the import path');
    }

    return suggestions;
  }

  // Run TypeScript compilation check
  runTypeScriptCheck() {
    try {
      console.log('\n🔧 Ejecutando verificación de TypeScript...');
      execSync('npx tsc --noEmit --skipLibCheck', {
        stdio: 'pipe',
        cwd: this.projectRoot
      });
      console.log('✅ TypeScript: Sin errores de tipos');
      return true;
    } catch (error) {
      console.log('❌ TypeScript: Errores encontrados');
      console.log(error.stdout?.toString() || error.message);
      return false;
    }
  }

  // Run ESLint check for imports
  runESLintImportCheck() {
    try {
      console.log('\n🔧 Ejecutando verificación de imports con ESLint...');
      execSync('npx eslint . --ext .ts,.tsx --no-eslintrc --config eslint.config.js --rule "import/no-unresolved: error"', { 
        stdio: 'pipe',
        cwd: this.projectRoot
      });
      console.log('✅ ESLint imports: Sin errores de resolución');
      return true;
    } catch (error) {
      console.log('❌ ESLint imports: Errores encontrados');
      const output = error.stdout?.toString() || error.message;
      // Filter only import-related errors
      const importErrors = output.split('\n').filter(line =>
        line.includes('import/no-unresolved') ||
        line.includes('Unable to resolve path')
      );
      if (importErrors.length > 0) {
        console.log(importErrors.join('\n'));
      }
      return false;
    }
  }

  // Generate report
  generateReport() {
    const stats = this.verifyAllImports();

    console.log('\n📊 REPORTE DE IMPORTACIONES');
    console.log('==========================================');
    console.log(`📁 Archivos verificados: ${stats.files}`);
    console.log(`📦 Importaciones totales: ${stats.totalImports}`);
    console.log(`❌ Errores encontrados: ${stats.errorCount}`);
    console.log(`⚠️  Advertencias: ${this.warnings.length}`);

    if (this.warnings.length > 0) {
      console.log('\n⚠️  ADVERTENCIAS:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORES DETALLADOS:');
      console.log('==========================================');

      this.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.type}`);
        console.log(`   📂 Archivo: ${error.file}:${error.line || '?'}`);
        console.log(`   📦 Import: ${error.import}`);
        console.log(`   💬 Mensaje: ${error.message}`);

        if (error.suggestion && error.suggestion.length > 0) {
          console.log(`   💡 Sugerencias:`);
          error.suggestion.forEach(suggestion => {
            console.log(`      • ${suggestion}`);
          });
        }
      });

      console.log('\n🔧 COMANDOS PARA DIAGNOSTICAR:');
      console.log('==========================================');
      console.log('npx tsc --noEmit          # Verificar tipos TypeScript');
      console.log('yarn lint:js              # Verificar sintaxis ESLint');
      console.log('yarn type-check           # Verificar tipos solamente');
      console.log('tree src/                 # Ver estructura de archivos');

    } else {
      console.log('\n✅ ¡Todas las importaciones están correctas!');
    }

    // Run additional checks
    const tsCheck = this.runTypeScriptCheck();

    console.log('\n📋 RESUMEN FINAL:');
    console.log('==========================================');
    console.log(`Import verification: ${stats.errorCount === 0 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`TypeScript check: ${tsCheck ? '✅ PASS' : '❌ FAIL'}`);

    return stats.errorCount === 0 && tsCheck;
  }
}

// Run the verification
if (require.main === module) {
  const verifier = new ImportVerifier();
  const success = verifier.generateReport();

  process.exit(success ? 0 : 1);
}

module.exports = ImportVerifier;