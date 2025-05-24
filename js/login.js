formlogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = EmailElement.value;
    const password = PasswordElement.value;

    fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email: email, Password: password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Đăng nhập thành công") {
            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = data.message;
            setTimeout(() => {
                window.location.href = "../web/home.html";
            }, 1500);
        } else {
            document.getElementById("message").innerText = data.message;
        }
    })
    .catch(error => {
        console.error("Lỗi khi đăng nhập:", error);
    });
});
