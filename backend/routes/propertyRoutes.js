const express = require('express');
const router = express.Router();
const {
  getProperties,
  getHomeShowcase,
  getPropertyById,
  createProperty,
  updateProperty,
  updatePropertyStatus,
  deleteProperty,
  getMyListings
} = require('../controllers/propertyController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, getProperties);
router.get('/home-showcase', getHomeShowcase);
router.get('/user/my-listings', protect, getMyListings);
router.get('/:id', optionalAuth, getPropertyById);
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.patch('/:id/status', protect, updatePropertyStatus);
router.delete('/:id', protect, deleteProperty);

module.exports = router;

