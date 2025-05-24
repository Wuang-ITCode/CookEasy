const User = require('../models/User');

// Đăng ký người dùng
exports.register = async (req, res) => {
    const { userName, Email, Password } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        const newUser = new User({ userName, Email, Password });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server khi đăng ký', error: err.message });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await User.findOne({ Email, Password });

        if (!user) {
            return res.status(401).json({ message: 'Sai email hoặc mật khẩu!' });
        }

        res.status(200).json({ message: 'Đăng nhập thành công', user });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server khi đăng nhập', error: err.message });
    }
};
