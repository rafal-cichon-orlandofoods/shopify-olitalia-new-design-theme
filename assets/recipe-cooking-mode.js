/**
 * Recipe Cooking Mode
 * Toggles interactive cooking mode with checkboxes and progress tracking
 * Hidden by default for better SEO
 */

class RecipeCookingMode {
  constructor() {
    this.isActive = false;
    this.storageKey = 'recipe-cooking-mode-active';
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.button = document.getElementById('cookingModeToggle');
    if (!this.button) return;

    // Restore previous state
    this.restoreState();

    // Attach click listener
    this.button.addEventListener('click', () => this.toggle());
  }

  restoreState() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'true') {
      this.activate();
    }
  }

  toggle() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;
    
    // Add class to body or main container
    const recipeContainer = document.querySelector('.redesign-recipe');
    if (recipeContainer) {
      recipeContainer.classList.add('cooking-mode-active');
    }

    // Update button
    this.button.classList.add('active');
    const buttonText = this.button.querySelector('.cooking-mode-text');
    if (buttonText) {
      buttonText.textContent = 'Exit Baking / Cooking Mode';
    }

    // Save state
    localStorage.setItem(this.storageKey, 'true');

    // Show visual feedback
    this.showNotification('Baking / Cooking Mode activated! Track your progress with checkboxes.');
  }

  deactivate() {
    this.isActive = false;
    
    // Remove class
    const recipeContainer = document.querySelector('.redesign-recipe');
    if (recipeContainer) {
      recipeContainer.classList.remove('cooking-mode-active');
    }

    // Update button
    this.button.classList.remove('active');
    const buttonText = this.button.querySelector('.cooking-mode-text');
    if (buttonText) {
      buttonText.textContent = 'Start Baking / Cooking';
    }

    // Save state
    localStorage.setItem(this.storageKey, 'false');

    // Show visual feedback
    this.showNotification('Baking / Cooking Mode deactivated');
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cooking-mode-notification';
    notification.textContent = message;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    notification.style.cssText = `
      position: fixed;
      bottom: ${isMobile ? '20px' : '30px'};
      right: ${isMobile ? '16px' : '30px'};
      left: ${isMobile ? '16px' : 'auto'};
      background: #000;
      color: #fff;
      padding: ${isMobile ? '14px 18px' : '16px 24px'};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      animation: slideInUp 0.3s ease;
      font-size: ${isMobile ? '13px' : '14px'};
      font-weight: 500;
      text-align: center;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutDown 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when script loads
if (document.querySelector('.redesign-recipe-page') || document.querySelector('.redesign-recipe')) {
  new RecipeCookingMode();
}
