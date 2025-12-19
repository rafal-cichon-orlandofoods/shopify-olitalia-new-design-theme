class DynamicRecipes {
    constructor(container) {
        this.container = container;
        this.grid = container.querySelector('.recipes-grid');
        this.init();
    }

    init() {
        this.applyLayout();
        this.setupLazyLoading();
        this.setupAnimations();
    }

    applyLayout() {
        // Get layout from section settings or data attribute
        const section = this.container.closest('[data-section-type="dynamic-recipes"]');
        if (!section) return;

        const sectionId = section.dataset.sectionId;
        const layoutSetting = section.dataset.layout || 'grid-3';

        if (this.grid) {
            this.grid.className = `recipes-grid ${layoutSetting}`;
        }
    }

    setupLazyLoading() {
        const images = this.container.querySelectorAll('.recipe-image[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupAnimations() {
        const cards = this.container.querySelectorAll('.recipe-card');

        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1
            });

            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                cardObserver.observe(card);
            });
        }
    }

    // Method to filter recipes (can be extended)
    filterRecipes(filterType, filterValue) {
        const cards = this.container.querySelectorAll('.recipe-card');

        cards.forEach(card => {
            let shouldShow = true;

            if (filterType === 'category') {
                const categories = card.dataset.category.split(' ');
                shouldShow = categories.includes(filterValue) || filterValue === 'all';
            } else if (filterType === 'chef') {
                shouldShow = card.dataset.chef === filterValue || filterValue === 'all';
            }

            if (shouldShow) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Method to update layout dynamically
    updateLayout(newLayout) {
        if (this.grid) {
            this.grid.className = `recipes-grid ${newLayout}`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dynamicRecipesSections = document.querySelectorAll('.dynamic-recipes');

    dynamicRecipesSections.forEach(section => {
        new DynamicRecipes(section);
    });
});

// Shopify section events
document.addEventListener('shopify:section:load', (event) => {
    if (event.target.querySelector('.dynamic-recipes')) {
        new DynamicRecipes(event.target.querySelector('.dynamic-recipes'));
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .recipe-image.loaded {
    opacity: 1;
  }
  
  .recipe-image:not(.loaded) {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);