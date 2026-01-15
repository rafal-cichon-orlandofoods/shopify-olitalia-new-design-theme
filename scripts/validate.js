#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const chalk = require('chalk');

class ProjectValidator {
  constructor() {
    this.projectRoot = process.cwd();
    this.validationResults = {
      namingConventions: { passed: [], failed: [] },
      fileReferences: { passed: [], failed: [] },
      cssStructure: { passed: [], failed: [] },
      shopifyCompliance: { passed: [], failed: [] },
      duplicates: { passed: [], failed: [] }
    };
  }

  async validate() {
    console.log(chalk.blue('🔍 Starting project validation...'));
    
    await this.validateNamingConventions();
    await this.validateFileReferences();
    await this.validateCSSStructure();
    await this.validateShopifyCompliance();
    await this.validateNoDuplicates();
    
    await this.generateValidationReport();
    
    const hasFailures = Object.values(this.validationResults).some(result => result.failed.length > 0);
    
    if (hasFailures) {
      console.log(chalk.red('❌ Validation completed with failures'));
      process.exit(1);
    } else {
      console.log(chalk.green('✅ All validations passed!'));
    }
  }

  async validateNamingConventions() {
    console.log(chalk.yellow('📝 Validating naming conventions...'));
    
    const assetFiles = glob.sync('assets/*.{css,js}', { cwd: this.projectRoot });
    const validPrefixes = ['component-', 'section-', 'page-', 'base-', 'utility-', 'vendor-'];
    
    for (const file of assetFiles) {
      const fileName = path.basename(file);
      const hasValidPrefix = validPrefixes.some(prefix => fileName.startsWith(prefix));
      
      if (hasValidPrefix) {
        this.validationResults.namingConventions.passed.push(file);
      } else {
        this.validationResults.namingConventions.failed.push({
          file,
          issue: `File does not follow naming convention. Expected prefixes: ${validPrefixes.join(', ')}`
        });
      }
    }
  }

  async validateFileReferences() {
    console.log(chalk.yellow('🔗 Validating file references...'));
    
    const liquidFiles = glob.sync('{sections,snippets,templates}/**/*.liquid', { cwd: this.projectRoot });
    
    for (const file of liquidFiles) {
      const filePath = path.join(this.projectRoot, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Find asset references
      const assetMatches = content.match(/asset_url:\s*['"`]([^'"`]+)['"`]/g) || [];
      
      for (const match of assetMatches) {
        const assetName = match.match(/['"`]([^'"`]+)['"`]/)[1];
        const assetPath = path.join(this.projectRoot, 'assets', assetName);
        
        if (await fs.pathExists(assetPath)) {
          this.validationResults.fileReferences.passed.push({
            file,
            reference: assetName
          });
        } else {
          this.validationResults.fileReferences.failed.push({
            file,
            reference: assetName,
            issue: `Referenced asset does not exist: ${assetName}`
          });
        }
      }
      
      // Find snippet/section includes
      const includeMatches = content.match(/{%\s*(?:include|render)\s+['"`]([^'"`]+)['"`]/g) || [];
      
      for (const match of includeMatches) {
        const snippetName = match.match(/['"`]([^'"`]+)['"`]/)[1];
        const snippetPath = path.join(this.projectRoot, 'snippets', `${snippetName}.liquid`);
        
        if (await fs.pathExists(snippetPath)) {
          this.validationResults.fileReferences.passed.push({
            file,
            reference: snippetName
          });
        } else {
          this.validationResults.fileReferences.failed.push({
            file,
            reference: snippetName,
            issue: `Referenced snippet does not exist: ${snippetName}.liquid`
          });
        }
      }
    }
  }

  async validateCSSStructure() {
    console.log(chalk.yellow('🎨 Validating CSS structure...'));
    
    const cssFiles = glob.sync('assets/*.css', { cwd: this.projectRoot });
    
    for (const file of cssFiles) {
      const filePath = path.join(this.projectRoot, file);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const ast = postcss.parse(content);
        
        let hasExcessiveImportant = false;
        let importantCount = 0;
        let totalDeclarations = 0;
        
        ast.walkDecls(decl => {
          totalDeclarations++;
          if (decl.important) {
            importantCount++;
          }
        });
        
        // Flag files with more than 10% !important declarations
        if (totalDeclarations > 0 && (importantCount / totalDeclarations) > 0.1) {
          hasExcessiveImportant = true;
        }
        
        if (hasExcessiveImportant) {
          this.validationResults.cssStructure.failed.push({
            file,
            issue: `Excessive !important usage: ${importantCount}/${totalDeclarations} (${Math.round((importantCount / totalDeclarations) * 100)}%)`
          });
        } else {
          this.validationResults.cssStructure.passed.push(file);
        }
        
      } catch (error) {
        this.validationResults.cssStructure.failed.push({
          file,
          issue: `CSS parsing error: ${error.message}`
        });
      }
    }
  }

  async validateShopifyCompliance() {
    console.log(chalk.yellow('🛍️ Validating Shopify theme compliance...'));
    
    const requiredDirectories = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
    const requiredFiles = [
      'config/settings_schema.json',
      'locales/en.default.json'
    ];
    
    // Check required directories
    for (const dir of requiredDirectories) {
      const dirPath = path.join(this.projectRoot, dir);
      if (await fs.pathExists(dirPath)) {
        this.validationResults.shopifyCompliance.passed.push(`Directory: ${dir}`);
      } else {
        this.validationResults.shopifyCompliance.failed.push({
          item: `Directory: ${dir}`,
          issue: 'Required Shopify theme directory missing'
        });
      }
    }
    
    // Check required files
    for (const file of requiredFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (await fs.pathExists(filePath)) {
        this.validationResults.shopifyCompliance.passed.push(`File: ${file}`);
      } else {
        this.validationResults.shopifyCompliance.failed.push({
          item: `File: ${file}`,
          issue: 'Required Shopify theme file missing'
        });
      }
    }
    
    // Validate theme.liquid exists in layout
    const themeLayoutPath = path.join(this.projectRoot, 'layout', 'theme.liquid');
    if (await fs.pathExists(themeLayoutPath)) {
      this.validationResults.shopifyCompliance.passed.push('Layout: theme.liquid');
    } else {
      this.validationResults.shopifyCompliance.failed.push({
        item: 'Layout: theme.liquid',
        issue: 'Main theme layout file missing'
      });
    }
  }

  async validateNoDuplicates() {
    console.log(chalk.yellow('🔍 Validating no duplicate functionality...'));
    
    const assetFiles = glob.sync('assets/*.{css,js}', { cwd: this.projectRoot });
    const nameGroups = new Map();
    
    // Group files by base name (ignoring prefixes)
    for (const file of assetFiles) {
      const fileName = path.basename(file);
      const baseName = fileName
        .replace(/^(component-|section-|page-|base-|utility-|vendor-)/, '')
        .replace(/\.(css|js)$/, '');
      
      if (!nameGroups.has(baseName)) {
        nameGroups.set(baseName, []);
      }
      nameGroups.get(baseName).push(file);
    }
    
    // Check for duplicates
    nameGroups.forEach((files, baseName) => {
      if (files.length > 1) {
        // Check if these are legitimate related files (e.g., component-cart.css and component-cart.js)
        const extensions = files.map(f => path.extname(f));
        const uniqueExtensions = [...new Set(extensions)];
        
        if (uniqueExtensions.length === files.length) {
          // Different file types with same base name - this is good
          this.validationResults.duplicates.passed.push({
            baseName,
            files,
            reason: 'Related files with different extensions'
          });
        } else {
          // Same file types with same base name - potential duplicate
          this.validationResults.duplicates.failed.push({
            baseName,
            files,
            issue: 'Multiple files with same base name and extension type'
          });
        }
      } else {
        this.validationResults.duplicates.passed.push({
          baseName,
          files,
          reason: 'Unique file'
        });
      }
    });
  }

  async generateValidationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        namingConventions: {
          passed: this.validationResults.namingConventions.passed.length,
          failed: this.validationResults.namingConventions.failed.length
        },
        fileReferences: {
          passed: this.validationResults.fileReferences.passed.length,
          failed: this.validationResults.fileReferences.failed.length
        },
        cssStructure: {
          passed: this.validationResults.cssStructure.passed.length,
          failed: this.validationResults.cssStructure.failed.length
        },
        shopifyCompliance: {
          passed: this.validationResults.shopifyCompliance.passed.length,
          failed: this.validationResults.shopifyCompliance.failed.length
        },
        duplicates: {
          passed: this.validationResults.duplicates.passed.length,
          failed: this.validationResults.duplicates.failed.length
        }
      },
      details: this.validationResults
    };
    
    const reportPath = path.join(this.projectRoot, 'validation-report.json');
    await fs.writeJson(reportPath, report, { spaces: 2 });
    
    console.log(chalk.green(`📊 Validation report saved: ${reportPath}`));
    
    // Print summary
    console.log(chalk.blue('\n📋 VALIDATION SUMMARY'));
    Object.entries(report.summary).forEach(([category, results]) => {
      const status = results.failed > 0 ? chalk.red('❌') : chalk.green('✅');
      console.log(`${status} ${category}: ${results.passed} passed, ${results.failed} failed`);
    });
    
    // Print failures
    Object.entries(this.validationResults).forEach(([category, results]) => {
      if (results.failed.length > 0) {
        console.log(chalk.red(`\n❌ ${category.toUpperCase()} FAILURES:`));
        results.failed.forEach(failure => {
          if (typeof failure === 'string') {
            console.log(`  ${failure}`);
          } else {
            console.log(`  ${failure.file || failure.item}: ${failure.issue}`);
          }
        });
      }
    });
  }
}

// CLI interface
if (require.main === module) {
  const validator = new ProjectValidator();
  validator.validate().catch(console.error);
}

module.exports = ProjectValidator;