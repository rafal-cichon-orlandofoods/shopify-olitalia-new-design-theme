# Olitalia Theme Reorganization Tools

This document describes the reorganization infrastructure and tools for the Olitalia Shopify theme project.

## Overview

The reorganization tools help transform the current mixed architecture (original Combine theme + redesign system) into a unified, maintainable structure following consistent naming conventions and organizational patterns.

## Tools

### 1. Project Analyzer (`scripts/analyze.js`)

Analyzes the current project structure and identifies:
- File categorization and naming patterns
- Duplicate functionality
- Override files and excessive `!important` usage
- File dependencies and relationships

**Usage:**
```bash
npm run analyze
```

**Output:** `analysis-report.json`

### 2. Backup Manager (`scripts/backup.js`)

Manages project backups with rollback capabilities.

**Usage:**
```bash
# Create backup
npm run backup create "Description of backup"

# List backups
npm run backup list

# Restore backup
npm run backup restore backup-2024-01-01T10-00-00-000Z

# Clean up old backups (keep 5 most recent)
npm run backup cleanup 5
```

### 3. Migration Manager (`scripts/migrate.js`)

Handles file operations for reorganization:
- Generates migration plans
- Executes file moves, renames, and merges
- Updates file references automatically

**Usage:**
```bash
# Generate migration plan
npm run migrate plan

# Dry run (simulate migration)
npm run migrate dry-run

# Execute migration
npm run migrate execute
```

### 4. Project Validator (`scripts/validate.js`)

Validates the reorganized project structure:
- Naming convention compliance
- File reference integrity
- CSS structure quality
- Shopify theme compliance
- Duplicate detection

**Usage:**
```bash
npm run validate
```

**Output:** `validation-report.json`

### 5. Structure Mapper (`scripts/structure-mapper.js`)

Creates detailed mapping of project structure and relationships.

**Usage:**
```bash
# Generate structure mapping
npm run structure-map

# Generate mapping with visualization data
npm run structure-visualize
```

**Output:** `structure-mapping.json`, `structure-visualization.json`

### 6. Reorganization Orchestrator (`scripts/reorganize.js`)

Main tool that coordinates the entire reorganization process.

**Usage:**
```bash
# Dry run (recommended first)
npm run reorganize

# Execute reorganization
npm run reorganize -- --live

# Skip backup (not recommended)
npm run reorganize -- --live --skip-backup

# Skip validation
npm run reorganize -- --live --skip-validation
```

## Workflow

### Recommended Process

1. **Initial Analysis**
   ```bash
   npm run analyze
   npm run structure-map
   ```

2. **Create Backup**
   ```bash
   npm run backup create "Pre-reorganization backup"
   ```

3. **Dry Run**
   ```bash
   npm run reorganize
   ```

4. **Execute Reorganization**
   ```bash
   npm run reorganize -- --live
   ```

5. **Validate Results**
   ```bash
   npm run validate
   ```

### Emergency Rollback

If something goes wrong:

```bash
# List available backups
npm run backup list

# Restore from backup
npm run backup restore <backup-name>
```

## Target Structure

The reorganization transforms the project to follow this structure:

```
assets/
├── base/           # Foundation styles, variables, utilities
├── components/     # Reusable UI components
├── sections/       # Page-specific section styles
├── pages/          # Page-specific overrides
├── vendor/         # Third-party libraries
└── legacy/         # Deprecated files (temporary)
```

### Naming Conventions

- **Base Styles**: `base-{name}.css`
- **Components**: `component-{name}.css/js`
- **Sections**: `section-{name}.css/js`
- **Pages**: `page-{template}.css/js`
- **Utilities**: `utility-{function}.css`

### CSS Architecture

Uses BEM methodology with component namespacing:

```css
/* Component namespace */
.c-product-card { }
.c-product-card__image { }
.c-product-card__title { }
.c-product-card--featured { }

/* Section namespace */
.s-hero { }
.s-hero__content { }

/* Utility namespace */
.u-text-center { }
.u-margin-bottom-large { }
```

## Configuration

### Dependencies

The tools require these Node.js packages:
- `postcss` - CSS parsing and analysis
- `postcss-scss` - SCSS support
- `fs-extra` - Enhanced file system operations
- `glob` - File pattern matching
- `chalk` - Terminal colors
- `fast-check` - Property-based testing (dev dependency)

### Environment Requirements

- Node.js >= 16.0.0
- NPM or Yarn package manager
- Shopify theme project structure

## Safety Features

### Backup System
- Automatic backups before major operations
- Metadata tracking for each backup
- Easy rollback capabilities
- Cleanup of old backups

### Validation
- Pre-migration validation
- Post-migration verification
- Reference integrity checking
- Shopify compliance validation

### Dry Run Mode
- Simulate all operations without making changes
- Preview migration plan
- Identify potential issues before execution

## Troubleshooting

### Common Issues

1. **Permission Errors**
   - Ensure write permissions to project directory
   - Run with appropriate user privileges

2. **Missing Dependencies**
   ```bash
   npm install
   ```

3. **Backup Restoration**
   ```bash
   npm run backup list
   npm run backup restore <backup-name>
   ```

4. **Validation Failures**
   - Check `validation-report.json` for details
   - Fix issues manually or re-run specific tools

### Getting Help

1. Check the generated report files for detailed information
2. Run tools with `--help` flag for usage information
3. Review the migration plan before execution
4. Use dry run mode to preview changes

## Development

### Adding New Tools

1. Create script in `scripts/` directory
2. Add CLI interface with `if (require.main === module)`
3. Export class/functions for programmatic use
4. Add npm script to `package.json`
5. Update this documentation

### Testing

Property-based tests are included for validation:
- Run with `fast-check` library
- Test naming conventions, file integrity, etc.
- Minimum 100 iterations per test

### Contributing

1. Follow existing code patterns
2. Add comprehensive error handling
3. Include progress logging with `chalk`
4. Write tests for new functionality
5. Update documentation