require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Phục vụ giao diện từ thư mục "public"
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/web', express.static('web'));
app.use('/terms', express.static('terms_and_conditions'));


// API routes
app.use('/api', recipeRoutes);
app.use('/api', favoriteRoutes);
app.use('/api/users', userRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Đã kết nối MongoDB Atlas'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Server chạy
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
