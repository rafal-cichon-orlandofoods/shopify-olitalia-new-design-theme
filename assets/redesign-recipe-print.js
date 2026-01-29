/**
 * Recipe Print Functionality for Redesigned Theme
 * Enhanced print experience for recipe pages
 */

class RecipePrint {
  constructor() {
    this.init();
  }

  init() {
    this.setupPrintButton();
    this.setupPrintStyles();
    this.handlePrintEvents();
  }

  setupPrintButton() {
    const printButton = document.querySelector('.redesign-recipe-print-btn');
    if (printButton) {
      printButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.printRecipe();
      });
    }
  }

  setupPrintStyles() {
    // Add dynamic print styles if needed
    const printStyles = `
            @media print {
                .recipe-printing .print-loading {
                    display: none !important;
                }
                
                /* Ensure proper page margins */
                @page {
                    margin: 0.75in;
                    size: letter;
                }
                
                /* Prevent orphaned content */
                .redesign-recipe-ingredients__item,
                .redesign-recipe-instructions__step {
                    break-inside: avoid;
                }
                
                /* Ensure ingredients don't break across pages */
                .redesign-recipe-ingredients {
                    break-inside: avoid;
                }
                
                /* Keep instruction steps together */
                .redesign-recipe-instructions__step {
                    break-inside: avoid;
                    margin-bottom: 0.5rem;
                }
                
                /* Hide print button and other UI elements */
                .redesign-recipe-actions,
                .redesign-recipe-print-btn {
                    display: none !important;
                }
            }
        `;

    // Add styles to head if they don't exist
    if (!document.querySelector('#redesign-recipe-print-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'redesign-recipe-print-styles';
      styleSheet.textContent = printStyles;
      document.head.appendChild(styleSheet);
    }
  }

  handlePrintEvents() {
    // Listen for print events
    window.addEventListener('beforeprint', () => {
      this.onBeforePrint();
    });

    window.addEventListener('afterprint', () => {
      this.onAfterPrint();
    });

    // Handle keyboard shortcut (Ctrl+P / Cmd+P)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        this.printRecipe();
      }
    });
  }

  printRecipe() {
    // Show loading state
    this.showPrintLoading();

    // Create clean print version
    this.createPrintVersion();
  }

  showPrintLoading() {
    const printButton = document.querySelector('.redesign-recipe-print-btn');
    if (printButton) {
      const originalContent = printButton.innerHTML;
      printButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="print-loading">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Preparing...
            `;

      // Store original content for restoration
      printButton.dataset.originalContent = originalContent;
    }
  }

  getRecipeData() {
    try {
      const recipeData = {
        title: (document.querySelector('.redesign-recipe-hero__title') || 
                document.querySelector('.redesign-recipe__title'))?.textContent?.trim() || 'Recipe',
        description: (document.querySelector('.redesign-recipe-main p') || 
                     document.querySelector('.redesign-recipe__description'))?.textContent?.trim() || null,
        chef: (document.querySelector('.redesign-recipe-chef__name') || 
               document.querySelector('.redesign-recipe__chef'))?.textContent?.trim() || null,
        image: (document.querySelector('.redesign-recipe-hero__image') || 
                document.querySelector('.redesign-recipe__hero-image'))?.src || null,
        totalTime: null,
        prepTime: null,
        cookTime: null,
        servings: null,
        difficulty: null,
        category: null,
        ingredients: [],
        instructions: []
      };

      // Log warning if title is missing
      if (!document.querySelector('.redesign-recipe-hero__title') && !document.querySelector('.redesign-recipe__title')) {
        console.warn('Recipe title not found, using default');
      }

      // Extract metadata from both possible structures
      const metaItems = document.querySelectorAll('.redesign-recipe-meta__item, .redesign-recipe__meta-item');
      metaItems.forEach(item => {
        const label = item.querySelector('.redesign-recipe-meta__label, .redesign-recipe__meta-label')?.textContent?.trim().toLowerCase();
        const value = item.querySelector('.redesign-recipe-meta__value, .redesign-recipe__meta-value')?.textContent?.trim();
        
        if (!label || !value) return;

        if (label.includes('prep')) {
          recipeData.prepTime = value;
        } else if (label.includes('cook')) {
          recipeData.cookTime = value;
        } else if (label.includes('total')) {
          recipeData.totalTime = value;
        } else if (label.includes('serving')) {
          recipeData.servings = value;
        } else if (label.includes('difficulty')) {
          recipeData.difficulty = value;
        } else if (label.includes('category')) {
          recipeData.category = value;
        }
      });

      // Extract tags (category and difficulty)
      const tags = document.querySelectorAll('.redesign-recipe__tag');
      tags.forEach((tag, index) => {
        const text = tag.textContent?.trim();
        if (index === 0 && !recipeData.category) {
          recipeData.category = text;
        } else if (index === 1 && !recipeData.difficulty) {
          recipeData.difficulty = text;
        }
      });

      // Extract ingredients from both possible structures
      const ingredientItems = document.querySelectorAll(
        '.redesign-recipe-ingredients__item, ' +
        '.redesign-recipe__sidebar-list li, ' +
        '.redesign-recipe__ingredient-text'
      );
      
      const seenIngredients = new Set(); // Track unique ingredients
      
      ingredientItems.forEach(item => {
        // Get text from the ingredient text span or the item itself
        const textElement = item.querySelector('.redesign-recipe__ingredient-text') || item;
        const text = textElement.textContent?.trim();
        if (!text) return;

        // Create a normalized key for deduplication (lowercase, no extra spaces)
        const normalizedKey = text.toLowerCase().replace(/\s+/g, ' ');
        
        // Skip if we've already seen this ingredient
        if (seenIngredients.has(normalizedKey)) {
          return;
        }
        seenIngredients.add(normalizedKey);

        // Try to split ingredient into amount and name
        const parts = text.match(/^([\d\s\/¼½¾⅓⅔⅛⅜⅝⅞]+(?:\s*(?:cup|tablespoon|teaspoon|tbsp|tsp|oz|lb|g|kg|ml|l|piece|pieces|to taste)?s?))\s+(.+)$/i);
        
        let amount = '';
        let name = text;
        
        if (parts && parts.length >= 3) {
          amount = parts[1].trim();
          name = parts[2].trim();
        }

        // Check if this is a featured ingredient
        const isFeatured = text.toLowerCase().includes('olitalia') || 
                          text.toLowerCase().includes('olive oil') ||
                          item.classList.contains('featured-ingredient') ||
                          item.closest('.featured-ingredient');

        recipeData.ingredients.push({
          amount,
          name,
          featured: isFeatured
        });
      });

      // Extract instructions from both possible structures
      const instructionSteps = document.querySelectorAll(
        '.redesign-recipe-instructions__step, ' +
        '.redesign-recipe__instruction-item'
      );
      
      instructionSteps.forEach((step, index) => {
        const textElement = step.querySelector('.redesign-recipe-instructions__text, .redesign-recipe__instruction-text');
        const content = textElement?.textContent?.trim();
        
        if (content) {
          recipeData.instructions.push({
            step: index + 1,
            content
          });
        }
      });

      console.log('Extracted recipe data:', recipeData);
      return recipeData;
    } catch (error) {
      console.error('Error extracting recipe data:', error);
      // Return minimal recipe data on error
      return {
        title: 'Recipe',
        description: null,
        chef: null,
        image: null,
        totalTime: null,
        prepTime: null,
        cookTime: null,
        servings: null,
        difficulty: null,
        category: null,
        ingredients: [],
        instructions: []
      };
    }
  }

  generatePrintHTML(recipeData) {
    try {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipeData.title} - Recipe</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.5;
            color: #2c2c2c;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.4in;
            background: white;
        }
        
        .recipe-header {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 1.5rem;
            align-items: start;
            margin-bottom: 1.25rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #000;
        }
        
        .recipe-header-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
        
        .recipe-title {
            font-family: 'Inter', sans-serif;
            font-size: 18pt;
            font-weight: 600;
            color: #2c2c2c;
            margin-bottom: 0.65rem;
            line-height: 1.15;
            text-align: left;
        }
        
        .recipe-meta-table {
            width: 100%;
            margin: 0.65rem 0;
            border-collapse: separate;
            border-spacing: 0;
        }
        
        .recipe-meta-table td {
            padding: 0.4rem 0.5rem;
            text-align: left;
            font-size: 8pt;
            vertical-align: top;
        }
        
        .recipe-meta-row {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        
        .recipe-meta-icon {
            width: 14px;
            height: 14px;
            flex-shrink: 0;
        }
        
        .recipe-meta-label {
            font-size: 7pt;
            font-weight: 600;
            color: #2c2c2c;
            margin-right: 0.3rem;
        }
        
        .recipe-meta-value {
            font-size: 8pt;
            color: #666;
            font-weight: 500;
        }
        
        .recipe-chef {
            font-size: 9pt;
            font-weight: 500;
            color: #666;
            margin-top: 0.4rem;
            text-align: left;
        }
        
        .recipe-description {
            font-size: 8.5pt;
            text-align: left;
            margin: 0.65rem 0 0 0;
            color: #666;
            line-height: 1.45;
        }
        
        .recipe-image-wrapper {
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
        
        .recipe-image {
            width: 100%;
            max-width: 280px;
            height: auto;
            border-radius: 6px;
            display: block;
            box-shadow: none;
        }
        
        .recipe-content {
            display: grid;
            grid-template-columns: 0.85fr 1.65fr;
            gap: 1.5rem;
            margin-top: 1.25rem;
        }
        
        .section-title {
            font-family: 'Inter', sans-serif;
            font-size: 12pt;
            font-weight: 600;
            color: #2c2c2c;
            margin-bottom: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 0.3rem;
        }
        
        .ingredients-list {
            list-style: none;
        }
        
        .ingredient {
            display: flex;
            padding: 0.3rem 0;
            border-bottom: 1px solid #e5e5e5;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .ingredient-amount {
            font-weight: 600;
            color: #2c2c2c;
            min-width: 60px;
            text-align: right;
            font-size: 8pt;
        }
        
        .ingredient-name {
            flex: 1;
            font-size: 8pt;
            color: #666;
        }
        
        .ingredient.featured {
            background: transparent;
            padding: 0.35rem 0;
            padding-left: 0;
            border-radius: 0;
            border: none;
            border-left: none;
            margin: 0;
        }
        
        .ingredient.featured .ingredient-amount {
            color: #2c2c2c;
            font-weight: 700;
        }
        
        .ingredient.featured .ingredient-name {
            font-weight: 700;
            color: #2c2c2c;
        }
        
        .instructions-list {
            list-style: none;
        }
        
        .instruction {
            display: flex;
            margin-bottom: 0.7rem;
            gap: 0.6rem;
            align-items: flex-start;
        }
        
        .instruction-number {
            background: transparent;
            color: #2c2c2c;
            border: 1px solid #2c2c2c;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 9pt;
            flex-shrink: 0;
        }
        
        .instruction-text {
            flex: 1;
            font-size: 8.5pt;
            padding-top: 0.2rem;
            color: #666;
            line-height: 1.45;
        }
        
        .recipe-footer {
            margin-top: 1.5rem;
            text-align: center;
            border-top: 1px solid #e5e5e5;
            padding-top: 0.85rem;
        }
        
        .brand-logo-image {
            width: 90px;
            height: auto;
            margin: 0 auto 0.4rem;
            display: block;
        }
        
        .footer-tagline {
            font-size: 8.5pt;
            color: #666;
            margin-bottom: 0.1rem;
        }
        
        .footer-url {
            font-size: 7.5pt;
            color: #999;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0.4in;
            }
            
            /* Ensure black prints as black, not gray */
            .instruction-number,
            .section-title,
            .brand-logo-image {
                color-adjust: exact;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="recipe-header">
        <div class="recipe-header-content">
            <h1 class="recipe-title">${recipeData.title}</h1>
            ${(recipeData.prepTime || recipeData.cookTime || recipeData.totalTime || recipeData.servings) ? `
            <table class="recipe-meta-table">
                ${recipeData.prepTime ? `
                <tr>
                    <td>
                        <div class="recipe-meta-row">
                            <svg class="recipe-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                            <span class="recipe-meta-label">Prep:</span>
                            <span class="recipe-meta-value">${recipeData.prepTime}</span>
                        </div>
                    </td>
                </tr>` : ''}
                ${recipeData.cookTime ? `
                <tr>
                    <td>
                        <div class="recipe-meta-row">
                            <svg class="recipe-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2C13.1 2 14 2.9 14 4V6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6V4C10 2.9 10.9 2 12 2Z"/>
                                <ellipse cx="12" cy="14" rx="8" ry="6"/>
                            </svg>
                            <span class="recipe-meta-label">Cook:</span>
                            <span class="recipe-meta-value">${recipeData.cookTime}</span>
                        </div>
                    </td>
                </tr>` : ''}
                ${recipeData.totalTime ? `
                <tr>
                    <td>
                        <div class="recipe-meta-row">
                            <svg class="recipe-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                            <span class="recipe-meta-label">Total:</span>
                            <span class="recipe-meta-value">${recipeData.totalTime}</span>
                        </div>
                    </td>
                </tr>` : ''}
                ${recipeData.servings ? `
                <tr>
                    <td>
                        <div class="recipe-meta-row">
                            <svg class="recipe-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span class="recipe-meta-label">Yield:</span>
                            <span class="recipe-meta-value">${recipeData.servings}</span>
                        </div>
                    </td>
                </tr>` : ''}
            </table>` : ''}
            ${recipeData.chef ? `<div class="recipe-chef">by ${recipeData.chef}</div>` : ''}
            ${recipeData.description ? `<p class="recipe-description">${recipeData.description}</p>` : ''}
        </div>
        ${recipeData.image ? `
        <div class="recipe-image-wrapper">
            <img src="${recipeData.image}" alt="${recipeData.title}" class="recipe-image">
        </div>` : ''}
    </div>
    
    <div class="recipe-content">
        <div class="ingredients-section">
            <h2 class="section-title">Ingredients</h2>
            <ul class="ingredients-list">
                ${recipeData.ingredients.map(ingredient => `
                    <li class="ingredient ${ingredient.featured ? 'featured' : ''}">
                        ${ingredient.amount ? `<span class="ingredient-amount">${ingredient.amount}</span>` : ''}
                        <span class="ingredient-name">${ingredient.name}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="instructions-section">
            <h2 class="section-title">Instructions</h2>
            <ol class="instructions-list">
                ${recipeData.instructions.map((instruction, index) => `
                    <li class="instruction">
                        <span class="instruction-number">${index + 1}</span>
                        <span class="instruction-text">${instruction.content}</span>
                    </li>
                `).join('')}
            </ol>
        </div>
    </div>
    
    <div class="recipe-footer">
        <img src="https://cdn.shopify.com/s/files/1/0766/7109/0927/files/olitalia_logo_black.svg?v=1766151501" alt="Olitalia" class="brand-logo-image">
        <p class="footer-tagline">Premium Italian Oils</p>
        <p class="footer-url">olitalia.com</p>
    </div>
</body>
</html>`;
    } catch (error) {
      console.error('Error generating print HTML:', error);
      // Return minimal HTML on error
      return `<!DOCTYPE html><html><head><title>Recipe</title></head><body><h1>Error generating recipe</h1><p>Please try again.</p></body></html>`;
    }
  }

  createPrintVersion() {
    // Extract recipe data
    const recipeData = this.getRecipeData();

    // Create new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
      console.error('Failed to open print window');
      this.cleanupAfterPrint();
      return;
    }

    // Generate clean HTML for printing
    const printHTML = this.generatePrintHTML(recipeData);

    // Write content to print window
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        this.cleanupAfterPrint();
      }, 500);
    };
  }

  cleanupAfterPrint() {
    // Remove print class
    document.body.classList.remove('recipe-printing');

    // Restore button content
    const printButton = document.querySelector('.redesign-recipe-print-btn');
    if (printButton && printButton.dataset.originalContent) {
      printButton.innerHTML = printButton.dataset.originalContent;
      delete printButton.dataset.originalContent;
    }
  }

  onBeforePrint() {
    // Add any pre-print modifications
    document.body.classList.add('recipe-printing');

    // Hide any tooltips or overlays
    const tooltips = document.querySelectorAll('[data-tooltip], .tooltip');
    tooltips.forEach(tooltip => {
      tooltip.style.display = 'none';
    });

    // Ensure all images are loaded
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.style.display = 'none';
      }
    });
  }

  onAfterPrint() {
    // Clean up after printing
    this.cleanupAfterPrint();
  }

  // Utility method to check if page is printable
  static isPrintable() {
    return document.querySelector('.redesign-recipe-page') !== null || 
           document.querySelector('.redesign-recipe') !== null;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (RecipePrint.isPrintable()) {
    window.recipePrint = new RecipePrint();
  }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RecipePrint;
}
