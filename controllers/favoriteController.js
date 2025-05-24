const Favorite = require('../models/Favorite');

// Lấy danh sách công thức yêu thích theo email
exports.getFavoritesByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const favorites = await Favorite.find({ email });
        res.json(favorites);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách yêu thích:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Thêm 1 công thức vào danh sách yêu thích
exports.addFavorite = async (req, res) => {
    try {
        const { email, title, img, link } = req.body;

        const existing = await Favorite.findOne({ email, link });
        if (existing) {
            return res.status(400).json({ message: 'Công thức đã được lưu trước đó.' });
        }

        const favorite = new Favorite({ email, title, img, link });
        await favorite.save();
        res.status(201).json({ message: 'Đã thêm vào danh sách yêu thích!' });
    } catch (err) {
        console.error('Lỗi khi thêm công thức yêu thích:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xoá 1 công thức khỏi yêu thích
exports.removeFavorite = async (req, res) => {
    try {
        const { email, link } = req.body;
        await Favorite.findOneAndDelete({ email, link });
        res.json({ message: 'Đã xoá khỏi danh sách yêu thích.' });
    } catch (err) {
        console.error('Lỗi khi xoá công thức yêu thích:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
