# Redesign System

## Overview
The Olitalia theme includes a modern redesign system with new components and enhanced user experience. This system coexists with the original theme components while providing updated styling and functionality.

## Redesign Components

### Header & Navigation
- **File**: `sections/redesign-header.liquid`
- **CSS**: `assets/redesign-header.css`
- **Features**:
  - Desktop: Logo left, navigation center, search/cart right
  - Mobile: Hamburger left, logo center, icons right
  - Premium 3D logo effects with shine animations
  - Mobile-optimized performance (animations disabled on mobile)
  - Accessibility support with `prefers-reduced-motion`

### Homepage
- **File**: `sections/redesign-homepage-hero.liquid`
- **CSS**: `assets/redesign-homepage.css`
- **Features**:
  - Ken Burns animation effect on hero background
  - Admin controls for motion strength
  - Desktop-only animations (disabled on mobile ≤768px)
  - Brand badge section with disclaimer styling

### About Us Page
- **Template**: `templates/page.lookbook.json`
- **Section**: `sections/redesign-about-us.liquid`
- **CSS**: `assets/redesign-about-us.css`
- **Features**:
  - Hero image with video integration
  - Custom video thumbnails with play buttons
  - Values grid with circular images
  - Quote section with proper typography
  - Learn More button integration

### Product Page
- **CSS**: `assets/redesign-product-page.css`
- **Features**:
  - Responsive gradient spotlight effect
  - Mobile: 49% 10% positioning with larger vw values
  - Desktop: 31% 26% positioning with smaller vw values
  - Optimized for both mobile and desktop layouts

### Sustainability Page
- **Template**: `templates/page.sustainability-figma.json`
- **Section**: `sections/sustainability-figma.liquid`
- **CSS**: `assets/sustainability-figma.css`
- **JavaScript**: `assets/sustainability-counter.js`
- **Features**:
  - Pixel-perfect Figma design implementation
  - Counter animations using Intersection Observer
  - Inter font family with exact Figma specifications
  - Responsive design with mobile optimizations

### Footer
- **File**: `sections/redesign-footer.liquid`
- **CSS**: `assets/redesign-footer.css`
- **Features**:
  - Consistent logo styling with header
  - Premium 3D effects matching header design

## Typography System
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Sizes**: Consistent with Figma specifications
  - Hero titles: 96px (desktop), 48px (mobile)
  - Descriptions: 32px (desktop), 18px (mobile)
  - Section titles: 96px (desktop), 36px (mobile)
  - Body text: 24px (desktop), 16px (mobile)

## Animation System
- **Ken Burns Effect**: CSS-based background image animation
- **Logo Effects**: Multi-layer 3D effects with shine animations
- **Counter Animations**: JavaScript-based number counting
- **Performance**: Mobile optimizations and reduced motion support

## Color Palette
- **Primary Green**: #004f2f (Olitalia brand color)
- **Black**: #000000 (buttons, text)
- **White**: #ffffff (backgrounds)
- **Gray**: #666666 (secondary text)

## Responsive Breakpoints
- **Mobile**: ≤768px
- **Tablet**: 769px - 1023px
- **Desktop**: ≥1024px
- **Large Desktop**: ≥1400px

## Integration with Original Theme
- Redesign components use `redesign-` prefix
- Coexists with original Combine theme components
- Progressive enhancement approach
- Backwards compatibility maintained

## Admin Controls
- Motion strength controls for animations
- Video thumbnail customization
- Learn More button text and URL settings
- Logo upload and sizing options
- Color and spacing customizations

## Performance Optimizations
- Mobile-first approach
- Lazy loading for images
- Conditional animation loading
- Optimized asset delivery
- Reduced motion accessibility support