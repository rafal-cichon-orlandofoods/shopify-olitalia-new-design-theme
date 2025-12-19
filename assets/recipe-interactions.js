/**
 * Recipe Page Interactions
 * Adds interactive features like strikethrough for ingredients and instructions
 */

class RecipeInteractions {
    constructor() {
        this.modal = null;
        this.video = null;
        this.init();
    }

    init() {
        this.setupIngredientClicks();
        this.setupInstructionClicks();
        this.setupTutorials();
        this.loadProgress();
    }

    setupIngredientClicks() {
        const ingredients = document.querySelectorAll('.recipe-ingredient');

        ingredients.forEach((ingredient, index) => {
            // Make ingredients clickable
            ingredient.style.cursor = 'pointer';
            ingredient.setAttribute('data-ingredient-index', index);

            // Add click event listener
            ingredient.addEventListener('click', () => {
                this.toggleIngredient(ingredient, index);
            });
        });
    }

    setupInstructionClicks() {
        const instructions = document.querySelectorAll('.recipe-instruction');

        instructions.forEach((instruction, index) => {
            // Make instructions clickable
            instruction.style.cursor = 'pointer';
            instruction.setAttribute('data-instruction-index', index);

            // Add click event listener to the entire instruction
            instruction.addEventListener('click', (e) => {
                // Don't trigger if clicking on tutorial button or tutorial media
                if (!e.target.closest('.play-tutorial-btn') &&
                    !e.target.closest('.tutorial-media') &&
                    !e.target.closest('.recipe-instruction__tutorial')) {
                    this.toggleInstruction(instruction, index);
                }
            });
        });
    }

    toggleIngredient(ingredient, index) {
        const isCompleted = ingredient.classList.contains('completed');

        if (isCompleted) {
            // Mark as incomplete
            ingredient.classList.remove('completed');
            this.removeFromProgress('ingredients', index);
        } else {
            // Mark as complete
            ingredient.classList.add('completed');
            this.addToProgress('ingredients', index);
        }

        // Save progress to localStorage
        this.saveProgress();
    }

    toggleInstruction(instruction, index) {
        const isCompleted = instruction.classList.contains('completed');

        if (isCompleted) {
            // Allow unchecking if it's the last completed step
            if (this.isLastCompletedStep(index)) {
                instruction.classList.remove('completed');
                this.removeFromProgress('instructions', index);
                this.saveProgress();
            } else {
                // Show warning for out-of-order unchecking
                this.showOrderWarning('You must complete steps in order. Uncheck the last completed step first.');
            }
        } else {
            // Only allow completing if it's the next step in sequence
            if (this.canCompleteStep(index)) {
                instruction.classList.add('completed');
                this.addToProgress('instructions', index);
                this.saveProgress();
            } else {
                // Show warning for out-of-order completion
                this.showOrderWarning('Please complete the previous steps first.');
            }
        }
    }

    canCompleteStep(stepIndex) {
        // Step 0 can always be completed
        if (stepIndex === 0) return true;

        // Check if all previous steps are completed
        for (let i = 0; i < stepIndex; i++) {
            if (!this.progress.instructions.includes(i)) {
                return false;
            }
        }
        return true;
    }

    isLastCompletedStep(stepIndex) {
        if (!this.progress.instructions.length) return false;

        // Sort completed steps and check if this is the highest index
        const sortedSteps = [...this.progress.instructions].sort((a, b) => b - a);
        return sortedSteps[0] === stepIndex;
    }

    showOrderWarning(message) {
        // Remove existing warning if any
        const existingWarning = document.querySelector('.step-order-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        // Create warning message
        const warning = document.createElement('div');
        warning.className = 'step-order-warning';
        warning.textContent = message;
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff6b6b;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            animation: slideDown 0.3s ease;
        `;

        // Add animation styles if not already present
        if (!document.querySelector('#step-warning-animations')) {
            const animationStyles = document.createElement('style');
            animationStyles.id = 'step-warning-animations';
            animationStyles.textContent = `
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(animationStyles);
        }

        document.body.appendChild(warning);

        // Remove warning after 3 seconds
        setTimeout(() => {
            warning.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                if (warning.parentNode) {
                    warning.parentNode.removeChild(warning);
                }
            }, 300);
        }, 3000);
    }

    addToProgress(type, index) {
        if (!this.progress) {
            this.progress = { ingredients: [], instructions: [] };
        }

        if (!this.progress[type].includes(index)) {
            this.progress[type].push(index);
        }
    }

    removeFromProgress(type, index) {
        if (!this.progress) {
            this.progress = { ingredients: [], instructions: [] };
        }

        const indexPos = this.progress[type].indexOf(index);
        if (indexPos > -1) {
            this.progress[type].splice(indexPos, 1);
        }
    }

    saveProgress() {
        const recipeTitle = document.querySelector('.recipe-title')?.textContent?.trim();
        if (recipeTitle && this.progress) {
            const storageKey = `recipe-progress-${this.slugify(recipeTitle)}`;
            localStorage.setItem(storageKey, JSON.stringify(this.progress));
        }
    }

    loadProgress() {
        const recipeTitle = document.querySelector('.recipe-title')?.textContent?.trim();
        if (recipeTitle) {
            const storageKey = `recipe-progress-${this.slugify(recipeTitle)}`;
            const savedProgress = localStorage.getItem(storageKey);

            if (savedProgress) {
                this.progress = JSON.parse(savedProgress);
                this.applyProgress();
            } else {
                this.progress = { ingredients: [], instructions: [] };
            }
        }
    }

    applyProgress() {
        // Apply completed state to ingredients
        if (this.progress.ingredients) {
            this.progress.ingredients.forEach(index => {
                const ingredient = document.querySelector(`[data-ingredient-index="${index}"]`);
                if (ingredient) {
                    ingredient.classList.add('completed');
                }
            });
        }

        // Apply completed state to instructions
        if (this.progress.instructions) {
            this.progress.instructions.forEach(index => {
                const instruction = document.querySelector(`[data-instruction-index="${index}"]`);
                if (instruction) {
                    instruction.classList.add('completed');
                }
            });
        }
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Method to reset all progress
    resetProgress() {
        // Remove completed class from all items
        document.querySelectorAll('.recipe-ingredient.completed, .recipe-instruction.completed')
            .forEach(item => item.classList.remove('completed'));

        // Clear progress data
        this.progress = { ingredients: [], instructions: [] };
        this.saveProgress();
    }

    // Method to get completion percentage
    getCompletionPercentage() {
        const totalIngredients = document.querySelectorAll('.recipe-ingredient').length;
        const totalInstructions = document.querySelectorAll('.recipe-instruction').length;
        const totalItems = totalIngredients + totalInstructions;

        if (totalItems === 0) return 0;

        const completedIngredients = this.progress?.ingredients?.length || 0;
        const completedInstructions = this.progress?.instructions?.length || 0;
        const completedItems = completedIngredients + completedInstructions;

        return Math.round((completedItems / totalItems) * 100);
    }

    // Tutorial functionality
    setupTutorials() {
        this.createTutorialModal();
        this.bindTutorialEvents();
        this.markTutorialSteps();
    }

    createTutorialModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="tutorial-modal" id="tutorialModal">
                <div class="tutorial-modal__content">
                    <button class="tutorial-modal__close" id="closeTutorial">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <video class="tutorial-modal__video" id="tutorialVideo" controls>
                        <source src="" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('tutorialModal');
        this.video = document.getElementById('tutorialVideo');
    }

    bindTutorialEvents() {
        // Tutorial button clicks - use capture phase to handle before instruction clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-tutorial-btn')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // Stop all other event handlers
                const button = e.target.closest('.play-tutorial-btn');
                const videoId = button.dataset.video;
                this.playTutorial(videoId);
                return false;
            }
        }, true); // Use capture phase

        // Also handle clicks on tutorial media area
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tutorial-media') && !e.target.closest('.play-tutorial-btn')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                const tutorialMedia = e.target.closest('.tutorial-media');
                const button = tutorialMedia.querySelector('.play-tutorial-btn');
                if (button) {
                    const videoId = button.dataset.video;
                    this.playTutorial(videoId);
                }
                return false;
            }
        }, true); // Use capture phase

        // Close modal events
        document.addEventListener('click', (e) => {
            // Check if clicking on close button or its children (SVG)
            if (e.target.closest('#closeTutorial') || e.target.id === 'tutorialModal') {
                e.preventDefault();
                e.stopPropagation();
                this.closeTutorial();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeTutorial();
            }
        });
    }

    markTutorialSteps() {
        // Add visual indicator to steps with tutorials
        const tutorialButtons = document.querySelectorAll('.play-tutorial-btn');
        tutorialButtons.forEach(button => {
            const instruction = button.closest('.recipe-instruction');
            if (instruction) {
                instruction.classList.add('has-tutorial');
            }
        });
    }

    playTutorial(videoId) {
        // Video URL mapping - customize these URLs
        const videoUrls = {
            'step-1-oven-prep': 'https://cdn.shopify.com/videos/c/o/v/step-1-oven-prep.mp4',
            'step-2-chicken-prep': 'https://cdn.shopify.com/videos/c/o/v/step-2-chicken-prep.mp4',
            'step-3-herb-blend': 'https://cdn.shopify.com/videos/c/o/v/step-3-herb-blend.mp4',
            'step-4-marinating': 'https://cdn.shopify.com/videos/c/o/v/step-4-marinating.mp4',
            'step-5-breadcrumb-mix': 'https://cdn.shopify.com/videos/c/o/v/step-5-breadcrumb-mix.mp4',
            'step-6-coating': 'https://cdn.shopify.com/videos/c/o/v/step-6-coating.mp4',
            'step-7-baking': 'https://cdn.shopify.com/videos/c/o/v/step-7-baking.mp4',
            'step-8-serving': 'https://cdn.shopify.com/videos/c/o/v/step-8-serving.mp4'
        };

        const videoUrl = videoUrls[videoId];
        if (!videoUrl) {
            console.warn(`No video found for step: ${videoId}`);
            return;
        }

        // Set video source and show modal
        this.video.src = videoUrl;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Auto-play video
        this.video.play().catch(e => {
            console.log('Auto-play prevented:', e);
        });
    }

    closeTutorial() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';

            // Pause and reset video
            if (this.video) {
                this.video.pause();
                this.video.currentTime = 0;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.recipe-page')) {
        window.recipeInteractions = new RecipeInteractions();
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecipeInteractions;
}