class HeaderTopBar {
    constructor() {
        this.init();
    }

    init() {
        this.setupSearch();
        this.setupLanguageSelector();
        this.setupMobileMenu();
        this.setupClickOutside();
    }

    setupSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchItem = document.querySelector('.search-item');
        const searchInput = document.querySelector('.search-input');

        if (searchToggle && searchItem) {
            searchToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Close language selector if open
                this.closeLanguageSelector();

                // Toggle search
                searchItem.classList.toggle('active');

                // Focus input if opening
                if (searchItem.classList.contains('active') && searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            });
        }

        // Handle search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                const query = searchInput?.value?.trim();
                if (!query) {
                    e.preventDefault();
                    searchInput?.focus();
                }
            });
        }
    }

    setupLanguageSelector() {
        const languageToggle = document.querySelector('.language-toggle');
        const languageSelector = document.querySelector('.language-selector');

        if (languageToggle && languageSelector) {
            languageToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Close search if open
                this.closeSearch();

                // Toggle language selector
                languageSelector.classList.toggle('active');
            });
        }
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileDropdown = document.querySelector('.mobile-dropdown');

        if (mobileToggle && mobileDropdown) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();

                // Toggle mobile menu
                mobileToggle.classList.toggle('active');
                mobileDropdown.classList.toggle('active');
            });
        }
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            // Close search if clicking outside
            const searchItem = document.querySelector('.search-item');
            if (searchItem && !searchItem.contains(e.target)) {
                this.closeSearch();
            }

            // Close language selector if clicking outside
            const languageSelector = document.querySelector('.language-selector');
            if (languageSelector && !languageSelector.contains(e.target)) {
                this.closeLanguageSelector();
            }
        });

        // Close dropdowns on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSearch();
                this.closeLanguageSelector();
            }
        });
    }

    closeSearch() {
        const searchItem = document.querySelector('.search-item');
        if (searchItem) {
            searchItem.classList.remove('active');
        }
    }

    closeLanguageSelector() {
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            languageSelector.classList.remove('active');
        }
    }

    // Method to update colors dynamically
    updateColors(bgColor, textColor) {
        const topBar = document.querySelector('.header-top-bar');
        if (topBar) {
            topBar.style.setProperty('--top-bar-bg', bgColor);
            topBar.style.setProperty('--top-bar-text', textColor);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderTopBar();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024) {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileDropdown = document.querySelector('.mobile-dropdown');

        if (mobileToggle && mobileDropdown) {
            mobileToggle.classList.remove('active');
            mobileDropdown.classList.remove('active');
        }
    }
});