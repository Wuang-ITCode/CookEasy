document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script đã được tải.");

    const user = JSON.parse(localStorage.getItem("userLogin"));
    const username = user?.Email;
    const body = document.querySelector("body");

    // Kiểm tra thuộc tính data-mon
    if (!body?.dataset.mon) {
        console.log("⚠️ Không phải trang công thức, dừng script.");
        return;
    }

    // Lấy thông tin công thức
    const recipeTitle = document.querySelector("h2.mb-4")?.innerText || "Công thức không tên";
    const imgEl = document.querySelector("img");
    const imageUrl = imgEl?.getAttribute("src") || "";
    const pageLink = window.location.pathname;
    const recipeId = pageLink.split("/").pop().replace(".html", "");

    // Tạo nút lưu và tin nhắn
    const btn = document.createElement("button");
    btn.id = "save-btn";
    btn.className = "btn btn-outline-danger mb-3";
    btn.innerText = "💾 Lưu công thức";

    const msg = document.createElement("p");
    msg.id = "save-msg";
    msg.className = "text-success";

    const target = document.querySelector("h2.mb-4");

    if (!target) {
        console.warn("⚠️ Không tìm thấy tiêu đề công thức (h2.mb-4).");
        return;
    }

    target.insertAdjacentElement("afterend", msg);
    msg.insertAdjacentElement("afterend", btn);

    // Nếu chưa đăng nhập
    if (!username) {
        btn.disabled = true;
        msg.innerText = "⚠️ Bạn cần đăng nhập để lưu công thức.";
        return;
    }

    // Xử lý lưu
    const key = `favorites_${username}`;
    let favorites = JSON.parse(localStorage.getItem(key)) || [];

    if (favorites.some(r => r.id === recipeId)) {
        btn.innerText = "✅ Đã lưu";
        btn.disabled = true;
    }

    btn.addEventListener("click", () => {
        const recipe = {
            id: recipeId,
            title: recipeTitle,
            img: imageUrl,
            link: pageLink
        };

        if (!favorites.some(r => r.id === recipeId)) {
            favorites.push(recipe);
            localStorage.setItem(key, JSON.stringify(favorites));
            btn.innerText = "✅ Đã lưu";
            btn.disabled = true;
            msg.innerText = "✅ Đã thêm vào danh sách yêu thích!";
        }
    });
});