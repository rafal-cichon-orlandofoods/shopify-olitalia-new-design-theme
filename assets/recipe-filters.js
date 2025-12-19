document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const recipeCards = document.querySelectorAll('.recipe-card');
  
  let activeFilters = {
    category: 'all',
    chef: 'all',
    product: 'all'
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filterType = this.dataset.filter;
      const filterValue = this.dataset.value;
      
      // Update active button in this group
      const groupBtns = document.querySelectorAll(`[data-filter="${filterType}"]`);
      groupBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update active filters
      activeFilters[filterType] = filterValue;
      
      // Filter recipes
      recipeCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardChef = card.dataset.chef;
        const cardProduct = card.dataset.product;
        
        const categoryMatch = activeFilters.category === 'all' || cardCategory === activeFilters.category;
        const chefMatch = activeFilters.chef === 'all' || cardChef === activeFilters.chef;
        const productMatch = activeFilters.product === 'all' || cardProduct === activeFilters.product;
        
        if (categoryMatch && chefMatch && productMatch) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});