const Favorite = require('../models/Favorite');
const Property = require('../models/Property');

// Helper to sanitize owner in property
const sanitizeOwner = (owner) => {
  if (!owner) return null;
  return {
    _id: owner._id,
    fullName: owner.fullName,
    profileImage: owner.profileImage,
    isVerified: owner.isVerified,
    role: owner.role,
    phone: owner.hidePhone ? null : owner.phone,
    email: owner.hideEmail ? null : owner.email
  };
};

// @desc    Get all saved favorites for logged-in user
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate({
        path: 'property',
        populate: {
          path: 'owner',
          select: 'fullName profileImage isVerified phone email hidePhone hideEmail'
        }
      })
      .sort({ createdAt: -1 });

    // Filter out if property was deleted
    const validFavorites = favorites
      .filter((fav) => fav.property != null)
      .map((fav) => {
        const item = fav.toObject();
        if (item.property && item.property.owner) {
          item.property.owner = sanitizeOwner(item.property.owner);
        }
        return item;
      });

    return res.json({
      success: true,
      count: validFavorites.length,
      favorites: validFavorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add property to favorites
// @route   POST /api/favorites/:propertyId
// @access  Private
const addFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const existing = await Favorite.findOne({ user: req.user._id, property: propertyId });
    if (existing) {
      return res.json({ success: true, message: 'Property already in favorites', isFavorite: true });
    }

    await Favorite.create({
      user: req.user._id,
      property: propertyId
    });

    return res.status(201).json({
      success: true,
      message: 'Property added to favorites',
      isFavorite: true
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:propertyId
// @access  Private
const removeFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    await Favorite.findOneAndDelete({
      user: req.user._id,
      property: propertyId
    });

    return res.json({
      success: true,
      message: 'Property removed from favorites',
      isFavorite: false
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};

