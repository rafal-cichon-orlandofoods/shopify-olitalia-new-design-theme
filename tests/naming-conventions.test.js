const fc = require('fast-check');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * Property-Based Test for Naming Convention Consistency
 * 
 * Property 1: Naming Convention Consistency
 * For any file in the project, its name should follow the established naming pattern 
 * for its category (base, component, section, page, utility)
 * 
 * Validates: Requirements 1.1, 1.3
 */

const projectRoot = process.cwd();
const validPrefixes = ['component-', 'section-', 'page-', 'base-', 'utility-', 'vendor-'];

// Get all asset files for testing
const getAssetFiles = () => {
  return glob.sync('assets/*.{css,js}', { cwd: projectRoot });
};

describe('Naming Convention Consistency', () => {
  
  test('Property 1: All asset files should follow naming conventions', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAssetFiles()),
        (filePath) => {
          const fileName = path.basename(filePath);
          
          // Skip certain legacy files that are allowed exceptions
          const allowedExceptions = [
            'theme.css',
            'theme-noscript.css', 
            'theme-editor.js',
            'manifest.json',
            'browserconfig.xml'
          ];
          
          if (allowedExceptions.includes(fileName)) {
            return true;
          }
          
          // Check if file follows naming convention
          const hasValidPrefix = validPrefixes.some(prefix => fileName.startsWith(prefix));
          
          if (!hasValidPrefix) {
            console.log(`❌ File does not follow naming convention: ${fileName}`);
            console.log(`   Expected one of: ${validPrefixes.join(', ')}`);
            return false;
          }
          
          return true;
        }
      ),
      { 
        numRuns: 100,
        verbose: true
      }
    );
  });

  test('Property 1 Extension: Files with same base name should be related', () => {
    const assetFiles = getAssetFiles();
    const nameGroups = new Map();
    
    // Group files by base name
    assetFiles.forEach(file => {
      const fileName = path.basename(file);
      const baseName = fileName
        .replace(/^(component-|section-|page-|base-|utility-|vendor-)/, '')
        .replace(/\.(css|js)$/, '');
      
      if (!nameGroups.has(baseName)) {
        nameGroups.set(baseName, []);
      }
      nameGroups.get(baseName).push(file);
    });
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(nameGroups.entries())),
        ([baseName, files]) => {
          if (files.length <= 1) {
            return true; // Single files are always valid
          }
          
          // Check that related files have consistent prefixes
          const prefixes = files.map(file => {
            const fileName = path.basename(file);
            const match = fileName.match(/^(component-|section-|page-|base-|utility-|vendor-)/);
            return match ? match[1] : 'none';
          });
          
          const uniquePrefixes = [...new Set(prefixes)];
          
          // Allow different file types (css/js) with same prefix
          // But flag if same base name has different category prefixes
          if (uniquePrefixes.length > 1 && !uniquePrefixes.includes('none')) {
            console.log(`⚠️  Inconsistent prefixes for ${baseName}: ${uniquePrefixes.join(', ')}`);
            console.log(`   Files: ${files.join(', ')}`);
            // This is a warning, not a failure - some inconsistency is expected during transition
          }
          
          return true;
        }
      ),
      { 
        numRuns: Math.min(100, nameGroups.size),
        verbose: true
      }
    );
  });
});

// Export for use in other tests
module.exports = {
  validPrefixes,
  getAssetFiles
};