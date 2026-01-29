/**
 * Recipe Shop Modal
 * Shows products related to the recipe in a popup
 */

class RecipeShopModal {
  constructor() {
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
    this.modal = document.getElementById('recipeShopModal');
    this.openBtn = document.getElementById('shopRecipeBtn');
    this.closeBtn = document.getElementById('closeShopModal');
    this.overlay = this.modal?.querySelector('.recipe-shop-modal__overlay');

    if (!this.modal || !this.openBtn) return;

    // Event listeners
    this.openBtn.addEventListener('click', () => this.open());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize
if (document.querySelector('.redesign-recipe-page')) {
  new RecipeShopModal();
}
