#!/usr/bin/env node

const chalk = require('chalk');
const ProjectAnalyzer = require('./analyze');
const BackupManager = require('./backup');
const MigrationManager = require('./migrate');
const ProjectValidator = require('./validate');

class ReorganizationOrchestrator {
  constructor() {
    this.analyzer = new ProjectAnalyzer();
    this.backupManager = new BackupManager();
    this.migrationManager = new MigrationManager();
    this.validator = new ProjectValidator();
  }

  async run(options = {}) {
    const {
      skipBackup = false,
      dryRun = false,
      skipValidation = false
    } = options;

    try {
      console.log(chalk.blue.bold('🚀 Starting Olitalia Theme Reorganization'));
      console.log(chalk.blue('=' .repeat(50)));

      // Step 1: Create backup
      if (!skipBackup && !dryRun) {
        console.log(chalk.blue('\n📦 Step 1: Creating backup...'));
        await this.backupManager.createBackup('Pre-reorganization backup');
      } else {
        console.log(chalk.yellow('\n📦 Step 1: Skipping backup (dry run or disabled)'));
      }

      // Step 2: Analyze current structure
      console.log(chalk.blue('\n🔍 Step 2: Analyzing current project structure...'));
      await this.analyzer.analyze();

      // Step 3: Generate migration plan
      console.log(chalk.blue('\n📋 Step 3: Generating migration plan...'));
      const migrationPlan = await this.migrationManager.generateMigrationPlan();

      // Step 4: Execute migration
      console.log(chalk.blue(`\n🔄 Step 4: ${dryRun ? 'Simulating' : 'Executing'} migration...`));
      const migrationReport = await this.migrationManager.executeMigration(dryRun);

      // Step 5: Validate results
      if (!skipValidation && !dryRun) {
        console.log(chalk.blue('\n✅ Step 5: Validating reorganized structure...'));
        await this.validator.validate();
      } else {
        console.log(chalk.yellow('\n✅ Step 5: Skipping validation (dry run or disabled)'));
      }

      // Summary
      console.log(chalk.blue('\n📊 REORGANIZATION SUMMARY'));
      console.log(chalk.blue('=' .repeat(50)));
      console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE EXECUTION'}`);
      console.log(`Migration operations: ${migrationReport.summary.total}`);
      console.log(`Successful: ${migrationReport.summary.successful}`);
      console.log(`Failed: ${migrationReport.summary.failed}`);

      if (migrationReport.summary.failed > 0) {
        console.log(chalk.red('\n❌ Reorganization completed with failures'));
        console.log(chalk.yellow('Check migration report for details'));
        process.exit(1);
      } else {
        console.log(chalk.green('\n✅ Reorganization completed successfully!'));
        
        if (dryRun) {
          console.log(chalk.blue('\n💡 This was a dry run. To execute for real, run:'));
          console.log(chalk.white('npm run reorganize -- --live'));
        }
      }

    } catch (error) {
      console.error(chalk.red('\n❌ Reorganization failed:'), error.message);
      
      if (!dryRun) {
        console.log(chalk.yellow('\n🔄 You can restore from backup using:'));
        console.log(chalk.white('npm run backup list'));
        console.log(chalk.white('npm run backup restore <backup-name>'));
      }
      
      process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const orchestrator = new ReorganizationOrchestrator();
  
  const args = process.argv.slice(2);
  const options = {
    skipBackup: args.includes('--skip-backup'),
    dryRun: !args.includes('--live'),
    skipValidation: args.includes('--skip-validation')
  };

  if (args.includes('--help')) {
    console.log(chalk.blue('Olitalia Theme Reorganization Tool'));
    console.log('\nUsage: npm run reorganize [options]');
    console.log('\nOptions:');
    console.log('  --live              Execute migration (default is dry run)');
    console.log('  --skip-backup       Skip creating backup');
    console.log('  --skip-validation   Skip final validation');
    console.log('  --help              Show this help');
    console.log('\nExamples:');
    console.log('  npm run reorganize                    # Dry run');
    console.log('  npm run reorganize -- --live          # Execute migration');
    console.log('  npm run reorganize -- --live --skip-backup');
    process.exit(0);
  }

  orchestrator.run(options).catch(console.error);
}

module.exports = ReorganizationOrchestrator;