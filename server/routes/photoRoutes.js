





const express = require('express');
const router = express.Router();
const multer = require('multer');
const photoController = require('../controllers/photoController');

// إعداد تخزين الصور المرفوعة في مجلد uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// مسارات الصور (عرض الكل، عرض صورة، رفع صورة، حذف صورة)
router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotoById);
router.post('/', upload.single('image'), photoController.uploadPhoto);
router.delete('/:id', photoController.deletePhoto);

module.exports = router;