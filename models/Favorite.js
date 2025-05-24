const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    email: { type: String, required: true },  // Email người dùng
    title: String,
    img: String,
    link: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
