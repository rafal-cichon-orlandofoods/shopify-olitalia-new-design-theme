function openRecipe(blockId) {
  // Hide all other expanded recipes
  const allExpanded = document.querySelectorAll('.full-recipe-content');
  allExpanded.forEach(content => {
    content.style.display = 'none';
  });
  
  // Show the selected recipe
  const recipeContent = document.getElementById(`recipe-${blockId}`);
  if (recipeContent) {
    recipeContent.style.display = 'block';
    
    // Scroll to the recipe
    recipeContent.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

function closeRecipe(blockId) {
  const recipeContent = document.getElementById(`recipe-${blockId}`);
  if (recipeContent) {
    recipeContent.style.display = 'none';
  }
}