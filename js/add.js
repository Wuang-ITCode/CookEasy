document.getElementById("recipeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const steps = document.getElementById("steps").value.trim();
    const imageFile = document.getElementById("image").files[0];
    const videoFile = document.getElementById("video").files[0];

    const reader = new FileReader();

    reader.onload = function () {
        const imageData = imageFile ? reader.result : null;

        const recipe = {
            title,
            description,
            ingredients,
            steps,
            image: imageData,
            video: videoFile ? URL.createObjectURL(videoFile) : null
        };

        // Gửi dữ liệu lên API server
        fetch("http://localhost:3000/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
        .then(response => response.json())
        .then(data => {
            alert("✅ Đã lưu công thức!");
            window.location.href = "./home.html";
        })
        .catch(error => {
            console.error("❌ Lỗi khi lưu công thức:", error);
            alert("Đã xảy ra lỗi khi lưu công thức!");
        });
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onload(); // Nếu không có ảnh, gọi luôn để gửi API
    }
});

// Hiển thị ảnh xem trước
document.getElementById("image").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("image-preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            preview.src = reader.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = "none";
    }
});

// Hiển thị video xem trước
document.getElementById("video").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("video-preview");

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }
});
