document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    const username = user?.Email;
    const favoritesList = document.getElementById("favorites-list");
    const noFavMsg = document.getElementById("no-fav");

    if (!username) {
        noFavMsg.innerText = "⚠️ Bạn cần đăng nhập để xem danh sách công thức đã lưu.";
        return;
    }

    const key = `favorites_${username}`;
    const recipes = JSON.parse(localStorage.getItem(key)) || [];

    if (recipes.length === 0) {
        noFavMsg.innerText = "Bạn chưa lưu công thức nào.";
        return;
    }

    recipes.forEach(recipe => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${recipe.img}" class="card-img-top" alt="${recipe.title}" style="height: 220px; object-fit: cover;">
                <div class="card-body text-center">
                    <h5 class="card-title">${recipe.title}</h5>
                    <a href="${recipe.link}" class="btn btn-primary">Xem chi tiết</a>
                </div>
            </div>
        `;

        favoritesList.appendChild(col);
    });
});
