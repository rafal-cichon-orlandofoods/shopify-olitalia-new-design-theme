/**
 * Recipe Interactions - Checkbox Progress Tracking
 * Saves user progress in localStorage and provides reset functionality
 */

class RecipeProgress {
  constructor() {
    this.recipeId = this.getRecipeId();
    this.storageKey = `recipe-progress-${this.recipeId}`;
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
    this.addResetButtons();
    this.restoreProgress();
    this.attachCheckboxListeners();
    this.updateProgressIndicators();
  }

  // Generate unique recipe ID from page URL or title
  getRecipeId() {
    const path = window.location.pathname;
    return path.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

  // Add reset buttons to Ingredients and Instructions sections
  addResetButtons() {
    // Reset button for Ingredients
    const ingredientsSection = document.querySelector('.redesign-recipe__sidebar-section');
    if (ingredientsSection) {
      const heading = ingredientsSection.querySelector('h3');
      if (heading && !heading.querySelector('.recipe-reset-btn')) {
        this.insertResetButton(heading, 'ingredients');
      }
    }

    // Reset button for Instructions
    const instructionsSection = document.querySelector('.redesign-recipe__instructions');
    if (instructionsSection) {
      const heading = instructionsSection.closest('.redesign-recipe__section')?.querySelector('.redesign-recipe__section-title');
      if (heading && !heading.querySelector('.recipe-reset-btn')) {
        this.insertResetButton(heading, 'instructions');
      }
    }
  }

  insertResetButton(heading, type) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'space-between';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '1rem';
    wrapper.style.marginBottom = '15px';

    const headingClone = heading.cloneNode(true);
    // Don't set margin to 0 - let CSS handle it

    const resetBtn = document.createElement('button');
    resetBtn.className = 'recipe-reset-btn';
    resetBtn.setAttribute('data-type', type);
    resetBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M3 21v-5h5"/>
      </svg>
      Reset
    `;
    resetBtn.title = `Reset all ${type}`;

    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.resetSection(type);
    });

    wrapper.appendChild(headingClone);
    wrapper.appendChild(resetBtn);
    heading.replaceWith(wrapper);
  }

  // Restore saved progress from localStorage
  restoreProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return;

    try {
      const progress = JSON.parse(saved);
      
      // Restore ingredients
      if (progress.ingredients) {
        progress.ingredients.forEach(index => {
          const checkbox = document.querySelector(`.redesign-recipe__sidebar-list .redesign-recipe__checkbox:nth-of-type(${index + 1})`);
          if (checkbox) checkbox.checked = true;
        });
      }

      // Restore instructions
      if (progress.instructions) {
        progress.instructions.forEach(index => {
          const checkbox = document.querySelector(`.redesign-recipe__instructions-list .redesign-recipe__checkbox:nth-of-type(${index + 1})`);
          if (checkbox) checkbox.checked = true;
        });
      }
    } catch (e) {
      console.error('Failed to restore recipe progress:', e);
    }
  }

  // Save progress to localStorage
  saveProgress() {
    const progress = {
      ingredients: [],
      instructions: [],
      timestamp: Date.now()
    };

    // Save checked ingredients
    const ingredientCheckboxes = document.querySelectorAll('.redesign-recipe__sidebar-list .redesign-recipe__checkbox');
    ingredientCheckboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        progress.ingredients.push(index);
      }
    });

    // Save checked instructions
    const instructionCheckboxes = document.querySelectorAll('.redesign-recipe__instructions-list .redesign-recipe__checkbox');
    instructionCheckboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        progress.instructions.push(index);
      }
    });

    localStorage.setItem(this.storageKey, JSON.stringify(progress));
    this.updateProgressIndicators();
  }

  // Attach listeners to all checkboxes
  attachCheckboxListeners() {
    const allCheckboxes = document.querySelectorAll('.redesign-recipe__checkbox');
    allCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.saveProgress();
        this.animateCheckbox(checkbox);
      });
    });
  }

  // Smooth animation when checking/unchecking
  animateCheckbox(checkbox) {
    const label = checkbox.closest('.redesign-recipe__checkbox-label');
    if (!label) return;

    if (checkbox.checked) {
      label.style.transition = 'all 0.3s ease';
      label.style.opacity = '0.6';
    } else {
      label.style.transition = 'all 0.3s ease';
      label.style.opacity = '1';
    }
  }

  // Reset specific section
  resetSection(type) {
    const selector = type === 'ingredients' 
      ? '.redesign-recipe__sidebar-list .redesign-recipe__checkbox'
      : '.redesign-recipe__instructions-list .redesign-recipe__checkbox';

    const checkboxes = document.querySelectorAll(selector);
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      const label = checkbox.closest('.redesign-recipe__checkbox-label');
      if (label) {
        label.style.opacity = '1';
      }
    });

    this.saveProgress();
    
    // Show feedback
    this.showResetFeedback(type);
  }

  // Show visual feedback after reset
  showResetFeedback(type) {
    const btn = document.querySelector(`.recipe-reset-btn[data-type="${type}"]`);
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Reset!
    `;
    btn.style.background = '#385DFF';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#385DFF';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1500);
  }

  // Update progress indicators (optional - can be enhanced later)
  updateProgressIndicators() {
    // Count checked items
    const ingredientsChecked = document.querySelectorAll('.redesign-recipe__sidebar-list .redesign-recipe__checkbox:checked').length;
    const ingredientsTotal = document.querySelectorAll('.redesign-recipe__sidebar-list .redesign-recipe__checkbox').length;

    const instructionsChecked = document.querySelectorAll('.redesign-recipe__instructions-list .redesign-recipe__checkbox:checked').length;
    const instructionsTotal = document.querySelectorAll('.redesign-recipe__instructions-list .redesign-recipe__checkbox').length;

    // Log progress (can be used for analytics or UI updates)
    console.log('Recipe Progress:', {
      ingredients: `${ingredientsChecked}/${ingredientsTotal}`,
      instructions: `${instructionsChecked}/${instructionsTotal}`
    });
  }
}

// Initialize when script loads
if (document.querySelector('.redesign-recipe-page') || document.querySelector('.redesign-recipe')) {
  new RecipeProgress();
}
