// Lưu công thức vào localStorage
function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    updateNavbarRecipes();
}

// Cập nhật danh sách công thức trong navbar
function updateNavbarRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const navbarRecipes = document.getElementById('navbar-recipes');
    
    if (navbarRecipes) {
        navbarRecipes.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeLink = document.createElement('a');
            recipeLink.className = 'dropdown-item';
            recipeLink.href = `#recipe-${recipe.id}`;
            recipeLink.textContent = recipe.title;
            navbarRecipes.appendChild(recipeLink);
        });
    }
}

// Tạo ID duy nhất cho công thức
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Khởi tạo danh sách công thức khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarRecipes();
}); 