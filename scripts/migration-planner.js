#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class MigrationPlanner {
  constructor() {
    this.projectRoot = process.cwd();
    this.analysisReport = null;
    this.migrationPlan = {
      consolidations: [],
      moves: [],
      merges: [],
      deletes: [],
      referenceUpdates: []
    };
  }

  async generatePlan() {
    console.log(chalk.blue('📋 Generating migration plan...'));
    
    // Load analysis report
    await this.loadAnalysisReport();
    
    // Generate consolidation strategies
    await this.planConsolidations();
    await this.planRedesignMerges();
    await this.planOverrideElimination();
    await this.planFileOrganization();
    await this.planReferenceUpdates();
    
    // Save migration plan
    await this.saveMigrationPlan();
    
    console.log(chalk.green('✅ Migration plan generated!'));
  }

  async loadAnalysisReport() {
    const reportPath = path.join(this.projectRoot, 'analysis-report.json');
    if (!await fs.pathExists(reportPath)) {
      throw new Error('Analysis report not found. Run analyze.js first.');
    }
    
    this.analysisReport = await fs.readJson(reportPath);
    console.log(chalk.yellow('📊 Loaded analysis report'));
  }

  async planConsolidations() {
    console.log(chalk.yellow('🔄 Planning file consolidations...'));
    
    // Process duplicate groups
    this.analysisReport.analysis.duplicates.forEach(duplicate => {
      const consolidation = {
        type: 'consolidate',
        baseName: duplicate.baseName,
        strategy: duplicate.consolidationStrategy,
        sourceFiles: duplicate.files,
        targetFile: this.determineTargetFile(duplicate),
        actions: []
      };

      if (duplicate.consolidationStrategy === 'merge_redesign_primary') {
        // Redesign version becomes primary, original becomes fallback
        const redesignFile = duplicate.files.find(f => f.includes('redesign-'));
        const originalFile = duplicate.files.find(f => !f.includes('redesign-'));
        
        consolidation.actions = [
          {
            action: 'merge',
            primary: redesignFile,
            secondary: originalFile,
            result: this.generateNewFileName(duplicate.baseName, 'component')
          }
        ];
      } else if (duplicate.consolidationStrategy === 'consolidate_similar') {
        // Keep files together with consistent naming
        consolidation.actions = duplicate.files.map(file => ({
          action: 'rename',
          from: file,
          to: this.generateConsistentFileName(file, duplicate.baseName)
        }));
      }

      this.migrationPlan.consolidations.push(consolidation);
    });
  }

  async planRedesignMerges() {
    console.log(chalk.yellow('🎨 Planning redesign system merges...'));
    
    // Find all redesign files and their original counterparts
    const redesignFiles = this.analysisReport.analysis.files.css
      .filter(f => f.category === 'redesign')
      .concat(this.analysisReport.analysis.files.liquid.filter(f => f.category === 'redesign'));

    redesignFiles.forEach(redesignFile => {
      const baseName = redesignFile.name.replace('redesign-', '');
      const originalFile = this.findOriginalCounterpart(baseName);
      
      if (originalFile) {
        this.migrationPlan.merges.push({
          type: 'redesign_merge',
          baseName,
          redesignFile: redesignFile.path,
          originalFile: originalFile.path,
          targetFile: this.generateNewFileName(baseName, 'component'),
          strategy: 'redesign_primary_with_fallback'
        });
      } else {
        // Redesign file without original counterpart - just rename
        this.migrationPlan.moves.push({
          type: 'redesign_rename',
          from: redesignFile.path,
          to: this.generateNewFileName(baseName, 'component')
        });
      }
    });
  }

  async planOverrideElimination() {
    console.log(chalk.yellow('🚨 Planning override elimination...'));
    
    this.analysisReport.analysis.overrides.forEach(override => {
      if (override.name.includes('override')) {
        // Files with "override" in name should be merged into their targets
        this.migrationPlan.deletes.push({
          type: 'eliminate_override',
          file: override.path,
          reason: 'override_file',
          action: 'merge_into_target',
          importantCount: override.importantCount
        });
      } else if (override.importantCount > 10) {
        // Files with excessive !important declarations need refactoring
        this.migrationPlan.consolidations.push({
          type: 'refactor_important',
          file: override.path,
          importantCount: override.importantCount,
          action: 'reduce_specificity'
        });
      }
    });
  }

  async planFileOrganization() {
    console.log(chalk.yellow('📁 Planning file organization...'));
    
    // Plan new directory structure
    const organizationPlan = {
      'assets/base/': [],
      'assets/components/': [],
      'assets/sections/': [],
      'assets/pages/': [],
      'assets/utilities/': []
    };

    // Categorize files into new structure
    [...this.analysisReport.analysis.files.css, ...this.analysisReport.analysis.files.js].forEach(file => {
      const newCategory = this.determineNewCategory(file);
      const newPath = this.generateNewPath(file, newCategory);
      
      if (file.path !== newPath) {
        this.migrationPlan.moves.push({
          type: 'organize',
          from: file.path,
          to: newPath,
          category: newCategory
        });
      }
    });
  }

  async planReferenceUpdates() {
    console.log(chalk.yellow('🔗 Planning reference updates...'));
    
    // Collect all file moves and merges to plan reference updates
    const fileChanges = new Map();
    
    // Add moves
    this.migrationPlan.moves.forEach(move => {
      fileChanges.set(move.from, move.to);
    });
    
    // Add merges
    this.migrationPlan.merges.forEach(merge => {
      fileChanges.set(merge.originalFile, merge.targetFile);
      fileChanges.set(merge.redesignFile, merge.targetFile);
    });
    
    // Add consolidations
    this.migrationPlan.consolidations.forEach(consolidation => {
      if (consolidation.actions && Array.isArray(consolidation.actions)) {
        consolidation.actions.forEach(action => {
          if (action.action === 'rename') {
            fileChanges.set(action.from, action.to);
          } else if (action.action === 'merge') {
            fileChanges.set(action.primary, action.result);
            fileChanges.set(action.secondary, action.result);
          }
        });
      }
    });

    console.log(`Found ${fileChanges.size} file changes to track`);

    // Plan reference updates for Liquid files
    if (this.analysisReport.analysis.files.liquid) {
      console.log(`Processing ${this.analysisReport.analysis.files.liquid.length} liquid files`);
      
      this.analysisReport.analysis.files.liquid.forEach(liquidFile => {
        const updates = [];
        
        if (liquidFile.assetReferences && Array.isArray(liquidFile.assetReferences) && liquidFile.assetReferences.length > 0) {
          liquidFile.assetReferences.forEach(assetRef => {
            const fullAssetPath = `assets/${assetRef}`;
            if (fileChanges.has(fullAssetPath)) {
              updates.push({
                type: 'asset_reference',
                from: assetRef,
                to: path.basename(fileChanges.get(fullAssetPath))
              });
            }
          });
        }
        
        if (updates.length > 0) {
          this.migrationPlan.referenceUpdates.push({
            file: liquidFile.path,
            updates
          });
        }
      });
    }
  }

  determineTargetFile(duplicate) {
    // Prefer redesign version if available, otherwise use component naming
    const redesignFile = duplicate.files.find(f => f.includes('redesign-'));
    if (redesignFile) {
      return this.generateNewFileName(duplicate.baseName, 'component');
    }
    
    const componentFile = duplicate.files.find(f => f.includes('component-'));
    if (componentFile) {
      return componentFile;
    }
    
    return this.generateNewFileName(duplicate.baseName, 'component');
  }

  generateNewFileName(baseName, category) {
    const extension = '.css'; // Default to CSS, adjust as needed
    return `assets/${category}s/${category}-${baseName}${extension}`;
  }

  generateConsistentFileName(filePath, baseName) {
    const extension = path.extname(filePath);
    const category = this.determineNewCategory(filePath);
    return `assets/${category}s/${category}-${baseName}${extension}`;
  }

  findOriginalCounterpart(baseName) {
    return [...this.analysisReport.analysis.files.css, ...this.analysisReport.analysis.files.liquid]
      .find(f => f.name === `section-${baseName}` || f.name === `component-${baseName}` || f.name === baseName);
  }

  determineNewCategory(file) {
    const filePath = file.path || file;
    const fileName = typeof file === 'string' ? path.basename(file) : file.name;
    
    if (fileName.includes('redesign')) return 'component';
    if (fileName.startsWith('component-')) return 'component';
    if (fileName.startsWith('section-')) return 'section';
    if (fileName.startsWith('page-')) return 'page';
    if (fileName.includes('utility') || fileName.includes('base') || fileName === 'theme') return 'base';
    return 'component'; // Default
  }

  generateNewPath(file, category) {
    const extension = path.extname(file.path);
    const baseName = file.name.replace(/^(component-|section-|redesign-|page-)/, '');
    return `assets/${category}s/${category}-${baseName}${extension}`;
  }

  async saveMigrationPlan() {
    const planPath = path.join(this.projectRoot, 'migration-plan.json');
    
    const plan = {
      timestamp: new Date().toISOString(),
      summary: {
        consolidations: this.migrationPlan.consolidations.length,
        moves: this.migrationPlan.moves.length,
        merges: this.migrationPlan.merges.length,
        deletes: this.migrationPlan.deletes.length,
        referenceUpdates: this.migrationPlan.referenceUpdates.length
      },
      plan: this.migrationPlan
    };
    
    await fs.writeJson(planPath, plan, { spaces: 2 });
    
    console.log(chalk.green(`📋 Migration plan saved to: ${planPath}`));
    
    // Print summary
    console.log(chalk.blue('\n📋 MIGRATION PLAN SUMMARY'));
    console.log(`Consolidations: ${plan.summary.consolidations}`);
    console.log(`File moves: ${plan.summary.moves}`);
    console.log(`File merges: ${plan.summary.merges}`);
    console.log(`File deletions: ${plan.summary.deletes}`);
    console.log(`Reference updates: ${plan.summary.referenceUpdates}`);
    
    // Show key consolidations
    if (this.migrationPlan.consolidations.length > 0) {
      console.log(chalk.yellow('\n🔄 KEY CONSOLIDATIONS:'));
      this.migrationPlan.consolidations.slice(0, 5).forEach(consolidation => {
        console.log(`  ${consolidation.baseName}: ${consolidation.strategy}`);
      });
    }
    
    // Show key merges
    if (this.migrationPlan.merges.length > 0) {
      console.log(chalk.cyan('\n🎨 REDESIGN MERGES:'));
      this.migrationPlan.merges.slice(0, 5).forEach(merge => {
        console.log(`  ${merge.baseName}: ${merge.strategy}`);
      });
    }
  }
}

// Run migration planning if called directly
if (require.main === module) {
  const planner = new MigrationPlanner();
  planner.generatePlan().catch(console.error);
}

module.exports = MigrationPlanner;