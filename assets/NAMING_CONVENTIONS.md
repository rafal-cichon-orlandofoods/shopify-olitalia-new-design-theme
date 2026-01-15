# Olitalia Theme - Naming Conventions & BEM Methodology

## Overview

This document outlines the naming conventions and BEM (Block Element Modifier) methodology used in the reorganized Olitalia Shopify theme. The new system provides consistency, maintainability, and clear separation of concerns.

## Directory Structure

```
/assets/
├── base/           # Foundation styles, variables, utilities
├── components/     # Reusable UI components
├── sections/       # Page-specific section styles
├── pages/          # Page-specific overrides
├── vendor/         # Third-party libraries
└── legacy/         # Deprecated files (temporary)
```

## File Naming Conventions

### Base Styles
- **Pattern**: `base-{name}.css`
- **Purpose**: Foundation styles, variables, typography, layout utilities
- **Examples**: 
  - `base-variables.css` - CSS custom properties
  - `base-typography.css` - Typography foundation
  - `base-layout.css` - Layout and grid systems
  - `utilities.css` - Utility classes

### Components
- **Pattern**: `component-{name}.css`
- **Purpose**: Reusable UI components
- **Examples**:
  - `component-button.css` - Button component
  - `component-card.css` - Card component
  - `component-modal.css` - Modal component

### Sections
- **Pattern**: `section-{name}.css`
- **Purpose**: Page layout sections (Shopify sections)
- **Examples**:
  - `section-header.css` - Site header
  - `section-hero.css` - Hero/banner sections
  - `section-footer.css` - Site footer

### Pages
- **Pattern**: `page-{template}.css`
- **Purpose**: Template-specific styles
- **Examples**:
  - `page-product.css` - Product template styles
  - `page-recipe.css` - Recipe template styles
  - `page-collection.css` - Collection template styles

### Utilities
- **Pattern**: `utilities.css` or `utility-{function}.css`
- **Purpose**: Helper classes for common patterns
- **Examples**:
  - `utilities.css` - General utility classes
  - `utility-spacing.css` - Spacing utilities
  - `utility-typography.css` - Typography utilities

## BEM Methodology with Namespaces

### Namespace Prefixes

- **b-** : Base styles (typography, layout foundations)
- **c-** : Components (reusable UI elements)
- **s-** : Sections (page layout sections)
- **p-** : Pages (page-specific styles)
- **u-** : Utilities (helper classes)

### BEM Structure

```css
.namespace-block__element--modifier
```

#### Examples:

**Component Example (Button):**
```css
.c-button                    /* Block */
.c-button__icon             /* Element */
.c-button--primary          /* Modifier */
.c-button--large            /* Modifier */
.c-button__icon--left       /* Element with modifier */
```

**Section Example (Header):**
```css
.s-header                   /* Block */
.s-header__logo            /* Element */
.s-header__nav             /* Element */
.s-header__nav-item        /* Element */
.s-header--scrolled        /* Modifier */
```

**Utility Example:**
```css
.u-text--center           /* Utility class */
.u-margin-top--large      /* Utility class */
.u-hidden--mobile         /* Utility class with modifier */
```

## CSS Organization Within Files

### Order of CSS Rules

1. **Variables and Custom Properties**
2. **Base Block Styles**
3. **Elements**
4. **Modifiers**
5. **States (:hover, :focus, etc.)**
6. **Media Queries**

### Example Structure:

```css
/* Variables */
:root {
  --component-color: #000;
}

/* Block */
.c-component {
  /* Base styles */
}

/* Elements */
.c-component__element {
  /* Element styles */
}

.c-component__another-element {
  /* Another element styles */
}

/* Modifiers */
.c-component--variant {
  /* Modifier styles */
}

/* States */
.c-component:hover {
  /* Hover styles */
}

/* Media Queries */
@media (max-width: 768px) {
  .c-component {
    /* Responsive styles */
  }
}
```

## File Grouping Strategy

Related files should use identical base names:

- `component-product-card.css`
- `component-product-card.js`
- `product-card.liquid` (in snippets/)

## Migration from Old System

### Old → New Mapping

- `redesign-header.css` → `section-header.css`
- `component-cart.css` → `component-cart.css` (already follows convention)
- `section-main-product.css` → `page-product.css`
- `redesign-product-page.css` → `page-product.css` (merged)

### Consolidation Rules

1. **Redesign Priority**: When merging `redesign-*` with original files, redesign styles take precedence
2. **Backward Compatibility**: Create fallback classes for legacy support
3. **Override Elimination**: Remove `!important` declarations and integrate styles properly

## Best Practices

### CSS Writing

1. **Use CSS Custom Properties**: Leverage variables for consistency
2. **Mobile-First**: Write mobile styles first, then enhance for larger screens
3. **Avoid Deep Nesting**: Keep specificity low
4. **Use Semantic Class Names**: Names should describe purpose, not appearance

### Component Development

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composable**: Components should work well together
3. **Accessible**: Include proper ARIA attributes and semantic HTML
4. **Performance**: Consider loading performance and critical CSS

### Maintenance

1. **Document Changes**: Update this file when adding new patterns
2. **Test Thoroughly**: Ensure changes don't break existing functionality
3. **Review Dependencies**: Check for component relationships before changes
4. **Validate**: Use CSS linting and validation tools

## Tools and Validation

- **CSS Validation**: Use PostCSS or similar for syntax validation
- **Linting**: Implement stylelint for consistency
- **Documentation**: Keep this file updated with new patterns
- **Testing**: Use visual regression testing for UI changes

## Examples in Practice

### Button Component Usage

```html
<!-- Basic button -->
<button class="c-button">Click me</button>

<!-- Primary button with large size -->
<button class="c-button c-button--primary c-button--large">
  Get Started
</button>

<!-- Button with icon -->
<button class="c-button c-button--secondary">
  <span class="c-button__icon">→</span>
  Learn More
</button>
```

### Card Component Usage

```html
<!-- Basic card -->
<div class="c-card">
  <img src="image.jpg" alt="Product" class="c-card__image">
  <div class="c-card__content">
    <h3 class="c-card__title">Product Name</h3>
    <p class="c-card__text">Product description...</p>
  </div>
</div>

<!-- Featured card variant -->
<div class="c-card c-card--featured">
  <!-- Card content -->
</div>
```

## Implementation Status

### ✅ Completed Components
- **Header Component** (`component-header.css`)
  - ✅ BEM classes: `.c-header`, `.c-header__nav-link`, `.c-mobile-menu`
  - ✅ Legacy compatibility maintained
  - ✅ Reduced `!important` declarations
  
- **Footer Component** (`component-footer.css`)
  - ✅ BEM classes: `.c-footer`, `.c-footer__logo-img`, `.c-footer__link`
  - ✅ Legacy compatibility maintained
  
- **Homepage Component** (`component-homepage.css`)
  - ✅ BEM classes: `.c-hero`, `.c-hero__title`, `.c-hero__button`
  - ✅ Legacy compatibility maintained
  
- **Product Page Component** (`component-product-page.css`)
  - ✅ BEM classes: `.c-product`, `.c-product__title`, `.c-product__main-image`
  - ✅ Legacy compatibility maintained

### 🔄 In Progress
- Section components (s- prefix)
- Utility classes (u- prefix)
- Layout components (l- prefix)

### ⏳ Planned
- Complete template updates to use new BEM classes
- Legacy class removal (future phase)
- Additional component conversions

## Recent Updates (Task 5.2)

### Utility Classes System Implementation
1. **CSS Custom Properties**: Comprehensive variable system for consistency
2. **Utility Classes**: Extensive helper classes with `u-` prefix
3. **Component Integration**: Updated components to use CSS variables
4. **Performance Optimization**: Reduced duplicate CSS rules across files
5. **Responsive Utilities**: Mobile-specific utility classes

### CSS Variables Added
```css
:root {
  /* Typography */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-secondary: 'Inter', Arial, sans-serif;
  
  /* Colors */
  --color-primary: #004f2f;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-text-primary: #2c2c2c;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  
  /* Spacing */
  --spacing-xs: 10px;
  --spacing-sm: 15px;
  --spacing-md: 20px;
  --spacing-lg: 40px;
  --spacing-xl: 60px;
  --spacing-xxl: 80px;
  
  /* Layout */
  --container-max-width: 1400px;
  --container-padding: 40px;
  --container-padding-mobile: 20px;
}
```

### Utility Classes Categories
- **Typography**: Font families, weights, sizes, alignment
- **Colors**: Text and background colors
- **Spacing**: Margins, padding, gaps
- **Layout**: Display, flexbox, grid, positioning
- **Responsive**: Breakpoint-specific utilities
- **Effects**: Borders, shadows, transitions

### Component Updates
- **Header**: Uses CSS variables for spacing and colors
- **Footer**: Integrated utility classes for consistent styling
- **Homepage**: Updated with variable-based spacing and typography
- **Product Page**: Consistent spacing and color variables

## Recent Updates (Task 5.1)

### BEM Implementation Highlights
1. **Component Namespacing**: All major components now use `c-` prefix
2. **Element Naming**: Consistent `__` separator for elements
3. **Modifier Support**: `--` separator for modifiers (e.g., `--active`)
4. **Backward Compatibility**: Legacy classes work alongside new BEM classes
5. **Reduced Specificity**: Eliminated excessive `!important` declarations

### Example Conversions

#### Header Component
```css
/* Old */
.redesign-header__nav-link { }

/* New (both work) */
.redesign-header__nav-link,
.c-header__nav-link { }
```

#### Footer Component  
```css
/* Old */
.redesign-footer__logo img { }

/* New (both work) */
.redesign-footer__logo img,
.c-footer__logo-img { }
```

#### Homepage Component
```css
/* Old */
.redesign-hero__title { }

/* New (both work) */
.redesign-hero__title,
.c-hero__title { }
```

## Recent Updates (Task 7.1)

### File Naming Standardization
1. **Page-Specific Files**: Renamed `redesign-*` files to use `page-` prefix
2. **Consistency**: All page-specific styles now follow `page-[name].css` convention
3. **Template Updates**: Updated all Liquid template references
4. **Backward Compatibility**: Old files maintained temporarily for safety

### File Renames Completed
- `redesign-about-us.css` → `page-about-us.css`
- `redesign-recipe-page.css` → `page-recipe.css`
- `redesign-recipes-page.css` → `page-recipes.css`
- `redesign-sustainability.css` → `page-sustainability.css`

### Template References Updated
- `sections/redesign-about-us.liquid` → References `page-about-us.css`
- `sections/redesign-recipe-page.liquid` → References `page-recipe.css`
- `templates/page.recipe-redesign.liquid` → References `page-recipe.css`
- `sections/recipes-showcase.liquid` → References `page-recipes.css`
- `sections/redesign-sustainability.liquid` → References `page-sustainability.css`

### File Organization Summary
**Components** (reusable UI elements):
- `component-header.css`, `component-footer.css`, `component-homepage.css`
- `component-cart.css`, `component-modal.css`, `component-slider.css`

**Pages** (page-specific styles):
- `page-about-us.css`, `page-recipe.css`, `page-recipes.css`
- `page-sustainability.css`, `page-collaborations.css`, `page-events.css`

**Sections** (Shopify section styles):
- `section-header.css`, `section-footer.css`, `section-newsletter.css`
- `section-main-product.css`, `section-testimonials.css`

**Base** (foundation styles):
- `base/utilities.css` - CSS variables and utility classes