/**
 * Recipe Ingredients Formatter
 * Automatically formats ingredient amounts to be bold
 */

class RecipeIngredientsFormatter {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.formatIngredients());
    } else {
      this.formatIngredients();
    }
  }

  formatIngredients() {
    // Find all ingredient text elements
    const ingredientElements = document.querySelectorAll('.redesign-recipe__ingredient-text');
    
    ingredientElements.forEach(element => {
      const text = element.textContent.trim();
      if (!text) return;

      // Try to split ingredient into amount and name
      // Matches: numbers, fractions, units like cup, tablespoon, etc.
      const parts = text.match(/^([\d\s\/¼½¾⅓⅔⅛⅜⅝⅞]+(?:\s*(?:cup|tablespoon|teaspoon|tbsp|tsp|oz|lb|g|kg|ml|l|piece|pieces|to taste|as needed)?s?))\s+(.+)$/i);
      
      if (parts && parts.length >= 3) {
        const amount = parts[1].trim();
        const name = parts[2].trim();
        
        // Replace text with formatted HTML
        element.innerHTML = `<strong>${amount}</strong> ${name}`;
      }
    });
  }
}

// Initialize when script loads
new RecipeIngredientsFormatter();
