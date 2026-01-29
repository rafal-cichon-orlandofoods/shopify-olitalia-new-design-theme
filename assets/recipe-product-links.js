/**
 * Recipe Product Links
 * Automatically adds product links to ingredient names while preserving checkbox functionality
 * NOTE: This script runs AFTER redesign-recipe-ingredients.js formats the amounts
 */

class RecipeProductLinks {
  constructor() {
    // Product mapping: ingredient text pattern -> product URL
    this.productMap = {
      'Olitalia Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',
      'Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',
      'EVOO': '/products/extra-virgin-olive-oil',
      'Caputo Semolina Flour': '/products/caputo-semolina-flour',
      'Semolina Flour': '/products/caputo-semolina-flour',
      // Add more product mappings here
    };
    
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for other scripts to finish formatting
        setTimeout(() => this.addProductLinks(), 100);
      });
    } else {
      // Wait a bit for other scripts to finish formatting
      setTimeout(() => this.addProductLinks(), 100);
    }
  }

  addProductLinks() {
    // Find all ingredient text spans
    const ingredientTexts = document.querySelectorAll('.redesign-recipe__ingredient-text');
    
    ingredientTexts.forEach(span => {
      this.processIngredient(span);
    });
    
    // Find all instruction text spans
    const instructionTexts = document.querySelectorAll('.redesign-recipe__instruction-text');
    
    instructionTexts.forEach(span => {
      this.processIngredient(span);
    });
  }

  processIngredient(span) {
    // Get the full text content (including any HTML like <strong>)
    const fullHTML = span.innerHTML;
    const fullText = span.textContent;
    
    // Check if any product name is in this ingredient
    for (const [productName, productUrl] of Object.entries(this.productMap)) {
      if (fullText.includes(productName)) {
        this.addLinkToIngredient(span, fullHTML, fullText, productName, productUrl);
        break; // Only link the first match
      }
    }
  }

  addLinkToIngredient(span, fullHTML, fullText, productName, productUrl) {
    // Find the position of the product name in the text
    const startIndex = fullText.indexOf(productName);
    if (startIndex === -1) return;
    
    const endIndex = startIndex + productName.length;
    
    // We need to work with the HTML to preserve <strong> tags
    // Strategy: Replace the product name text with a link, preserving any HTML before/after
    
    // Create a temporary div to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = fullHTML;
    
    // Walk through text nodes and replace the product name
    this.replaceTextInNode(temp, productName, productUrl);
    
    // Update the original span
    span.innerHTML = temp.innerHTML;
  }

  replaceTextInNode(node, productName, productUrl) {
    // Recursively walk through all nodes
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const nodesToReplace = [];
    let currentNode;
    
    while (currentNode = walker.nextNode()) {
      if (currentNode.textContent.includes(productName)) {
        nodesToReplace.push(currentNode);
      }
    }
    
    // Replace text nodes with links
    nodesToReplace.forEach(textNode => {
      const text = textNode.textContent;
      const index = text.indexOf(productName);
      
      if (index !== -1) {
        const before = text.substring(0, index);
        const after = text.substring(index + productName.length);
        
        // Create new nodes
        const beforeText = document.createTextNode(before);
        const link = document.createElement('a');
        link.href = productUrl;
        link.className = 'ingredient-product-link';
        link.textContent = productName;
        link.title = `View ${productName}`;
        
        // Prevent link click from triggering checkbox
        link.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        
        const afterText = document.createTextNode(after);
        
        // Replace the text node with our new nodes
        const parent = textNode.parentNode;
        parent.insertBefore(beforeText, textNode);
        parent.insertBefore(link, textNode);
        parent.insertBefore(afterText, textNode);
        parent.removeChild(textNode);
      }
    });
  }
}

// Initialize when script loads
if (document.querySelector('.redesign-recipe-page') || document.querySelector('.redesign-recipe')) {
  new RecipeProductLinks();
}
