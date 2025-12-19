/**
 * Recipe Print Functionality
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
    const printButton = document.querySelector('.print-recipe-btn');
    if (printButton) {
      printButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.printRecipe();
      });
    }
  }

  printRecipe() {
    // Show loading state
    this.showPrintLoading();

    // Create clean print version
    this.createPrintVersion();
  }

  createPrintVersion() {
    // Extract recipe data
    const recipeData = this.getRecipeData();

    // Create new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

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

  generatePrintHTML(recipeData) {
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
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.75in;
            background: white;
        }
        
        .recipe-header {
            text-align: center;
            margin-bottom: 2rem;
            border-bottom: 2px solid #2c5530;
            padding-bottom: 1rem;
        }
        
        .recipe-image {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 8px;
            margin: 1rem auto;
            display: block;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .recipe-title {
            font-size: 28pt;
            font-weight: bold;
            color: #2c5530;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .recipe-meta {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 1rem;
            font-size: 12pt;
        }
        
        .recipe-meta-item {
            background: #f8f9fa;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid #2c5530;
        }
        
        .recipe-chef {
            font-size: 14pt;
            font-style: italic;
            color: #666;
        }
        
        .recipe-description {
            font-size: 12pt;
            text-align: center;
            margin-bottom: 1.5rem;
            color: #555;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .recipe-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .section-title {
            font-size: 18pt;
            font-weight: bold;
            color: #2c5530;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #2c5530;
            padding-bottom: 0.5rem;
        }
        
        .ingredients-list {
            list-style: none;
        }
        
        .ingredient {
            display: flex;
            padding: 0.5rem 0;
            border-bottom: 1px dotted #ccc;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .ingredient:last-child {
            border-bottom: none;
        }
        
        .ingredient-amount {
            font-weight: bold;
            color: #2c5530;
            min-width: 100px;
            text-align: right;
            font-size: 11pt;
        }
        
        .ingredient-name {
            flex: 1;
            font-size: 11pt;
        }
        
        .ingredient.featured {
            background: #f0f8f0;
            padding: 0.75rem;
            border-radius: 8px;
            border: 2px solid #2c5530;
            margin: 0.5rem 0;
        }
        
        .ingredient.featured .ingredient-amount {
            color: #1a3d1c;
            font-weight: bold;
        }
        
        .ingredient.featured .ingredient-name {
            font-weight: bold;
        }
        
        .instructions-list {
            list-style: none;
        }
        
        .instruction {
            display: flex;
            margin-bottom: 1.5rem;
            gap: 1rem;
            align-items: flex-start;
        }
        
        .instruction-number {
            background: #2c5530;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12pt;
            flex-shrink: 0;
        }
        
        .instruction-text {
            flex: 1;
            font-size: 12pt;
            padding-top: 0.25rem;
        }
        
        .recipe-footer {
            margin-top: 3rem;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 1rem;
            font-size: 10pt;
            color: #666;
        }
        
        .brand-logo {
            font-size: 16pt;
            font-weight: bold;
            color: #2c5530;
            margin-bottom: 0.5rem;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0.5in;
            }
            
            .recipe-content {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .ingredient,
            .instruction {
                break-inside: avoid;
            }
            
            .section-title {
                break-after: avoid;
            }
            
            .recipe-image {
                max-width: 400px;
                page-break-inside: avoid;
                margin: 1rem auto 2rem auto;
            }
            
            .recipe-header {
                page-break-after: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="recipe-header">
        <h1 class="recipe-title">${recipeData.title}</h1>
        ${recipeData.totalTime || recipeData.servings || recipeData.difficulty ? `
        <div class="recipe-meta">
            ${recipeData.totalTime ? `<span class="recipe-meta-item">Time: ${recipeData.totalTime}</span>` : ''}
            ${recipeData.servings ? `<span class="recipe-meta-item">Serves: ${recipeData.servings}</span>` : ''}
            ${recipeData.difficulty ? `<span class="recipe-meta-item">Difficulty: ${recipeData.difficulty}</span>` : ''}
        </div>` : ''}
        ${recipeData.chef ? `<div class="recipe-chef">by Chef ${recipeData.chef}</div>` : ''}
        ${recipeData.description ? `<p class="recipe-description">${recipeData.description}</p>` : ''}
        ${recipeData.image ? `<img src="${recipeData.image}" alt="${recipeData.title}" class="recipe-image">` : ''}
    </div>
    
    <div class="recipe-content">
        <div class="ingredients-section">
            <h2 class="section-title">Ingredients</h2>
            <ul class="ingredients-list">
                ${recipeData.ingredients.map(ingredient => `
                    <li class="ingredient ${ingredient.featured ? 'featured' : ''}">
                        <span class="ingredient-amount">${ingredient.amount}</span>
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
        <div class="brand-logo">OLITALIA</div>
        <p>Premium Italian Oils</p>
        <p>Recipe printed from olitalia.com</p>
    </div>
</body>
</html>`;
  }

  showPrintLoading() {
    const printButton = document.querySelector('.print-recipe-btn');
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

  cleanupAfterPrint() {
    // Remove print class
    document.body.classList.remove('recipe-printing');

    // Restore button content
    const printButton = document.querySelector('.print-recipe-btn');
    if (printButton && printButton.dataset.originalContent) {
      printButton.innerHTML = printButton.dataset.originalContent;
      delete printButton.dataset.originalContent;
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
                .recipe-ingredient,
                .recipe-instruction {
                    break-inside: avoid;
                }
                
                /* Ensure ingredients don't break across pages */
                .recipe-ingredients {
                    break-inside: avoid;
                }
                
                /* Keep instruction steps together */
                .recipe-instruction {
                    break-inside: avoid;
                    margin-bottom: 0.5rem;
                }
            }
        `;

    // Add styles to head if they don't exist
    if (!document.querySelector('#recipe-print-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'recipe-print-styles';
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

    // Handle keyboard shortcut (Ctrl+P)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        this.printRecipe();
      }
    });
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

    // Show success message
    this.showPrintSuccess();
  }

  showPrintSuccess() {
    // Create temporary success message
    const successMessage = document.createElement('div');
    successMessage.className = 'print-success-message';
    successMessage.innerHTML = `
            <div class="print-success-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                Recipe ready to print!
            </div>
        `;

    // Style the success message
    successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c5530;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;

    // Add animation styles
    const animationStyles = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;

    if (!document.querySelector('#print-animations')) {
      const animationSheet = document.createElement('style');
      animationSheet.id = 'print-animations';
      animationSheet.textContent = animationStyles;
      document.head.appendChild(animationSheet);
    }

    document.body.appendChild(successMessage);

    // Remove message after 3 seconds
    setTimeout(() => {
      successMessage.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
        }
      }, 300);
    }, 3000);
  }

  // Utility method to check if page is printable
  static isPrintable() {
    return document.querySelector('.recipe-page') !== null;
  }

  // Method to get recipe data for potential sharing/export
  getRecipeData() {
    const recipeData = {
      title: document.querySelector('.recipe-title')?.textContent?.trim() || 'Recipe',
      description: document.querySelector('.recipe-description')?.textContent?.trim(),
      chef: document.querySelector('.recipe-chef .text-weight--medium')?.textContent?.trim(),
      image: document.querySelector('.recipe-image')?.src,
      totalTime: null,
      servings: null,
      difficulty: null,
      ingredients: [],
      instructions: []
    };

    // Extract recipe stats
    const stats = document.querySelectorAll('.recipe-stat');
    stats.forEach(stat => {
      const label = stat.querySelector('.recipe-stat__label')?.textContent?.trim().toLowerCase();
      const value = stat.querySelector('.recipe-stat__value')?.textContent?.trim();

      if (label && value) {
        if (label.includes('time')) {
          recipeData.totalTime = value;
        } else if (label.includes('serving')) {
          recipeData.servings = value;
        } else if (label.includes('difficulty')) {
          recipeData.difficulty = value;
        }
      }
    });

    // Extract ingredients
    const ingredients = document.querySelectorAll('.recipe-ingredient');
    ingredients.forEach(ingredient => {
      const amount = ingredient.querySelector('.recipe-ingredient__amount')?.textContent?.trim();
      const name = ingredient.querySelector('.recipe-ingredient__name')?.textContent?.trim();
      const isFeatured = ingredient.classList.contains('recipe-ingredient--featured');

      if (amount && name) {
        recipeData.ingredients.push({
          amount,
          name,
          featured: isFeatured
        });
      }
    });

    // Extract instructions
    const instructions = document.querySelectorAll('.recipe-instruction');
    instructions.forEach((instruction, index) => {
      const content = instruction.querySelector('.recipe-instruction__content p')?.textContent?.trim();
      if (content) {
        recipeData.instructions.push({ step: index + 1, content });
      }
    });

    return recipeData;
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