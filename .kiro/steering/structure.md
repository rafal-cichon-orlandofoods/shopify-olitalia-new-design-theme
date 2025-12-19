# Project Structure

## Shopify Theme Architecture
This follows standard Shopify theme structure with custom extensions for recipe functionality.

## Core Directories

### `/assets/`
Static assets organized by type and function:
- **CSS Files**: Component-based (`component-*.css`) and section-based (`section-*.css`)
- **JavaScript**: Feature modules (`component-*.js`, `section-*.js`)
- **Fonts**: SohoPro family, Olitalia, Raleway font files
- **Icons**: Favicon set and app icons
- **Images**: Static images and graphics

### `/sections/`
Shopify sections (reusable page components):
- **Main Templates**: `main-*.liquid` (page templates)
- **Feature Sections**: Recipe showcases, product bundles, chef profiles
- **Redesign Sections**: `redesign-*.liquid` (newer design system)
- **Helper Sections**: Utility sections for cart, search, etc.

### `/templates/`
Page templates defining layout structure:
- **Standard Pages**: `page.*.json` (JSON templates)
- **Product Pages**: `product.*.json` with specialized variants
- **Recipe Templates**: `page.recipe-*.liquid` (custom recipe pages)
- **Chef Templates**: `page.chef-*.liquid` (chef profile pages)
- **Customer Account**: `/customers/` subfolder

### `/snippets/`
Reusable template components:
- **Recipe Components**: `recipe-*.liquid`
- **Product Components**: `product-*.liquid`
- **UI Components**: Forms, buttons, icons
- **Utility Snippets**: Head variables, lazy loading, breadcrumbs

### `/blocks/`
Shopify 2.0 blocks for flexible content:
- **Content Blocks**: Headings, text, images, buttons
- **AI Generated**: `ai_gen_block_*.liquid` (dynamic content)
- **Specialized**: Star ratings, product add-to-cart

### `/config/`
Theme configuration:
- `settings_schema.json`: Theme customization options
- `settings_data.json`: Current theme settings

### `/locales/`
Internationalization files:
- **25+ Languages**: JSON files for translations
- **Schema Files**: `*.schema.json` for admin interface translations

### `/layout/`
Base layout templates (theme wrapper)

## Naming Conventions

### CSS Classes
- **BEM-style**: `.component__element--modifier`
- **Utility Classes**: `.text-size--large`, `.section-heading--center`
- **Component Prefixes**: `.recipe-`, `.product-`, `.cart-`

### File Naming
- **Components**: `component-[name].css/js`
- **Sections**: `section-[name].css/js`
- **Pages**: `page.[handle].json/liquid`
- **Recipes**: `recipe-[name].liquid`
- **Chefs**: `chef-[name].liquid`

### Liquid Variables
- **Recipe Data**: `recipe_title`, `recipe_description`, `prep_time`
- **Settings**: `section.settings.[name]`
- **Blocks**: `block.settings.[name]`

## Custom Features

### Recipe System
- **Structured Data**: JSON-LD schema for SEO
- **Metafields**: Recipe data storage
- **Chef Integration**: Chef profiles linked to recipes
- **Print Functionality**: Recipe printing capabilities

### Redesign System
- **New Components**: `redesign-*.liquid` sections
- **Modern Styling**: Updated design system
- **Progressive Enhancement**: Backwards compatibility maintained