#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const BackupManager = require('./backup');

class MigrationManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.backupManager = new BackupManager();
    this.migrationPlan = null;
    this.dryRun = false;
  }

  async loadMigrationPlan(planPath = 'migration-plan.json') {
    try {
      const fullPath = path.join(this.projectRoot, planPath);
      this.migrationPlan = await fs.readJson(fullPath);
      console.log(chalk.green(`✅ Loaded migration plan: ${planPath}`));
      return this.migrationPlan;
    } catch (error) {
      console.error(chalk.red(`❌ Failed to load migration plan: ${error.message}`));
      throw error;
    }
  }

  async generateMigrationPlan() {
    console.log(chalk.blue('📋 Generating migration plan...'));
    
    const plan = {
      version: '1.0.0',
      created: new Date().toISOString(),
      operations: []
    };

    // Analyze current structure and generate operations
    await this.analyzeRedesignFiles(plan);
    await this.analyzeOverrideFiles(plan);
    await this.analyzeNamingConventions(plan);
    
    // Save plan
    const planPath = path.join(this.projectRoot, 'migration-plan.json');
    await fs.writeJson(planPath, plan, { spaces: 2 });
    
    console.log(chalk.green(`📋 Migration plan saved: ${planPath}`));
    console.log(chalk.blue(`Total operations: ${plan.operations.length}`));
    
    return plan;
  }

  async analyzeRedesignFiles(plan) {
    const redesignFiles = glob.sync('assets/redesign-*.{css,js}', { cwd: this.projectRoot });
    
    for (const file of redesignFiles) {
      const baseName = path.basename(file).replace('redesign-', '').replace(/\.(css|js)$/, '');
      const extension = path.extname(file);
      const originalFile = `assets/section-${baseName}${extension}`;
      
      if (await fs.pathExists(path.join(this.projectRoot, originalFile))) {
        // Merge redesign with original
        plan.operations.push({
          type: 'merge',
          source: [file, originalFile],
          target: `assets/component-${baseName}${extension}`,
          description: `Merge redesign and original ${baseName} files`
        });
      } else {
        // Rename redesign file
        plan.operations.push({
          type: 'rename',
          source: file,
          target: `assets/component-${baseName}${extension}`,
          description: `Rename redesign ${baseName} to component pattern`
        });
      }
    }
  }

  async analyzeOverrideFiles(plan) {
    const overrideFiles = glob.sync('assets/*override*.css', { cwd: this.projectRoot });
    
    for (const file of overrideFiles) {
      plan.operations.push({
        type: 'integrate',
        source: file,
        target: 'determine-at-runtime',
        description: `Integrate override styles from ${file} into appropriate components`
      });
    }
  }

  async analyzeNamingConventions(plan) {
    // Find files that don't follow naming conventions
    const allFiles = glob.sync('assets/*.{css,js}', { cwd: this.projectRoot });
    
    for (const file of allFiles) {
      const fileName = path.basename(file);
      
      // Skip files that already follow conventions
      if (fileName.match(/^(component-|section-|page-|base-|utility-)/)) {
        continue;
      }
      
      // Skip redesign files (handled separately)
      if (fileName.startsWith('redesign-')) {
        continue;
      }
      
      // Determine appropriate category and new name
      const newName = this.determineNewFileName(fileName);
      if (newName !== fileName) {
        plan.operations.push({
          type: 'rename',
          source: file,
          target: `assets/${newName}`,
          description: `Rename ${fileName} to follow naming conventions`
        });
      }
    }
  }

  determineNewFileName(fileName) {
    // Logic to determine appropriate new file name based on content analysis
    if (fileName.includes('product')) return fileName.replace(/^/, 'component-');
    if (fileName.includes('cart')) return fileName.replace(/^/, 'component-');
    if (fileName.includes('header')) return fileName.replace(/^/, 'section-');
    if (fileName.includes('footer')) return fileName.replace(/^/, 'section-');
    if (fileName.includes('main-')) return fileName.replace(/^/, 'section-');
    
    // Default to component if unsure
    return fileName.replace(/^/, 'component-');
  }

  async executeMigration(dryRun = false) {
    this.dryRun = dryRun;
    
    if (!this.migrationPlan) {
      throw new Error('No migration plan loaded. Call loadMigrationPlan() first.');
    }

    console.log(chalk.blue(`🚀 ${dryRun ? 'Simulating' : 'Executing'} migration...`));
    
    if (!dryRun) {
      // Create backup before migration
      await this.backupManager.createBackup('Pre-migration backup');
    }

    const results = {
      successful: [],
      failed: [],
      skipped: []
    };

    for (const operation of this.migrationPlan.operations) {
      try {
        await this.executeOperation(operation);
        results.successful.push(operation);
        console.log(chalk.green(`✅ ${operation.type}: ${operation.description}`));
      } catch (error) {
        results.failed.push({ operation, error: error.message });
        console.error(chalk.red(`❌ ${operation.type} failed: ${operation.description}`));
        console.error(chalk.red(`   Error: ${error.message}`));
      }
    }

    // Generate migration report
    const report = {
      timestamp: new Date().toISOString(),
      dryRun,
      results,
      summary: {
        total: this.migrationPlan.operations.length,
        successful: results.successful.length,
        failed: results.failed.length,
        skipped: results.skipped.length
      }
    };

    const reportPath = path.join(this.projectRoot, `migration-report-${Date.now()}.json`);
    await fs.writeJson(reportPath, report, { spaces: 2 });

    console.log(chalk.blue('\n📊 MIGRATION SUMMARY'));
    console.log(`Total operations: ${report.summary.total}`);
    console.log(`Successful: ${report.summary.successful}`);
    console.log(`Failed: ${report.summary.failed}`);
    console.log(`Report saved: ${reportPath}`);

    return report;
  }

  async executeOperation(operation) {
    const sourcePath = path.join(this.projectRoot, operation.source);
    const targetPath = path.join(this.projectRoot, operation.target);

    if (this.dryRun) {
      console.log(chalk.yellow(`[DRY RUN] ${operation.type}: ${operation.source} -> ${operation.target}`));
      return;
    }

    switch (operation.type) {
      case 'rename':
        await this.renameFile(sourcePath, targetPath);
        break;
        
      case 'merge':
        await this.mergeFiles(operation.source, targetPath);
        break;
        
      case 'integrate':
        await this.integrateOverrideFile(sourcePath);
        break;
        
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }

  async renameFile(sourcePath, targetPath) {
    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));
    
    // Move file
    await fs.move(sourcePath, targetPath);
    
    // Update references in other files
    await this.updateFileReferences(path.basename(sourcePath), path.basename(targetPath));
  }

  async mergeFiles(sourceFiles, targetPath) {
    const mergedContent = [];
    
    for (const sourceFile of sourceFiles) {
      const fullPath = path.join(this.projectRoot, sourceFile);
      if (await fs.pathExists(fullPath)) {
        const content = await fs.readFile(fullPath, 'utf8');
        mergedContent.push(`/* Merged from ${sourceFile} */`);
        mergedContent.push(content);
        mergedContent.push('');
      }
    }
    
    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));
    
    // Write merged content
    await fs.writeFile(targetPath, mergedContent.join('\n'));
    
    // Remove source files
    for (const sourceFile of sourceFiles) {
      const fullPath = path.join(this.projectRoot, sourceFile);
      if (await fs.pathExists(fullPath)) {
        await fs.remove(fullPath);
      }
    }
  }

  async integrateOverrideFile(overrideFilePath) {
    // This is a placeholder - actual implementation would analyze
    // the override file and integrate styles into appropriate components
    console.log(chalk.yellow(`⚠️  Override integration not yet implemented: ${overrideFilePath}`));
  }

  async updateFileReferences(oldFileName, newFileName) {
    // Update references in Liquid files
    const liquidFiles = glob.sync('{sections,snippets,templates}/**/*.liquid', { cwd: this.projectRoot });
    
    for (const file of liquidFiles) {
      const filePath = path.join(this.projectRoot, file);
      let content = await fs.readFile(filePath, 'utf8');
      
      // Update asset_url references
      const oldRef = oldFileName.replace(/\.(css|js)$/, '');
      const newRef = newFileName.replace(/\.(css|js)$/, '');
      
      if (content.includes(oldRef)) {
        content = content.replace(new RegExp(oldRef, 'g'), newRef);
        await fs.writeFile(filePath, content);
        console.log(chalk.blue(`Updated references in: ${file}`));
      }
    }
  }
}

// CLI interface
if (require.main === module) {
  const manager = new MigrationManager();
  const command = process.argv[2];
  
  switch (command) {
    case 'plan':
      manager.generateMigrationPlan().catch(console.error);
      break;
      
    case 'execute':
      const planFile = process.argv[3] || 'migration-plan.json';
      manager.loadMigrationPlan(planFile)
        .then(() => manager.executeMigration(false))
        .catch(console.error);
      break;
      
    case 'dry-run':
      const dryPlanFile = process.argv[3] || 'migration-plan.json';
      manager.loadMigrationPlan(dryPlanFile)
        .then(() => manager.executeMigration(true))
        .catch(console.error);
      break;
      
    default:
      console.log(chalk.blue('Migration Manager Commands:'));
      console.log('  plan                    - Generate migration plan');
      console.log('  execute [plan-file]     - Execute migration');
      console.log('  dry-run [plan-file]     - Simulate migration');
  }
}

module.exports = MigrationManager;