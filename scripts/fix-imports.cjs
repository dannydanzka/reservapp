#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ImportFixer {
  constructor() {
    this.projectRoot = process.cwd();
    this.fixed = [];
    this.errors = [];
  }

  // Fix styled-components imports - change styled-components/native to styled-components (when used incorrectly)
  fixStyledComponentsImports() {
    console.log('🔧 Fixing styled-components imports...');

    const files = this.getAllStyledFiles();
    let fixedCount = 0;

    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;

        // Fix incorrect styled-components imports
        content = content.replace(
          /import\s+styled(?:\s+(?:\{[^}]*\}))?\s+from\s+['"`]styled-components\/native['"`]/g,
          "import styled from 'styled-components/native'"
        );

        // Ensure we're using the native version
        if (content.includes("import styled from 'styled-components'") && file.includes('.tsx')) {
          content = content.replace(
            "import styled from 'styled-components'",
            "import styled from 'styled-components/native'"
          );
        }

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          this.fixed.push(`Fixed styled-components import in ${path.relative(this.projectRoot, file)}`);
          fixedCount++;
        }
      } catch (error) {
        this.errors.push(`Error fixing styled-components in ${file}: ${error.message}`);
      }
    }

    console.log(`✅ Fixed ${fixedCount} styled-components imports`);
  }

  // Add missing @layouts path mapping to babel config
  addLayoutsPathMapping() {
    console.log('🔧 Adding @layouts path mapping...');

    const babelConfigPath = path.join(this.projectRoot, 'babel.config.cjs');

    try {
      let content = fs.readFileSync(babelConfigPath, 'utf8');

      // Check if @layouts mapping already exists
      if (content.includes('@layouts')) {
        console.log('ℹ️ @layouts mapping already exists');
        return;
      }

      // Add @layouts mapping to the alias section
      const layoutsMapping = `
        '@layouts': './src/libs/presentation/layouts',`;

      // Find the alias object and add the mapping
      if (content.includes("'@components': './src/libs/presentation/components'")) {
        content = content.replace(
          "'@components': './src/libs/presentation/components',",
          `'@components': './src/libs/presentation/components',${layoutsMapping}`
        );

        fs.writeFileSync(babelConfigPath, content, 'utf8');
        this.fixed.push('Added @layouts path mapping to babel.config.cjs');
        console.log('✅ Added @layouts path mapping');
      } else {
        console.log('⚠️ Could not find alias section in babel.config.cjs');
      }
    } catch (error) {
      this.errors.push(`Error adding @layouts mapping: ${error.message}`);
    }
  }

  // Fix specific import paths that are known to be incorrect
  fixKnownBadImports() {
    console.log('🔧 Fixing known problematic imports...');

    const fixes = [
      {
        from: '@providers/EnhancedAppProviders',
        to: '@presentation/providers/EnhancedAppProviders',
        reason: 'Correct path mapping'
      },
      {
        from: '@presentation/components/NotificationDisplay',
        to: '@components/NotificationDisplay/NotificationDisplay',
        reason: 'Correct component path'
      },
      {
        from: '@navigation/RootNavigator',
        to: './navigation/RootNavigator',
        reason: 'Use relative import for navigation'
      }
    ];

    let fixedCount = 0;
    const appFile = path.join(this.projectRoot, 'App.tsx');

    if (fs.existsSync(appFile)) {
      try {
        let content = fs.readFileSync(appFile, 'utf8');
        const originalContent = content;

        fixes.forEach(fix => {
          const importRegex = new RegExp(`from\\s+['"\`]${fix.from.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}['"\`]`, 'g');
          if (importRegex.test(content)) {
            content = content.replace(importRegex, `from '${fix.to}'`);
            this.fixed.push(`Fixed import: ${fix.from} → ${fix.to} (${fix.reason})`);
            fixedCount++;
          }
        });

        if (content !== originalContent) {
          fs.writeFileSync(appFile, content, 'utf8');
        }
      } catch (error) {
        this.errors.push(`Error fixing imports in App.tsx: ${error.message}`);
      }
    }

    console.log(`✅ Fixed ${fixedCount} known problematic imports`);
  }

  // Get all styled component files
  getAllStyledFiles() {
    const files = [];
    const extensions = ['.styled.ts', '.styled.tsx'];

    const walkDir = (dir) => {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!['node_modules', '.git', 'build', 'dist'].includes(entry.name)) {
            walkDir(fullPath);
          }
        } else if (extensions.some(ext => entry.name.endsWith(ext)) || (entry.name.endsWith('.tsx') && fs.readFileSync(fullPath, 'utf8').includes('styled-components'))) {
          files.push(fullPath);
        }
      }
    };

    walkDir(path.join(this.projectRoot, 'src'));
    return files;
  }

  // Run all fixes
  runAllFixes() {
    console.log('🚀 Starting import fixes...\n');

    // Run fixes
    this.fixStyledComponentsImports();
    this.addLayoutsPathMapping();
    this.fixKnownBadImports();

    // Generate report
    console.log('\n📊 IMPORT FIX REPORT');
    console.log('==========================================');
    console.log(`✅ Fixes applied: ${this.fixed.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);

    if (this.fixed.length > 0) {
      console.log('\n✅ SUCCESSFUL FIXES:');
      this.fixed.forEach((fix, index) => {
        console.log(`${index + 1}. ${fix}`);
      });
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    // Recommend running verification again
    console.log('\n🔄 NEXT STEPS:');
    console.log('==========================================');
    console.log('yarn verify:imports    # Check remaining import issues');
    console.log('yarn type-check        # Verify TypeScript compilation');
    console.log('yarn lint:js           # Check for linting errors');

    return this.errors.length === 0;
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new ImportFixer();
  const success = fixer.runAllFixes();

  process.exit(success ? 0 : 1);
}

module.exports = ImportFixer;