console.log("Hello");

// Lấy ra element của trang
const formregister = document.getElementById("formregister");
const userNameElement = document.getElementById("userName");
const EmailElement = document.getElementById("Email");
const PasswordElement = document.getElementById("Password");
const rePasswordElement = document.getElementById("rePassword");

// Element liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const EmailError = document.getElementById("EmailError");
const PasswordError = document.getElementById("PasswordError");
const rePasswordError = document.getElementById("rePasswordError");

// Validate định dạng email
function validateEmail(email) {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// Lắng nghe sự kiện submit
formregister.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Kiểm tra tên
    if (!userNameElement.value) {
        userNameError.style.display = "block";
        isValid = false;
    } else {
        userNameError.style.display = "none";
    }

    // Kiểm tra email
    if (!EmailElement.value || !validateEmail(EmailElement.value)) {
        EmailError.style.display = "block";
        EmailError.innerText = "Email không hợp lệ";
        isValid = false;
    } else {
        EmailError.style.display = "none";
    }

    // Kiểm tra mật khẩu
    if (!PasswordElement.value) {
        PasswordError.style.display = "block";
        isValid = false;
    } else {
        PasswordError.style.display = "none";
    }

    // Kiểm tra nhập lại mật khẩu
    if (!rePasswordElement.value || PasswordElement.value !== rePasswordElement.value) {
        rePasswordError.style.display = "block";
        rePasswordError.innerText = "Mật khẩu không khớp";
        isValid = false;
    } else {
        rePasswordError.style.display = "none";
    }

    // Nếu dữ liệu hợp lệ
    if (isValid) {
        const newUser = {
            userName: userNameElement.value,
            Email: EmailElement.value,
            Password: PasswordElement.value
        };

        // Gửi dữ liệu đến server qua API
        fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Đăng ký thành công!") {
                alert("Đăng ký thành công! Đang chuyển hướng...");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                alert(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
            }
        })
        .catch(error => {
            console.error("Lỗi khi đăng ký:", error);
            alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
        });
    }
});
