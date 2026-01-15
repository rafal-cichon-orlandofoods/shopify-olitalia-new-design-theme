#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

class StructureMapper {
  constructor() {
    this.projectRoot = process.cwd();
    this.mapping = {
      current: {},
      target: {},
      relationships: new Map()
    };
  }

  async generateMapping() {
    console.log(chalk.blue('🗺️  Generating project structure mapping...'));
    
    await this.mapCurrentStructure();
    await this.defineTargetStructure();
    await this.analyzeRelationships();
    
    const mappingPath = path.join(this.projectRoot, 'structure-mapping.json');
    await fs.writeJson(mappingPath, {
      timestamp: new Date().toISOString(),
      current: this.mapping.current,
      target: this.mapping.target,
      relationships: Array.from(this.mapping.relationships.entries())
    }, { spaces: 2 });
    
    console.log(chalk.green(`✅ Structure mapping saved: ${mappingPath}`));
    return this.mapping;
  }

  async mapCurrentStructure() {
    console.log(chalk.yellow('📂 Mapping current structure...'));
    
    const directories = ['assets', 'sections', 'snippets', 'templates', 'blocks'];
    
    for (const dir of directories) {
      const dirPath = path.join(this.projectRoot, dir);
      if (await fs.pathExists(dirPath)) {
        this.mapping.current[dir] = await this.scanDirectory(dirPath, dir);
      }
    }
  }

  async scanDirectory(dirPath, relativePath) {
    const items = await fs.readdir(dirPath);
    const structure = {
      files: [],
      subdirectories: {}
    };
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        const subRelativePath = path.join(relativePath, item);
        structure.subdirectories[item] = await this.scanDirectory(itemPath, subRelativePath);
      } else {
        const fileInfo = {
          name: item,
          path: path.join(relativePath, item),
          size: stat.size,
          extension: path.extname(item),
          category: this.categorizeFile(item),
          lastModified: stat.mtime.toISOString()
        };
        
        structure.files.push(fileInfo);
      }
    }
    
    return structure;
  }

  categorizeFile(fileName) {
    // Categorize based on naming patterns
    if (fileName.startsWith('component-')) return 'component';
    if (fileName.startsWith('section-')) return 'section';
    if (fileName.startsWith('redesign-')) return 'redesign';
    if (fileName.startsWith('page-')) return 'page';
    if (fileName.includes('override')) return 'override';
    if (fileName.startsWith('main-')) return 'main-template';
    
    // Categorize by file type and content
    const ext = path.extname(fileName);
    if (ext === '.css') {
      if (fileName.includes('font')) return 'typography';
      if (fileName.includes('theme')) return 'base';
      return 'styling';
    }
    
    if (ext === '.js') {
      if (fileName.includes('vendor')) return 'vendor';
      return 'functionality';
    }
    
    if (ext === '.liquid') {
      if (fileName.startsWith('main-')) return 'main-template';
      return 'template';
    }
    
    return 'other';
  }

  defineTargetStructure() {
    console.log(chalk.yellow('🎯 Defining target structure...'));
    
    this.mapping.target = {
      assets: {
        description: 'Organized asset files following naming conventions',
        structure: {
          'base/': {
            description: 'Foundation styles, variables, utilities',
            files: ['base-variables.css', 'base-typography.css', 'base-utilities.css']
          },
          'components/': {
            description: 'Reusable UI components',
            files: ['component-*.css', 'component-*.js']
          },
          'sections/': {
            description: 'Page layout sections',
            files: ['section-*.css', 'section-*.js']
          },
          'pages/': {
            description: 'Page-specific styles',
            files: ['page-*.css', 'page-*.js']
          },
          'vendor/': {
            description: 'Third-party libraries',
            files: ['vendor-*.css', 'vendor-*.js']
          }
        }
      },
      sections: {
        description: 'Shopify sections with unified naming',
        structure: {
          'main-templates/': ['main-*.liquid'],
          'components/': ['component sections'],
          'redesign/': ['modern redesign sections']
        }
      },
      snippets: {
        description: 'Reusable template components',
        structure: {
          'components/': ['reusable UI snippets'],
          'helpers/': ['utility snippets'],
          'forms/': ['form-related snippets']
        }
      }
    };
  }

  async analyzeRelationships() {
    console.log(chalk.yellow('🔗 Analyzing file relationships...'));
    
    // Analyze CSS files for relationships
    const cssFiles = this.getAllFilesByExtension('.css');
    for (const file of cssFiles) {
      await this.analyzeCSSRelationships(file);
    }
    
    // Analyze Liquid files for asset references
    const liquidFiles = this.getAllFilesByExtension('.liquid');
    for (const file of liquidFiles) {
      await this.analyzeLiquidRelationships(file);
    }
    
    // Analyze JavaScript files for dependencies
    const jsFiles = this.getAllFilesByExtension('.js');
    for (const file of jsFiles) {
      await this.analyzeJSRelationships(file);
    }
  }

  getAllFilesByExtension(extension) {
    const files = [];
    
    const traverse = (structure, basePath = '') => {
      if (structure.files) {
        structure.files
          .filter(file => file.extension === extension)
          .forEach(file => {
            files.push({
              ...file,
              fullPath: path.join(this.projectRoot, file.path)
            });
          });
      }
      
      if (structure.subdirectories) {
        Object.entries(structure.subdirectories).forEach(([name, subStructure]) => {
          traverse(subStructure, path.join(basePath, name));
        });
      }
    };
    
    Object.values(this.mapping.current).forEach(structure => {
      traverse(structure);
    });
    
    return files;
  }

  async analyzeCSSRelationships(file) {
    try {
      const content = await fs.readFile(file.fullPath, 'utf8');
      
      // Find @import statements
      const imports = content.match(/@import\s+['"`]([^'"`]+)['"`]/g) || [];
      
      if (imports.length > 0) {
        this.mapping.relationships.set(file.path, {
          type: 'css-imports',
          dependencies: imports.map(imp => imp.match(/['"`]([^'"`]+)['"`]/)[1])
        });
      }
      
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Could not analyze CSS relationships: ${file.path}`));
    }
  }

  async analyzeLiquidRelationships(file) {
    try {
      const content = await fs.readFile(file.fullPath, 'utf8');
      
      const relationships = {
        type: 'liquid-references',
        assetReferences: [],
        snippetIncludes: [],
        sectionRenders: []
      };
      
      // Find asset references
      const assetMatches = content.match(/asset_url:\s*['"`]([^'"`]+)['"`]/g) || [];
      relationships.assetReferences = assetMatches.map(match => 
        match.match(/['"`]([^'"`]+)['"`]/)[1]
      );
      
      // Find snippet includes
      const includeMatches = content.match(/{%\s*include\s+['"`]([^'"`]+)['"`]/g) || [];
      relationships.snippetIncludes = includeMatches.map(match => 
        match.match(/['"`]([^'"`]+)['"`]/)[1]
      );
      
      // Find section renders
      const renderMatches = content.match(/{%\s*render\s+['"`]([^'"`]+)['"`]/g) || [];
      relationships.sectionRenders = renderMatches.map(match => 
        match.match(/['"`]([^'"`]+)['"`]/)[1]
      );
      
      if (relationships.assetReferences.length > 0 || 
          relationships.snippetIncludes.length > 0 || 
          relationships.sectionRenders.length > 0) {
        this.mapping.relationships.set(file.path, relationships);
      }
      
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Could not analyze Liquid relationships: ${file.path}`));
    }
  }

  async analyzeJSRelationships(file) {
    try {
      const content = await fs.readFile(file.fullPath, 'utf8');
      
      const relationships = {
        type: 'js-dependencies',
        imports: [],
        exports: []
      };
      
      // Find import statements (ES6 modules)
      const importMatches = content.match(/import\s+.*?from\s+['"`]([^'"`]+)['"`]/g) || [];
      relationships.imports = importMatches.map(match => 
        match.match(/['"`]([^'"`]+)['"`]/)[1]
      );
      
      // Find require statements (CommonJS)
      const requireMatches = content.match(/require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g) || [];
      relationships.imports.push(...requireMatches.map(match => 
        match.match(/['"`]([^'"`]+)['"`]/)[1]
      ));
      
      if (relationships.imports.length > 0) {
        this.mapping.relationships.set(file.path, relationships);
      }
      
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Could not analyze JS relationships: ${file.path}`));
    }
  }

  async generateVisualization() {
    console.log(chalk.blue('📊 Generating structure visualization...'));
    
    const visualization = {
      currentStructure: this.formatStructureForVisualization(this.mapping.current),
      targetStructure: this.formatStructureForVisualization(this.mapping.target),
      relationshipGraph: this.formatRelationshipsForVisualization()
    };
    
    const vizPath = path.join(this.projectRoot, 'structure-visualization.json');
    await fs.writeJson(vizPath, visualization, { spaces: 2 });
    
    console.log(chalk.green(`📊 Visualization data saved: ${vizPath}`));
    return visualization;
  }

  formatStructureForVisualization(structure) {
    // Convert structure to a format suitable for visualization tools
    const nodes = [];
    const edges = [];
    
    const traverse = (obj, parentId = null, path = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const nodeId = path ? `${path}/${key}` : key;
        
        nodes.push({
          id: nodeId,
          label: key,
          type: typeof value === 'object' && value.files ? 'directory' : 'file',
          parent: parentId
        });
        
        if (parentId) {
          edges.push({
            from: parentId,
            to: nodeId,
            type: 'contains'
          });
        }
        
        if (typeof value === 'object' && !Array.isArray(value)) {
          traverse(value, nodeId, nodeId);
        }
      });
    };
    
    traverse(structure);
    
    return { nodes, edges };
  }

  formatRelationshipsForVisualization() {
    const relationships = [];
    
    this.mapping.relationships.forEach((relationship, filePath) => {
      if (relationship.type === 'css-imports') {
        relationship.dependencies.forEach(dep => {
          relationships.push({
            from: filePath,
            to: dep,
            type: 'css-import'
          });
        });
      } else if (relationship.type === 'liquid-references') {
        relationship.assetReferences.forEach(asset => {
          relationships.push({
            from: filePath,
            to: `assets/${asset}`,
            type: 'asset-reference'
          });
        });
      }
    });
    
    return relationships;
  }
}

// CLI interface
if (require.main === module) {
  const mapper = new StructureMapper();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'map':
      mapper.generateMapping().catch(console.error);
      break;
      
    case 'visualize':
      mapper.generateMapping()
        .then(() => mapper.generateVisualization())
        .catch(console.error);
      break;
      
    default:
      console.log(chalk.blue('Structure Mapper Commands:'));
      console.log('  map        - Generate structure mapping');
      console.log('  visualize  - Generate mapping and visualization data');
  }
}

module.exports = StructureMapper;