class RecipesShowcase {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSearch();
        this.loadFiltersFromURL();
    }

    setupFilters() {
        // Handle category filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter recipes
                this.filterRecipes();
            });
        });

        // Handle secondary filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn[data-filter-type]');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filterType;

                // Update active button within the same filter group
                const filterGroup = btn.closest('.filter-group');
                if (filterGroup) {
                    filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }

                // Filter recipes
                this.filterRecipes();
            });
        });
    }

    filterRecipes() {
        // Get current filter values from active buttons
        const activeCategory = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
        const selectedChef = document.querySelector('.filter-btn[data-filter-type="chef"].active')?.dataset.filterValue || 'all';
        const selectedTime = document.querySelector('.filter-btn[data-filter-type="time"].active')?.dataset.filterValue || 'all';
        const selectedDifficulty = document.querySelector('.filter-btn[data-filter-type="difficulty"].active')?.dataset.filterValue || 'all';
        const selectedProduct = document.querySelector('.filter-btn[data-filter-type="product"].active')?.dataset.filterValue || 'all';
        const recipeCards = document.querySelectorAll('.recipe-card');

        // Check if any filters are active
        const hasActiveFilters = activeCategory !== 'all' ||
            selectedChef !== 'all' ||
            selectedTime !== 'all' ||
            selectedDifficulty !== 'all' ||
            selectedProduct !== 'all';

        // Show/hide clear filters section
        const clearSection = document.querySelector('.filter-clear-section');
        if (clearSection) {
            if (hasActiveFilters) {
                clearSection.classList.add('show');
            } else {
                clearSection.classList.remove('show');
            }
        }

        let visibleCount = 0;

        recipeCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardChef = card.dataset.chef;
            const cardTime = card.dataset.time;
            const cardDifficulty = card.dataset.difficulty;
            const cardProduct = card.dataset.product;

            let shouldShow = true;

            // Check category filter
            if (activeCategory !== 'all' && cardCategory !== activeCategory) {
                shouldShow = false;
            }

            // Check chef filter
            if (selectedChef !== 'all' && cardChef !== selectedChef) {
                shouldShow = false;
            }

            // Check time filter
            if (selectedTime !== 'all' && cardTime !== selectedTime) {
                shouldShow = false;
            }

            // Check difficulty filter
            if (selectedDifficulty !== 'all' && cardDifficulty !== selectedDifficulty) {
                shouldShow = false;
            }

            // Check product filter
            if (selectedProduct !== 'all' && cardProduct !== selectedProduct) {
                shouldShow = false;
            }

            // Show/hide card with animation
            if (shouldShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.visibility = 'visible';
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                card.style.visibility = 'hidden';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Show/hide no results message
        this.toggleNoResults(visibleCount === 0);

        // Update URL with current filter state
        this.updateURL();
    }

    toggleNoResults(show) {
        let noResultsEl = document.querySelector('.no-recipes-filtered');

        if (show && !noResultsEl) {
            // Create no results message
            noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-recipes-filtered';
            noResultsEl.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #666;">
          <h3 style="font-family: 'Soho Pro', serif; font-size: 1.5rem; color: #2c5530; margin-bottom: 1rem;">No recipes found</h3>
          <p>Try adjusting your filters to see more recipes.</p>
          <button onclick="recipesShowcase.clearFilters()" style="background: #2c5530; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; margin-top: 1rem; cursor: pointer;">Clear Filters</button>
        </div>
      `;
            document.querySelector('.recipes-grid').appendChild(noResultsEl);
        } else if (!show && noResultsEl) {
            noResultsEl.remove();
        }
    }

    clearFilters() {
        // Reset category filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        if (filterTabs.length > 0) {
            filterTabs.forEach(tab => tab.classList.remove('active'));
            const allTab = document.querySelector('.filter-tab[data-filter="all"]');
            if (allTab) allTab.classList.add('active');
        }

        // Reset all filter buttons to "all" options
        const filterButtons = document.querySelectorAll('.filter-btn[data-filter-type]');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filterValue === 'all') {
                btn.classList.add('active');
            }
        });

        // Show all recipes and update clear button visibility
        this.filterRecipes();
    }

    // Share current filter state
    shareFilters() {
        const currentURL = window.location.href;

        if (navigator.share) {
            // Use native sharing if available
            navigator.share({
                title: 'Olitalia Recipes',
                text: 'Check out these filtered recipes!',
                url: currentURL
            });
        } else if (navigator.clipboard) {
            // Copy to clipboard as fallback
            navigator.clipboard.writeText(currentURL).then(() => {
                // Show temporary notification
                this.showNotification('Link copied to clipboard!');
            });
        } else {
            // Final fallback - select text
            const textArea = document.createElement('textarea');
            textArea.value = currentURL;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Link copied!');
        }
    }

    // Show temporary notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'filter-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c5530;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Load filters from URL parameters
    loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);

        // Set category filter
        const category = urlParams.get('category');
        if (category) {
            const categoryTab = document.querySelector(`[data-filter="${category}"]`);
            if (categoryTab) {
                document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
                categoryTab.classList.add('active');
            }
        }

        // Set secondary filters from URL
        const filterTypes = ['chef', 'time', 'difficulty', 'product'];
        filterTypes.forEach(type => {
            const value = urlParams.get(type);
            if (value) {
                // Reset all buttons of this type
                document.querySelectorAll(`[data-filter-type="${type}"]`).forEach(btn => btn.classList.remove('active'));

                // Activate the specific button
                const targetBtn = document.querySelector(`[data-filter-type="${type}"][data-filter-value="${value}"]`);
                if (targetBtn) {
                    targetBtn.classList.add('active');
                }
            }
        });

        // Apply filters after loading from URL
        this.filterRecipes();
    }

    // Update URL with current filter state
    updateURL() {
        const params = new URLSearchParams();

        // Get current filter values
        const activeCategory = document.querySelector('.filter-tab.active')?.dataset.filter;
        const selectedChef = document.getElementById('chef-filter')?.value;
        const selectedTime = document.getElementById('time-filter')?.value;
        const selectedDifficulty = document.getElementById('difficulty-filter')?.value;
        const selectedProduct = document.getElementById('product-filter')?.value;

        // Add non-default values to URL
        if (activeCategory && activeCategory !== 'all') {
            params.set('category', activeCategory);
        }
        if (selectedChef && selectedChef !== 'all') {
            params.set('chef', selectedChef);
        }
        if (selectedTime && selectedTime !== 'all') {
            params.set('time', selectedTime);
        }
        if (selectedDifficulty && selectedDifficulty !== 'all') {
            params.set('difficulty', selectedDifficulty);
        }
        if (selectedProduct && selectedProduct !== 'all') {
            params.set('product', selectedProduct);
        }

        // Update URL without page reload
        const newURL = params.toString() ?
            `${window.location.pathname}?${params.toString()}` :
            window.location.pathname;

        window.history.replaceState({}, '', newURL);
    }

    setupSearch() {
        // Add search functionality if needed in the future
        const searchInput = document.querySelector('.recipe-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchRecipes(e.target.value);
            });
        }
    }

    searchRecipes(query) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        const searchTerm = query.toLowerCase().trim();

        recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.recipe-description')?.textContent.toLowerCase() || '';
            const chef = card.querySelector('.recipe-chef')?.textContent.toLowerCase() || '';

            const matches = title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                chef.includes(searchTerm);

            if (matches || searchTerm === '') {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.visibility = 'visible';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                card.style.visibility = 'hidden';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.recipesShowcase = new RecipesShowcase();
});

// Add smooth transitions to recipe cards
document.addEventListener('DOMContentLoaded', () => {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});