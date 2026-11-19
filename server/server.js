const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// استدعاء ملفات المسارات المنفصلة (Routes)
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// ربط المسارات (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/photos/:photoId/comments', commentRoutes);

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});