#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class BackupManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.backupDir = path.join(this.projectRoot, '.reorganization-backups');
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  }

  async createBackup(description = 'Full project backup') {
    console.log(chalk.blue('💾 Creating backup...'));
    
    const backupPath = path.join(this.backupDir, `backup-${this.timestamp}`);
    
    try {
      // Ensure backup directory exists
      await fs.ensureDir(this.backupDir);
      
      // Create backup metadata
      const metadata = {
        timestamp: this.timestamp,
        description,
        created: new Date().toISOString(),
        directories: ['assets', 'sections', 'snippets', 'templates', 'blocks', 'config', 'locales']
      };
      
      // Copy project directories
      for (const dir of metadata.directories) {
        const sourcePath = path.join(this.projectRoot, dir);
        const targetPath = path.join(backupPath, dir);
        
        if (await fs.pathExists(sourcePath)) {
          console.log(chalk.yellow(`Backing up ${dir}/...`));
          await fs.copy(sourcePath, targetPath);
        }
      }
      
      // Save metadata
      await fs.writeJson(path.join(backupPath, 'backup-metadata.json'), metadata, { spaces: 2 });
      
      console.log(chalk.green(`✅ Backup created: ${backupPath}`));
      return backupPath;
      
    } catch (error) {
      console.error(chalk.red('❌ Backup failed:'), error.message);
      throw error;
    }
  }

  async listBackups() {
    try {
      if (!await fs.pathExists(this.backupDir)) {
        console.log(chalk.yellow('No backups found.'));
        return [];
      }
      
      const backups = await fs.readdir(this.backupDir);
      const backupInfo = [];
      
      for (const backup of backups) {
        const backupPath = path.join(this.backupDir, backup);
        const metadataPath = path.join(backupPath, 'backup-metadata.json');
        
        if (await fs.pathExists(metadataPath)) {
          const metadata = await fs.readJson(metadataPath);
          backupInfo.push({
            name: backup,
            path: backupPath,
            ...metadata
          });
        }
      }
      
      return backupInfo.sort((a, b) => new Date(b.created) - new Date(a.created));
      
    } catch (error) {
      console.error(chalk.red('❌ Failed to list backups:'), error.message);
      return [];
    }
  }

  async restoreBackup(backupName) {
    console.log(chalk.blue(`🔄 Restoring backup: ${backupName}`));
    
    const backupPath = path.join(this.backupDir, backupName);
    const metadataPath = path.join(backupPath, 'backup-metadata.json');
    
    try {
      if (!await fs.pathExists(metadataPath)) {
        throw new Error(`Backup metadata not found: ${backupName}`);
      }
      
      const metadata = await fs.readJson(metadataPath);
      
      // Create a backup of current state before restoring
      await this.createBackup(`Pre-restore backup before restoring ${backupName}`);
      
      // Restore each directory
      for (const dir of metadata.directories) {
        const sourcePath = path.join(backupPath, dir);
        const targetPath = path.join(this.projectRoot, dir);
        
        if (await fs.pathExists(sourcePath)) {
          console.log(chalk.yellow(`Restoring ${dir}/...`));
          
          // Remove existing directory
          if (await fs.pathExists(targetPath)) {
            await fs.remove(targetPath);
          }
          
          // Copy from backup
          await fs.copy(sourcePath, targetPath);
        }
      }
      
      console.log(chalk.green(`✅ Backup restored: ${backupName}`));
      
    } catch (error) {
      console.error(chalk.red('❌ Restore failed:'), error.message);
      throw error;
    }
  }

  async cleanupOldBackups(keepCount = 5) {
    console.log(chalk.blue(`🧹 Cleaning up old backups (keeping ${keepCount})...`));
    
    try {
      const backups = await this.listBackups();
      
      if (backups.length <= keepCount) {
        console.log(chalk.green('No cleanup needed.'));
        return;
      }
      
      const toDelete = backups.slice(keepCount);
      
      for (const backup of toDelete) {
        console.log(chalk.yellow(`Removing old backup: ${backup.name}`));
        await fs.remove(backup.path);
      }
      
      console.log(chalk.green(`✅ Cleaned up ${toDelete.length} old backups`));
      
    } catch (error) {
      console.error(chalk.red('❌ Cleanup failed:'), error.message);
      throw error;
    }
  }
}

// CLI interface
if (require.main === module) {
  const manager = new BackupManager();
  const command = process.argv[2];
  
  switch (command) {
    case 'create':
      const description = process.argv[3] || 'Manual backup';
      manager.createBackup(description).catch(console.error);
      break;
      
    case 'list':
      manager.listBackups().then(backups => {
        if (backups.length === 0) {
          console.log(chalk.yellow('No backups found.'));
        } else {
          console.log(chalk.blue('\n📋 Available Backups:'));
          backups.forEach(backup => {
            console.log(`  ${backup.name} - ${backup.description} (${backup.created})`);
          });
        }
      }).catch(console.error);
      break;
      
    case 'restore':
      const backupName = process.argv[3];
      if (!backupName) {
        console.error(chalk.red('❌ Please specify backup name'));
        process.exit(1);
      }
      manager.restoreBackup(backupName).catch(console.error);
      break;
      
    case 'cleanup':
      const keepCount = parseInt(process.argv[3]) || 5;
      manager.cleanupOldBackups(keepCount).catch(console.error);
      break;
      
    default:
      console.log(chalk.blue('Backup Manager Commands:'));
      console.log('  create [description]  - Create a new backup');
      console.log('  list                  - List all backups');
      console.log('  restore <name>        - Restore a backup');
      console.log('  cleanup [keep-count]  - Clean up old backups');
  }
}

module.exports = BackupManager;