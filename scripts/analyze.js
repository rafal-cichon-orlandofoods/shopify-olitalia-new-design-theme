#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const chalk = require('chalk');

class ProjectAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.analysis = {
      files: {
        css: [],
        js: [],
        liquid: []
      },
      duplicates: [],
      overrides: [],
      dependencies: new Map(),
      namingPatterns: {
        component: [],
        section: [],
        redesign: [],
        page: [],
        other: []
      }
    };
  }

  async analyze() {
    console.log(chalk.blue('🔍 Starting project analysis...'));
    
    await this.scanFiles();
    await this.analyzeCSSFiles();
    await this.analyzeJSFiles();
    await this.analyzeLiquidFiles();
    await this.detectDuplicates();
    await this.analyzeNamingPatterns();
    
    await this.generateReport();
    
    console.log(chalk.green('✅ Analysis complete!'));
  }

  async scanFiles() {
    console.log(chalk.yellow('📁 Scanning files...'));
    
    // Scan CSS files
    const cssFiles = glob.sync('assets/**/*.css', { cwd: this.projectRoot });
    this.analysis.files.css = cssFiles.map(file => ({
      path: file,
      name: path.basename(file, '.css'),
      size: fs.statSync(path.join(this.projectRoot, file)).size,
      category: this.categorizeFile(file)
    }));

    // Scan JS files
    const jsFiles = glob.sync('assets/**/*.js', { cwd: this.projectRoot });
    this.analysis.files.js = jsFiles.map(file => ({
      path: file,
      name: path.basename(file, '.js'),
      size: fs.statSync(path.join(this.projectRoot, file)).size,
      category: this.categorizeFile(file)
    }));

    // Scan Liquid files
    const liquidFiles = glob.sync('{sections,snippets,templates}/**/*.liquid', { cwd: this.projectRoot });
    this.analysis.files.liquid = liquidFiles.map(file => ({
      path: file,
      name: path.basename(file, '.liquid'),
      size: fs.statSync(path.join(this.projectRoot, file)).size,
      category: this.categorizeFile(file)
    }));

    console.log(`Found ${this.analysis.files.css.length} CSS files`);
    console.log(`Found ${this.analysis.files.js.length} JS files`);
    console.log(`Found ${this.analysis.files.liquid.length} Liquid files`);
  }

  categorizeFile(filePath) {
    const fileName = path.basename(filePath);
    
    if (fileName.startsWith('component-')) return 'component';
    if (fileName.startsWith('section-')) return 'section';
    if (fileName.startsWith('redesign-')) return 'redesign';
    if (fileName.startsWith('page-')) return 'page';
    if (fileName.includes('override')) return 'override';
    
    return 'other';
  }

  async analyzeCSSFiles() {
    console.log(chalk.yellow('🎨 Analyzing CSS files...'));
    
    for (const file of this.analysis.files.css) {
      try {
        const content = await fs.readFile(path.join(this.projectRoot, file.path), 'utf8');
        const ast = postcss.parse(content);
        
        file.rules = [];
        file.selectors = [];
        file.imports = [];
        file.hasImportant = false;
        
        ast.walkRules(rule => {
          file.rules.push(rule.selector);
          file.selectors.push(...rule.selectors);
          
          rule.walkDecls(decl => {
            if (decl.important) {
              file.hasImportant = true;
            }
          });
        });
        
        ast.walkAtRules(rule => {
          if (rule.name === 'import') {
            file.imports.push(rule.params);
          }
        });
        
        // Check for override patterns
        if (file.hasImportant || file.name.includes('override')) {
          this.analysis.overrides.push({
            ...file,
            importantCount: this.countImportantDeclarations(content),
            overrideType: file.name.includes('override') ? 'filename' : 'important'
          });
        }
        
      } catch (error) {
        console.warn(chalk.yellow(`⚠️  Could not parse CSS file: ${file.path}`));
        file.parseError = error.message;
      }
    }
  }

  async analyzeJSFiles() {
    console.log(chalk.yellow('⚡ Analyzing JavaScript files...'));
    
    for (const file of this.analysis.files.js) {
      try {
        const content = await fs.readFile(path.join(this.projectRoot, file.path), 'utf8');
        
        file.exports = [];
        file.imports = [];
        file.dependencies = [];
        
        // Simple regex-based analysis for imports/exports
        const importMatches = content.match(/import\s+.*?from\s+['"`]([^'"`]+)['"`]/g) || [];
        const exportMatches = content.match(/export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g) || [];
        
        file.imports = importMatches;
        file.exports = exportMatches;
        
      } catch (error) {
        console.warn(chalk.yellow(`⚠️  Could not analyze JS file: ${file.path}`));
        file.parseError = error.message;
      }
    }
  }

  async analyzeLiquidFiles() {
    console.log(chalk.yellow('💧 Analyzing Liquid files...'));
    
    for (const file of this.analysis.files.liquid) {
      try {
        const content = await fs.readFile(path.join(this.projectRoot, file.path), 'utf8');
        
        file.includes = [];
        file.renders = [];
        file.assetReferences = [];
        
        // Find liquid includes and renders
        const includeMatches = content.match(/{%\s*include\s+['"`]([^'"`]+)['"`]/g) || [];
        const renderMatches = content.match(/{%\s*render\s+['"`]([^'"`]+)['"`]/g) || [];
        const assetMatches = content.match(/asset_url:\s*['"`]([^'"`]+)['"`]/g) || [];
        
        file.includes = includeMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);
        file.renders = renderMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);
        file.assetReferences = assetMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);
        
      } catch (error) {
        console.warn(chalk.yellow(`⚠️  Could not analyze Liquid file: ${file.path}`));
        file.parseError = error.message;
      }
    }
  }

  async detectDuplicates() {
    console.log(chalk.yellow('🔍 Detecting duplicates...'));
    
    // Group files by similar names (ignoring prefixes)
    const nameGroups = new Map();
    
    [...this.analysis.files.css, ...this.analysis.files.js].forEach(file => {
      const baseName = file.name
        .replace(/^(component-|section-|redesign-|page-)/, '')
        .replace(/\.(css|js)$/, '');
      
      if (!nameGroups.has(baseName)) {
        nameGroups.set(baseName, []);
      }
      nameGroups.get(baseName).push(file);
    });
    
    // Find groups with multiple files
    nameGroups.forEach((files, baseName) => {
      if (files.length > 1) {
        this.analysis.duplicates.push({
          baseName,
          files: files.map(f => f.path),
          types: files.map(f => f.category),
          consolidationStrategy: this.suggestConsolidationStrategy(files)
        });
      }
    });

    // Analyze CSS rule duplicates
    await this.analyzeCSSRuleDuplicates();
  }

  suggestConsolidationStrategy(files) {
    const hasRedesign = files.some(f => f.category === 'redesign');
    const hasOriginal = files.some(f => f.category === 'component' || f.category === 'section');
    
    if (hasRedesign && hasOriginal) {
      return 'merge_redesign_primary';
    } else if (files.length > 1) {
      return 'consolidate_similar';
    }
    return 'review_manually';
  }

  async analyzeCSSRuleDuplicates() {
    console.log(chalk.yellow('🎨 Analyzing CSS rule duplicates...'));
    
    const ruleMap = new Map();
    
    // Collect all CSS rules across files
    this.analysis.files.css.forEach(file => {
      if (file.rules) {
        file.rules.forEach(rule => {
          if (!ruleMap.has(rule)) {
            ruleMap.set(rule, []);
          }
          ruleMap.get(rule).push(file.path);
        });
      }
    });
    
    // Find rules that appear in multiple files
    this.analysis.cssRuleDuplicates = [];
    ruleMap.forEach((files, rule) => {
      if (files.length > 1) {
        this.analysis.cssRuleDuplicates.push({
          rule: rule.substring(0, 100) + (rule.length > 100 ? '...' : ''),
          files,
          count: files.length
        });
      }
    });
    
    // Sort by frequency
    this.analysis.cssRuleDuplicates.sort((a, b) => b.count - a.count);
  }

  countImportantDeclarations(cssContent) {
    const importantMatches = cssContent.match(/!\s*important/g);
    return importantMatches ? importantMatches.length : 0;
  }

  analyzeNamingPatterns() {
    console.log(chalk.yellow('📝 Analyzing naming patterns...'));
    
    const allFiles = [...this.analysis.files.css, ...this.analysis.files.js, ...this.analysis.files.liquid];
    
    allFiles.forEach(file => {
      const category = file.category;
      if (this.analysis.namingPatterns[category]) {
        this.analysis.namingPatterns[category].push(file.name);
      } else {
        this.analysis.namingPatterns.other.push(file.name);
      }
    });
  }

  async generateReport() {
    const reportPath = path.join(this.projectRoot, 'analysis-report.json');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.analysis.files.css.length + this.analysis.files.js.length + this.analysis.files.liquid.length,
        cssFiles: this.analysis.files.css.length,
        jsFiles: this.analysis.files.js.length,
        liquidFiles: this.analysis.files.liquid.length,
        duplicateGroups: this.analysis.duplicates.length,
        overrideFiles: this.analysis.overrides.length,
        cssRuleDuplicates: this.analysis.cssRuleDuplicates ? this.analysis.cssRuleDuplicates.length : 0
      },
      analysis: this.analysis
    };
    
    await fs.writeJson(reportPath, report, { spaces: 2 });
    
    console.log(chalk.green(`📊 Analysis report saved to: ${reportPath}`));
    
    // Print summary
    console.log(chalk.blue('\n📋 ANALYSIS SUMMARY'));
    console.log(`Total files: ${report.summary.totalFiles}`);
    console.log(`CSS files: ${report.summary.cssFiles}`);
    console.log(`JS files: ${report.summary.jsFiles}`);
    console.log(`Liquid files: ${report.summary.liquidFiles}`);
    console.log(`Duplicate groups: ${report.summary.duplicateGroups}`);
    console.log(`Override files: ${report.summary.overrideFiles}`);
    console.log(`CSS rule duplicates: ${report.summary.cssRuleDuplicates}`);
    
    if (this.analysis.duplicates.length > 0) {
      console.log(chalk.yellow('\n⚠️  POTENTIAL DUPLICATES:'));
      this.analysis.duplicates.forEach(dup => {
        console.log(`  ${dup.baseName}: ${dup.files.join(', ')} [${dup.consolidationStrategy}]`);
      });
    }

    if (this.analysis.overrides.length > 0) {
      console.log(chalk.red('\n🚨 OVERRIDE FILES:'));
      this.analysis.overrides.slice(0, 10).forEach(override => {
        const importantInfo = override.importantCount ? ` (${override.importantCount} !important)` : '';
        console.log(`  ${override.path}${importantInfo}`);
      });
      if (this.analysis.overrides.length > 10) {
        console.log(`  ... and ${this.analysis.overrides.length - 10} more`);
      }
    }

    if (this.analysis.cssRuleDuplicates && this.analysis.cssRuleDuplicates.length > 0) {
      console.log(chalk.yellow('\n🔄 TOP CSS RULE DUPLICATES:'));
      this.analysis.cssRuleDuplicates.slice(0, 5).forEach(dup => {
        console.log(`  "${dup.rule}" appears in ${dup.count} files`);
      });
    }
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new ProjectAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = ProjectAnalyzer;