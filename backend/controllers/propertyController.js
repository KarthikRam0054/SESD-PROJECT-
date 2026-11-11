const Property = require('../models/Property');
const Favorite = require('../models/Favorite');
const Conversation = require('../models/Conversation');

// Helper to sanitize owner privacy
const sanitizeOwner = (owner) => {
  if (!owner) return null;
  const safe = {
    _id: owner._id,
    fullName: owner.fullName,
    profileImage: owner.profileImage,
    isVerified: owner.isVerified,
    role: owner.role,
    bio: owner.bio,
    phone: owner.hidePhone ? null : owner.phone,
    email: owner.hideEmail ? null : owner.email,
    hidePhone: owner.hidePhone,
    hideEmail: owner.hideEmail
  };
  return safe;
};

// @desc    Get all properties with advanced filters, search, and sorting
// @route   GET /api/properties
// @access  Public (Optional auth for favorite check)
const getProperties = async (req, res, next) => {
  try {
    const {
      search,
      category,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      city,
      area,
      bedrooms,
      bathrooms,
      floors,
      communityType,
      furnishedStatus,
      propertyCondition,
      parking,
      status,
      isFeatured,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const filter = {};

    // By default only show Available unless explicitly specified
    if (status) {
      filter.status = status;
    }

    if (listingType) {
      filter.listingType = listingType.toLowerCase();
    }

    if (category) {
      if (Array.isArray(category)) {
        filter.category = { $in: category };
      } else {
        filter.category = category;
      }
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (city) {
      filter['location.city'] = new RegExp(city.trim(), 'i');
    }

    if (area) {
      filter['location.area'] = new RegExp(area.trim(), 'i');
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Size range
    if (minSize || maxSize) {
      filter.size = {};
      if (minSize) filter.size.$gte = Number(minSize);
      if (maxSize) filter.size.$lte = Number(maxSize);
    }

    // Bedrooms
    if (bedrooms) {
      if (bedrooms.toString().includes('+')) {
        const count = parseInt(bedrooms, 10);
        filter.bedrooms = { $gte: count };
      } else {
        filter.bedrooms = Number(bedrooms);
      }
    }

    // Bathrooms
    if (bathrooms) {
      if (bathrooms.toString().includes('+')) {
        const count = parseInt(bathrooms, 10);
        filter.bathrooms = { $gte: count };
      } else {
        filter.bathrooms = Number(bathrooms);
      }
    }

    // Floors
    if (floors) {
      filter.floors = Number(floors);
    }

    // Community type
    if (communityType) {
      filter.communityType = communityType;
    }

    // Furnished status
    if (furnishedStatus) {
      filter.furnishedStatus = furnishedStatus;
    }

    // Condition
    if (propertyCondition) {
      filter.propertyCondition = propertyCondition;
    }

    // Parking
    if (parking !== undefined && parking !== '') {
      filter.parking = parking === 'true' || parking === true;
    }

    // Featured
    if (isFeatured === 'true' || isFeatured === true) {
      filter.isFeatured = true;
    }

    // Search text across title, description, city, area, address
    if (search && search.trim() !== '') {
      const q = search.trim();
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { 'location.city': regex },
        { 'location.area': regex },
        { 'location.address': regex },
        { category: regex }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else if (sort === 'size_desc') {
      sortOption = { size: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'featured') {
      sortOption = { isFeatured: -1, createdAt: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments(filter);
    const properties = await Property.find(filter)
      .populate('owner', 'fullName profileImage isVerified phone email hidePhone hideEmail')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Sanitize owner info for privacy
    const sanitizedProperties = properties.map((prop) => {
      const p = prop.toObject();
      p.owner = sanitizeOwner(p.owner);
      return p;
    });

    return res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      count: sanitizedProperties.length,
      properties: sanitizedProperties
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured & recent properties for homepage
// @route   GET /api/properties/home-showcase
// @access  Public
const getHomeShowcase = async (req, res, next) => {
  try {
    const featured = await Property.find({ status: 'Available', isFeatured: true })
      .populate('owner', 'fullName profileImage isVerified phone email hidePhone hideEmail')
      .limit(6)
      .sort({ createdAt: -1 });

    const recent = await Property.find({ status: 'Available' })
      .populate('owner', 'fullName profileImage isVerified phone email hidePhone hideEmail')
      .limit(6)
      .sort({ createdAt: -1 });

    // Aggregate locations with count
    const locations = await Property.aggregate([
      { $match: { status: 'Available' } },
      {
        $group: {
          _id: '$location.city',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          sampleImage: { $first: '$coverImage' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);

    return res.json({
      success: true,
      featured: featured.map((p) => {
        const item = p.toObject();
        item.owner = sanitizeOwner(item.owner);
        return item;
      }),
      recent: recent.map((p) => {
        const item = p.toObject();
        item.owner = sanitizeOwner(item.owner);
        return item;
      }),
      locations: locations.map((loc) => ({
        city: loc._id,
        count: loc.count,
        minPrice: loc.minPrice,
        image: loc.sampleImage
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public (Optional auth for favorite check)
const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'fullName profileImage isVerified phone email hidePhone hideEmail bio createdAt');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Increment views asynchronously
    Property.findByIdAndUpdate(property._id, { $inc: { views: 1 } }).exec();

    let isFavorite = false;
    if (req.user) {
      const fav = await Favorite.findOne({ user: req.user._id, property: property._id });
      if (fav) isFavorite = true;
    }

    const data = property.toObject();
    data.owner = sanitizeOwner(data.owner);
    data.isFavorite = isFavorite;

    return res.json({
      success: true,
      property: data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      category,
      propertyType = 'Residential',
      listingType = 'sale',
      price,
      size,
      sizeUnit = 'sq ft',
      location,
      bedrooms = 0,
      bathrooms = 0,
      floors = 1,
      propertyCondition = 'New',
      communityType = 'Individual Property',
      furnishedStatus = 'Unfurnished',
      parking = true,
      amenities = [],
      images = [],
      coverImage,
      description
    } = req.body;

    if (!title || !category || !price || !size || !location || !location.city || !location.area || !location.address || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (title, category, price, size, complete location, description)'
      });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one property image'
      });
    }

    let calculatedPricePerSqFt = null;
    if (sizeUnit === 'sq ft' && size > 0) {
      calculatedPricePerSqFt = Math.round(Number(price) / Number(size));
    }

    const newProperty = await Property.create({
      owner: req.user._id,
      title: title.trim(),
      category,
      propertyType,
      listingType,
      price: Number(price),
      pricePerSqFt: calculatedPricePerSqFt,
      size: Number(size),
      sizeUnit,
      location: {
        country: location.country || 'India',
        state: location.state || 'Telangana',
        city: location.city.trim(),
        area: location.area.trim(),
        address: location.address.trim(),
        coordinates: {
          lat: location.coordinates?.lat || 17.3850,
          lng: location.coordinates?.lng || 78.4867
        }
      },
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      floors: Number(floors) || 1,
      propertyCondition,
      communityType,
      furnishedStatus,
      parking: parking === true || parking === 'true',
      amenities: Array.isArray(amenities) ? amenities : [],
      images,
      coverImage: coverImage || images[0],
      description: description.trim(),
      status: 'Available'
    });

    const populated = await Property.findById(newProperty._id).populate('owner', 'fullName email phone');

    return res.status(201).json({
      success: true,
      message: 'Property listing published successfully',
      property: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a property listing
// @route   PUT /api/properties/:id
// @access  Private (Owner or Admin)
const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this property' });
    }

    const updates = req.body;
    
    // Recalculate pricePerSqFt if price or size is updated
    if (updates.price || updates.size) {
      const p = updates.price || property.price;
      const s = updates.size || property.size;
      const unit = updates.sizeUnit || property.sizeUnit;
      if (unit === 'sq ft' && s > 0) {
        updates.pricePerSqFt = Math.round(Number(p) / Number(s));
      }
    }

    Object.assign(property, updates);
    await property.save();

    return res.json({
      success: true,
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property status (Available, Sold, Rented)
// @route   PATCH /api/properties/:id/status
// @access  Private (Owner or Admin)
const updatePropertyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Available', 'Sold', 'Rented'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this property' });
    }

    property.status = status;
    await property.save();

    return res.json({
      success: true,
      message: `Property marked as ${status}`,
      property
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Owner or Admin)
const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    await Favorite.deleteMany({ property: req.params.id });

    return res.json({
      success: true,
      message: 'Property listing deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get listings owned by the logged-in user
// @route   GET /api/properties/user/my-listings
// @access  Private
const getMyListings = async (req, res, next) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({ createdAt: -1 });

    // Fetch inquiry counts for each property
    const propertiesWithInquiries = await Promise.all(
      properties.map(async (prop) => {
        const inquiryCount = await Conversation.countDocuments({ property: prop._id });
        const obj = prop.toObject();
        obj.inquiriesCount = inquiryCount;
        return obj;
      })
    );

    return res.json({
      success: true,
      count: propertiesWithInquiries.length,
      properties: propertiesWithInquiries
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProperties,
  getHomeShowcase,
  getPropertyById,
  createProperty,
  updateProperty,
  updatePropertyStatus,
  deleteProperty,
  getMyListings
};

