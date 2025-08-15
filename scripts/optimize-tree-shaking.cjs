#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TreeShakingOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.srcPath = path.join(this.projectRoot, 'src');
    this.changes = [];
  }

  // Find all component files that need optimization
  findComponentFiles() {
    const componentFiles = [];
    const walkDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!['node_modules', '.git', 'build', 'dist', '__tests__'].includes(entry.name)) {
            walkDir(fullPath);
          }
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
          // Skip index files and styled files
          if (!entry.name.includes('index') && !entry.name.includes('styled') && !entry.name.includes('types')) {
            componentFiles.push(fullPath);
          }
        }
      }
    };

    if (fs.existsSync(this.srcPath)) {
      walkDir(this.srcPath);
    }

    return componentFiles;
  }

  // Check if file has export default that should be named export
  shouldOptimizeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Skip if it's a navigation file or main component
      if (content.includes('createStackNavigator') || 
          content.includes('createBottomTabNavigator') ||
          content.includes('createDrawerNavigator') ||
          filePath.includes('App.tsx') ||
          filePath.includes('RootNavigator')) {
        return false;
      }

      // Check for React component with export default
      const hasReactComponent = content.includes('React.FC') || content.includes(': FC');
      const hasExportDefault = content.includes('export default');
      const hasComponentDeclaration = /const\s+\w+.*=.*React\.FC/.test(content);

      return hasReactComponent && hasExportDefault && hasComponentDeclaration;
    } catch (error) {
      console.warn(`Warning: Could not read ${filePath}: ${error.message}`);
      return false;
    }
  }

  // Extract component name from file
  extractComponentName(filePath, content) {
    // Try to extract from export default line
    const exportDefaultMatch = content.match(/export\s+default\s+(\w+)/);
    if (exportDefaultMatch) {
      return exportDefaultMatch[1];
    }

    // Try to extract from component declaration
    const componentMatch = content.match(/const\s+(\w+).*=.*React\.FC/);
    if (componentMatch) {
      return componentMatch[1];
    }

    // Fallback to filename
    const filename = path.basename(filePath, path.extname(filePath));
    return filename;
  }

  // Optimize a single component file
  optimizeComponentFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = this.extractComponentName(filePath, content);

      if (!componentName) {
        console.warn(`Warning: Could not extract component name from ${filePath}`);
        return false;
      }

      // Replace const ComponentName with export const ComponentName
      let newContent = content.replace(
        new RegExp(`const\\s+${componentName}(.*=.*React\\.FC.*)`, 'g'),
        `export const ${componentName}$1`
      );

      // Remove export default line
      newContent = newContent.replace(
        new RegExp(`export\\s+default\\s+${componentName};?\\s*`, 'g'),
        ''
      );

      // Clean up extra newlines
      newContent = newContent.replace(/\n\n\n+/g, '\n\n');
      newContent = newContent.trim() + '\n';

      fs.writeFileSync(filePath, newContent);
      return { componentName, filePath };
    } catch (error) {
      console.error(`Error optimizing ${filePath}: ${error.message}`);
      return false;
    }
  }

  // Find and update index.ts files
  updateIndexFiles() {
    const indexFiles = [];
    
    const findIndexFiles = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!['node_modules', '.git', 'build', 'dist'].includes(entry.name)) {
            findIndexFiles(fullPath);
          }
        } else if (entry.name === 'index.ts' || entry.name === 'index.tsx') {
          indexFiles.push(fullPath);
        }
      }
    };

    findIndexFiles(this.srcPath);

    for (const indexFile of indexFiles) {
      this.updateIndexFile(indexFile);
    }
  }

  // Update a single index file
  updateIndexFile(indexPath) {
    try {
      const content = fs.readFileSync(indexPath, 'utf8');
      
      // Find export { default } patterns and try to convert them
      const defaultExportMatch = content.match(/export\s*\{\s*default\s*\}\s*from\s*['"](.+)['"]/);
      
      if (defaultExportMatch) {
        const importPath = defaultExportMatch[1];
        const componentFile = path.resolve(path.dirname(indexPath), importPath + '.tsx');
        
        if (fs.existsSync(componentFile)) {
          const componentContent = fs.readFileSync(componentFile, 'utf8');
          const componentName = this.extractComponentName(componentFile, componentContent);
          
          if (componentName && componentContent.includes(`export const ${componentName}`)) {
            const newContent = content.replace(
              /export\s*\{\s*default\s*\}\s*from\s*['"](.+)['"]/,
              `export { ${componentName} } from '$1'`
            );
            
            fs.writeFileSync(indexPath, newContent);
            console.log(`✅ Updated index file: ${path.relative(this.projectRoot, indexPath)}`);
          }
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not update index file ${indexPath}: ${error.message}`);
    }
  }

  // Find and update import statements
  updateImportStatements() {
    const allFiles = this.findAllTsFiles();
    
    for (const file of allFiles) {
      this.updateImportsInFile(file);
    }
  }

  findAllTsFiles() {
    const files = [];
    const walkDir = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!['node_modules', '.git', 'build', 'dist'].includes(entry.name)) {
            walkDir(fullPath);
          }
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
    };

    walkDir(this.srcPath);
    return files;
  }

  updateImportsInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      let hasChanges = false;

      // Find default imports that should be named imports
      const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
      
      for (const line of importLines) {
        // Look for: import ComponentName from './path'
        const defaultImportMatch = line.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
        
        if (defaultImportMatch) {
          const componentName = defaultImportMatch[1];
          const importPath = defaultImportMatch[2];
          
          // Skip if it's already a named import or if it's a library import
          if (line.includes('{') || !importPath.startsWith('.')) {
            continue;
          }

          // Check if the imported file has been optimized
          const resolvedPath = this.resolveImportPath(filePath, importPath);
          if (resolvedPath && this.hasNamedExport(resolvedPath, componentName)) {
            const newImportLine = line.replace(
              `import ${componentName} from`,
              `import { ${componentName} } from`
            );
            
            newContent = newContent.replace(line, newImportLine);
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Updated imports in: ${path.relative(this.projectRoot, filePath)}`);
      }
    } catch (error) {
      console.warn(`Warning: Could not update imports in ${filePath}: ${error.message}`);
    }
  }

  resolveImportPath(fromFile, importPath) {
    const fromDir = path.dirname(fromFile);
    let resolvedPath = path.resolve(fromDir, importPath);
    
    // Try different extensions
    const extensions = ['.tsx', '.ts', '/index.tsx', '/index.ts'];
    
    for (const ext of extensions) {
      const testPath = resolvedPath + ext;
      if (fs.existsSync(testPath)) {
        return testPath;
      }
    }
    
    return null;
  }

  hasNamedExport(filePath, componentName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return content.includes(`export const ${componentName}`) || 
             content.includes(`export { ${componentName} }`);
    } catch {
      return false;
    }
  }

  // Main optimization process
  run() {
    console.log('🚀 Starting Tree Shaking Optimization...\n');

    // Step 1: Optimize component files
    console.log('📦 Optimizing component files...');
    const componentFiles = this.findComponentFiles();
    let optimizedCount = 0;

    for (const file of componentFiles) {
      if (this.shouldOptimizeFile(file)) {
        const result = this.optimizeComponentFile(file);
        if (result) {
          optimizedCount++;
          this.changes.push(result);
          console.log(`✅ Optimized: ${result.componentName} in ${path.relative(this.projectRoot, result.filePath)}`);
        }
      }
    }

    // Step 2: Update index files
    console.log('\n📋 Updating index files...');
    this.updateIndexFiles();

    // Step 3: Update import statements
    console.log('\n🔄 Updating import statements...');
    this.updateImportStatements();

    // Summary
    console.log(`\n🎉 Tree Shaking Optimization Complete!`);
    console.log(`✨ Optimized ${optimizedCount} component files`);
    console.log(`📈 This should improve bundle size and tree shaking efficiency`);
    
    if (this.changes.length > 0) {
      console.log('\n📝 Optimized Components:');
      this.changes.forEach(change => {
        console.log(`   • ${change.componentName}`);
      });
    }
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new TreeShakingOptimizer();
  optimizer.run();
}

module.exports = TreeShakingOptimizer;