# Design Document

## Overview

This design addresses the organizational complexity in the Olitalia Shopify theme by implementing a systematic reorganization approach. The solution consolidates the dual architecture (original theme + redesign system) into a unified, maintainable structure while preserving all existing functionality.

## Architecture

### Current State Analysis

The project currently suffers from:
- **Dual Architecture**: Original Combine theme components alongside `redesign-*` prefixed components
- **Override Files**: Heavy use of `!important` declarations and override CSS files
- **Inconsistent Naming**: Mixed patterns between `component-*`, `section-*`, and `redesign-*` prefixes
- **Scattered Organization**: Related files not grouped logically
- **Duplicate Functionality**: Multiple files serving similar purposes

### Target Architecture

The reorganized system will use a **Component-First Architecture** with clear separation of concerns:

```
/assets/
├── base/           # Foundation styles, variables, utilities
├── components/     # Reusable UI components
├── sections/       # Page-specific section styles
├── pages/          # Page-specific overrides
├── vendor/         # Third-party libraries
└── legacy/         # Deprecated files (temporary)
```

## Components and Interfaces

### 1. Naming Convention System

**Unified Naming Pattern:**
- **Base Styles**: `base-{name}.css` (typography, variables, utilities)
- **Components**: `component-{name}.css` (reusable UI elements)
- **Sections**: `section-{name}.css` (page layout sections)
- **Pages**: `page-{template}.css` (template-specific styles)
- **Utilities**: `utility-{function}.css` (helper classes)

**File Grouping Strategy:**
- Related CSS, JS, and Liquid files use identical base names
- Example: `component-product-card.css`, `component-product-card.js`, `product-card.liquid`

### 2. CSS Architecture

**BEM Methodology with Component Namespacing:**
```css
/* Component namespace */
.c-product-card { }
.c-product-card__image { }
.c-product-card__title { }
.c-product-card--featured { }

/* Section namespace */
.s-hero { }
.s-hero__content { }
.s-hero__title { }

/* Utility namespace */
.u-text-center { }
.u-margin-bottom-large { }
```

**CSS Organization Order:**
1. **Variables and Custom Properties**
2. **Layout and Positioning**
3. **Typography**
4. **Colors and Backgrounds**
5. **Borders and Shadows**
6. **Animations and Transitions**
7. **Responsive Breakpoints**

### 3. Component Consolidation Strategy

**Redesign System Integration:**
- Merge `redesign-*` components with their original counterparts
- Preserve redesign styling as the primary version
- Create fallback classes for backward compatibility
- Remove override files by integrating styles properly

**Example Consolidation:**
```css
/* Before: redesign-product-page.css + section-main-product.css */
/* After: component-product-display.css */

.c-product-display {
  /* Unified component styles */
}

.c-product-display--redesign {
  /* Enhanced redesign features */
}

.c-product-display--legacy {
  /* Backward compatibility */
}
```

## Data Models

### File Organization Schema

```typescript
interface ComponentFile {
  name: string;           // Base component name
  category: 'base' | 'component' | 'section' | 'page' | 'utility';
  files: {
    css?: string;         // Stylesheet path
    js?: string;          // JavaScript path
    liquid?: string;      // Template path
  };
  dependencies: string[]; // Other components this depends on
  status: 'active' | 'deprecated' | 'legacy';
}
```

### Migration Mapping

```typescript
interface MigrationRule {
  oldPath: string;
  newPath: string;
  action: 'move' | 'merge' | 'split' | 'delete';
  references: string[];   // Files that reference this asset
  backupRequired: boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Naming Convention Consistency
*For any* file in the project, its name should follow the established naming pattern for its category (base, component, section, page, utility)
**Validates: Requirements 1.1, 1.3**

### Property 2: No Duplicate Components
*For any* component functionality, there should exist exactly one authoritative implementation file
**Validates: Requirements 1.2, 2.1**

### Property 3: File Type Separation
*For any* file, it should be categorized correctly based on its content and placed in the appropriate organizational structure
**Validates: Requirements 1.4, 3.2**

### Property 4: CSS Deduplication
*For any* CSS rule set, if it appears in multiple files, it should be extracted into a shared utility or base style
**Validates: Requirements 2.3, 4.2**

### Property 5: No Override Files
*For any* CSS file, it should not use excessive `!important` declarations or be named with "override" patterns
**Validates: Requirements 2.2, 4.4**

### Property 6: Reference Integrity
*For any* file reference (import, link, src), the referenced file should exist and be accessible
**Validates: Requirements 7.1, 2.4**

### Property 7: Related File Grouping
*For any* component with multiple file types (CSS, JS, Liquid), all files should use the same base naming pattern
**Validates: Requirements 3.1, 5.2**

### Property 8: CSS Architecture Consistency
*For any* CSS class name, it should follow the established BEM methodology with appropriate namespace prefixes
**Validates: Requirements 4.1, 4.3**

### Property 9: Shopify Structure Compliance
*For any* theme file, it should be placed in a location that complies with Shopify theme structure requirements
**Validates: Requirements 5.4**

### Property 10: Performance Optimization
*For any* consolidated CSS file, the total number of HTTP requests should be reduced compared to the original implementation
**Validates: Requirements 8.1, 8.2**

## Error Handling

### Migration Safety
- **Backup Strategy**: Create full backup before any file operations
- **Rollback Mechanism**: Maintain ability to revert changes if issues arise
- **Reference Validation**: Verify all file references before and after migration
- **Incremental Migration**: Process files in small batches to isolate issues

### Validation Checks
- **Syntax Validation**: Ensure all CSS and JavaScript files remain syntactically valid
- **Link Validation**: Verify all asset references resolve correctly
- **Template Validation**: Ensure Liquid templates compile without errors
- **Visual Regression**: Compare rendered output before and after changes

### Conflict Resolution
- **Naming Conflicts**: Establish priority rules for resolving duplicate names
- **Style Conflicts**: Define cascade order for merged CSS rules
- **Dependency Conflicts**: Resolve circular or missing dependencies
- **Version Conflicts**: Handle cases where multiple versions of components exist

## Testing Strategy

### Dual Testing Approach
The reorganization will use both **unit tests** and **property-based tests** to ensure correctness:

**Unit Tests:**
- Verify specific file operations (move, merge, rename)
- Test individual component functionality after migration
- Validate specific CSS rule consolidations
- Check particular reference updates

**Property-Based Tests:**
- Verify naming conventions across all files (minimum 100 iterations)
- Test file organization rules across the entire project
- Validate CSS architecture consistency across all stylesheets
- Check reference integrity across all file types

**Property Test Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: project-reorganization, Property {number}: {property_text}**
- Use file system scanning and CSS parsing for comprehensive coverage

**Integration Testing:**
- Full site functionality testing after reorganization
- Visual regression testing using screenshot comparison
- Performance testing to verify optimization goals
- Cross-browser compatibility testing

**Testing Framework:**
- **CSS Parsing**: Use PostCSS or similar for CSS analysis
- **File System**: Use Node.js fs module for file operations testing
- **Property Testing**: Use fast-check or similar for property-based testing
- **Visual Testing**: Use Playwright or similar for screenshot comparison
