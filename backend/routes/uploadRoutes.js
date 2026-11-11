const express = require('express');
const router = express.Router();
const { upload, uploadSingle, uploadMultiple } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/single', protect, upload.single('image'), uploadSingle);
router.post('/multiple', protect, upload.array('images', 10), uploadMultiple);

module.exports = router;

