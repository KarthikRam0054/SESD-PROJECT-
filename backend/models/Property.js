const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Property must belong to an owner']
    },
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [180, 'Title cannot exceed 180 characters']
    },
    category: {
      type: String,
      required: [true, 'Property category is required'],
      enum: [
        'Individual Houses',
        'Buildings with Rental Units',
        'Land / Plots',
        'Villas',
        'Commercial'
      ]
    },
    propertyType: {
      type: String,
      enum: ['Residential', 'Commercial'],
      default: 'Residential'
    },
    listingType: {
      type: String,
      required: [true, 'Listing type is required (sale or rent)'],
      enum: ['sale', 'rent'],
      default: 'sale'
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive']
    },
    pricePerSqFt: {
      type: Number,
      default: null
    },
    size: {
      type: Number,
      required: [true, 'Property size is required'],
      min: [1, 'Size must be greater than 0']
    },
    sizeUnit: {
      type: String,
      enum: ['sq ft', 'acres', 'sq yards'],
      default: 'sq ft'
    },
    location: {
      country: { type: String, default: 'India' },
      state: { type: String, default: 'Telangana' },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
      },
      area: {
        type: String,
        required: [true, 'Area/Locality is required'],
        trim: true
      },
      address: {
        type: String,
        required: [true, 'Complete address is required'],
        trim: true
      },
      coordinates: {
        lat: { type: Number, default: 17.3850 }, // default near Hyderabad
        lng: { type: Number, default: 78.4867 }
      }
    },
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },
    floors: {
      type: Number,
      default: 1
    },
    propertyCondition: {
      type: String,
      enum: ['New', 'Resale', 'Under Construction'],
      default: 'New'
    },
    communityType: {
      type: String,
      enum: ['Gated Community', 'Individual Property'],
      default: 'Individual Property'
    },
    furnishedStatus: {
      type: String,
      enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
      default: 'Unfurnished'
    },
    parking: {
      type: Boolean,
      default: true
    },
    amenities: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'At least one property image is required'
      }
    },
    coverImage: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
      maxlength: [4000, 'Description cannot exceed 4000 characters']
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Rented'],
      default: 'Available'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    inquiriesCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save calculate pricePerSqFt if sizeUnit is sq ft
propertySchema.pre('save', function (next) {
  if (this.size && this.price && (!this.pricePerSqFt || this.isModified('price') || this.isModified('size'))) {
    if (this.sizeUnit === 'sq ft') {
      this.pricePerSqFt = Math.round(this.price / this.size);
    }
  }
  if (!this.coverImage && this.images && this.images.length > 0) {
    this.coverImage = this.images[0];
  }
  next();
});

// Text index for full text search
propertySchema.index({
  title: 'text',
  description: 'text',
  'location.city': 'text',
  'location.area': 'text',
  'location.address': 'text'
});

propertySchema.index({ 'location.city': 1, category: 1, listingType: 1, price: 1, status: 1 });
propertySchema.index({ owner: 1, createdAt: -1 });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

