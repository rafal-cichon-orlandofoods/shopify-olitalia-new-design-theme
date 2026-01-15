#!/usr/bin/env node

const BackupManager = require('./backup');
const chalk = require('chalk');

class RollbackManager extends BackupManager {
  constructor() {
    super();
  }

  async quickRollback() {
    console.log(chalk.blue('🔄 Performing quick rollback to most recent backup...'));
    
    try {
      const backups = await this.listBackups();
      
      if (backups.length === 0) {
        console.log(chalk.red('❌ No backups available for rollback'));
        return false;
      }
      
      const mostRecent = backups[0];
      console.log(chalk.yellow(`Rolling back to: ${mostRecent.name}`));
      console.log(chalk.yellow(`Description: ${mostRecent.description}`));
      console.log(chalk.yellow(`Created: ${mostRecent.created}`));
      
      await this.restoreBackup(mostRecent.name);
      
      console.log(chalk.green('✅ Quick rollback completed successfully'));
      return true;
      
    } catch (error) {
      console.error(chalk.red('❌ Quick rollback failed:'), error.message);
      return false;
    }
  }

  async interactiveRollback() {
    console.log(chalk.blue('🔄 Interactive rollback - select backup to restore...'));
    
    try {
      const backups = await this.listBackups();
      
      if (backups.length === 0) {
        console.log(chalk.red('❌ No backups available for rollback'));
        return false;
      }
      
      console.log(chalk.blue('\n📋 Available Backups:'));
      backups.forEach((backup, index) => {
        console.log(`  ${index + 1}. ${backup.name}`);
        console.log(`     ${backup.description}`);
        console.log(`     Created: ${backup.created}`);
        console.log('');
      });
      
      // In a real implementation, you'd use a library like 'inquirer' for interactive prompts
      // For now, we'll just restore the most recent
      console.log(chalk.yellow('Auto-selecting most recent backup for rollback...'));
      
      const mostRecent = backups[0];
      await this.restoreBackup(mostRecent.name);
      
      console.log(chalk.green('✅ Interactive rollback completed successfully'));
      return true;
      
    } catch (error) {
      console.error(chalk.red('❌ Interactive rollback failed:'), error.message);
      return false;
    }
  }
}

// CLI interface
if (require.main === module) {
  const rollbackManager = new RollbackManager();
  const command = process.argv[2];
  
  switch (command) {
    case 'quick':
      rollbackManager.quickRollback().catch(console.error);
      break;
      
    case 'interactive':
      rollbackManager.interactiveRollback().catch(console.error);
      break;
      
    case 'list':
      rollbackManager.listBackups().then(backups => {
        if (backups.length === 0) {
          console.log(chalk.yellow('No backups available for rollback.'));
        } else {
          console.log(chalk.blue('\n📋 Available Backups for Rollback:'));
          backups.forEach((backup, index) => {
            console.log(`  ${index + 1}. ${backup.name} - ${backup.description} (${backup.created})`);
          });
        }
      }).catch(console.error);
      break;
      
    default:
      console.log(chalk.blue('Rollback Manager Commands:'));
      console.log('  quick       - Rollback to most recent backup');
      console.log('  interactive - Choose backup to rollback to');
      console.log('  list        - List available backups');
      console.log('');
      console.log('Examples:');
      console.log('  npm run rollback quick');
      console.log('  npm run rollback interactive');
  }
}

module.exports = RollbackManager;