
const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { validateComment } = require('../middleware/validation');

// مسار إضافة تعليق جديد لصورة معينة
router.post('/', validateComment, commentController.addComment);

module.exports = router;
