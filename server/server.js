const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// استدعاء الـ Controllers
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');
const commentController = require('./controllers/commentController');

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إعدادات Multer لرفع الصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI)

    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// المسارات (Routes)
// Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Photo Routes
app.post('/api/photos', upload.single('image'), photoController.uploadPhoto);
app.get('/api/photos', photoController.getAllPhotos);
app.get('/api/photos/:id', photoController.getPhotoById);
app.delete('/api/photos/:id', photoController.deletePhoto);

// Comment Routes
app.post('/api/photos/:photoId/comments', commentController.addComment);
app.get('/api/photos/:photoId/comments', commentController.getCommentsByPhoto);

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});