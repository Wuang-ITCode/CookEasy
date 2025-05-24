document.getElementById("searchInput").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card-item");

    cards.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase();
        if (title.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

document.getElementById("logoutButton").addEventListener("click", function () {
            alert("Bạn đã đăng xuất thành công!");
            window.location.href = "../account/login.html";
        });