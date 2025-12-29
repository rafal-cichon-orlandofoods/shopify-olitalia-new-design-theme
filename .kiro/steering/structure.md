# Project Structure

## Shopify Theme Architecture
This follows standard Shopify theme structure with custom extensions for recipe functionality and a modern redesign system.

## Core Directories

### `/assets/`
Static assets organized by type and function:
- **CSS Files**: Component-based (`component-*.css`) and section-based (`section-*.css`)
- **Redesign CSS**: Modern redesign system (`redesign-*.css`)
- **JavaScript**: Feature modules (`component-*.js`, `section-*.js`)
- **Redesign JS**: Modern functionality (`sustainability-counter.js`)
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
- **Redesign Templates**: `page.sustainability-figma.json`, `page.lookbook.json`
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
- **Redesign Classes**: `.redesign-component__element`
- **Utility Classes**: `.text-size--large`, `.section-heading--center`
- **Component Prefixes**: `.recipe-`, `.product-`, `.cart-`

### File Naming
- **Components**: `component-[name].css/js`
- **Sections**: `section-[name].css/js`
- **Redesign**: `redesign-[name].css/js/liquid`
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
- **Modern Styling**: Updated design system with Inter font
- **Progressive Enhancement**: Backwards compatibility maintained
- **Animation System**: Ken Burns effects, 3D logo animations, counter animations
- **Performance**: Mobile-first with conditional loading

## Key Pages & Templates

### About Us (`/pages/about-us`)
- **Template**: `templates/page.lookbook.json`
- **Sections**: `redesign-header`, `redesign-about-us`, `info-tabs`, `redesign-footer`
- **Features**: Hero video, Our Values tabs, Learn More button

### Sustainability (`/pages/sustainability`)
- **Template**: `templates/page.sustainability-figma.json`
- **Sections**: `redesign-header`, `sustainability-figma`, `redesign-footer`
- **Features**: Figma-perfect design, counter animations, Inter typography

### Production (`/pages/production`)
- **Template**: `templates/page.json`
- **Sections**: Standard page with AI-generated blocks
- **Features**: Innovation showcase with image layouts

## Recent Improvements

### Image Loading Optimization
- Fixed preload logic in `info-tabs` section
- Added missing `reveal-opacity` animation
- Improved first image loading on About Us page

### Button Integration
- Learn More button in Our Values section
- Black styling (#000000) with hover effects
- External link to main Olitalia website

### Logo Enhancements
- 3D effects with dual drop-shadows
- Dynamic shine animations
- Mobile size optimization (32px → 50px)
- Accessibility support with reduced motion