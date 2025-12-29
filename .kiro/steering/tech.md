# Technology Stack

## Platform
- **Shopify Liquid Theme** - E-commerce platform with Liquid templating engine
- **Theme**: Combine v3.1.1 by KrownThemes (with custom redesign system)
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
- **Intersection Observer**: For counter animations and scroll-based effects

## Asset Organization
- **CSS**: Component-based architecture (`component-*.css`, `section-*.css`)
- **Redesign CSS**: Modern system (`redesign-*.css`)
- **JavaScript**: Feature-based modules (`component-*.js`, `section-*.js`)
- **Fonts**: Custom font files (SohoPro family, Olitalia, Raleway, Inter)
- **Icons**: SVG-based icon system

## Typography System
- **Primary**: Inter (Google Fonts) - Used in redesign system
- **Secondary**: SohoPro family - Original theme fonts
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Loading**: CSS font-display: swap for performance

## Animation & Effects
- **CSS Animations**: Ken Burns effect, 3D logo transforms, fade transitions
- **JavaScript Animations**: Counter animations with Intersection Observer
- **Performance**: Conditional loading based on device capabilities
- **Accessibility**: Respects `prefers-reduced-motion` user preference

## Responsive Design
- **Approach**: Mobile-first progressive enhancement
- **Breakpoints**: 
  - Mobile: ≤768px
  - Tablet: 769px - 1023px  
  - Desktop: ≥1024px
  - Large: ≥1400px
- **Images**: Responsive with lazy loading and proper sizing

## Development Commands
Since this is a Shopify theme, development typically involves:
- **Shopify CLI**: `shopify theme dev` (for local development)
- **Theme Upload**: `shopify theme push` (deploy to store)
- **Theme Download**: `shopify theme pull` (sync from store)

## Performance Optimizations
- **Image Optimization**: Shopify's responsive image system
- **Lazy Loading**: Custom implementation for images and animations
- **Mobile Performance**: Disabled heavy animations on mobile devices
- **Font Loading**: Optimized web font delivery
- **Asset Minification**: Shopify's built-in compression

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Progressive enhancement approach
- Mobile-first responsive design
- Graceful degradation for older browsers

## Custom Integrations
- **Figma Integration**: Pixel-perfect design implementation
- **External Links**: Proper security attributes for external navigation
- **Video Integration**: Custom thumbnail and autoplay functionality
- **Counter Animations**: Smooth number counting with easing

## Code Quality
- **Liquid Best Practices**: Proper templating and performance
- **CSS Architecture**: BEM methodology with component organization
- **JavaScript**: Vanilla ES6+ with proper error handling
- **Accessibility**: WCAG compliance and semantic HTML