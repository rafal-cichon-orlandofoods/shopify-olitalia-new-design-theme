# Technology Stack

## Platform
- **Shopify Liquid Theme** - E-commerce platform with Liquid templating engine
- **Theme**: Combine v3.1.1 by KrownThemes
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)

## Build System
- **No build process required** - Shopify handles asset compilation
- **Asset Pipeline**: Shopify's built-in asset processing
- **CSS**: Native CSS with CSS custom properties (variables)
- **JavaScript**: Vanilla JS modules, no bundling required

## Key Libraries & Dependencies
- **Lazy Loading**: Custom lazy image implementation
- **Slider/Carousel**: Custom slider components
- **Modal System**: Custom modal and popup components
- **Form Handling**: Native Shopify form processing
- **Predictive Search**: Shopify's built-in search API
- **Localization**: Shopify's native i18n system

## Asset Organization
- **CSS**: Component-based architecture (`component-*.css`, `section-*.css`)
- **JavaScript**: Feature-based modules (`component-*.js`, `section-*.js`)
- **Fonts**: Custom font files (SohoPro family, Olitalia, Raleway)
- **Icons**: SVG-based icon system

## Development Commands
Since this is a Shopify theme, development typically involves:
- **Shopify CLI**: `shopify theme dev` (for local development)
- **Theme Upload**: `shopify theme push` (deploy to store)
- **Theme Download**: `shopify theme pull` (sync from store)

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Progressive enhancement approach
- Mobile-first responsive design