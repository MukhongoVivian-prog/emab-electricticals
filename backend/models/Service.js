const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['residential', 'commercial', 'industrial', 'emergency'],
    default: 'residential'
  },
  subcategory: {
    type: String,
    trim: true,
    maxlength: [50, 'Subcategory cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  longDescription: {
    type: String,
    maxlength: [5000, 'Long description cannot exceed 5000 characters']
  },
  features: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Feature title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [300, 'Feature description cannot exceed 300 characters']
    },
    icon: String
  }],
  benefits: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Benefit title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [300, 'Benefit description cannot exceed 300 characters']
    }
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'quote', 'custom'],
      default: 'quote'
    },
    basePrice: {
      type: Number,
      min: [0, 'Base price cannot be negative']
    },
    hourlyRate: {
      type: Number,
      min: [0, 'Hourly rate cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    pricingNotes: String
  },
  duration: {
    estimated: {
      type: String,
      default: 'Varies'
    },
    minHours: Number,
    maxHours: Number
  },
  requirements: [{
    type: String,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  }],
  certifications: [{
    name: String,
    description: String,
    image: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  faqs: [{
    question: {
      type: String,
      required: true,
      maxlength: [200, 'Question cannot exceed 200 characters']
    },
    answer: {
      type: String,
      required: true,
      maxlength: [1000, 'Answer cannot exceed 1000 characters']
    }
  }],
  relatedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  testimonials: [{
    customerName: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Testimonial cannot exceed 500 characters']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for primary image
serviceSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0] ? this.images[0].url : null);
});

// Virtual for average rating
serviceSchema.virtual('averageRating').get(function() {
  if (!this.testimonials.length) return 0;
  const total = this.testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return (total / this.testimonials.length).toFixed(1);
});

// Indexes for better query performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ subcategory: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ isFeatured: 1 });
serviceSchema.index({ isPopular: 1 });
serviceSchema.index({ sortOrder: 1 });

// Create slug from name before saving
serviceSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
  
  next();
});

// Static method to find active services
serviceSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
};

// Static method to find services by category
serviceSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category,
    isActive: true 
  }).sort({ sortOrder: 1, name: 1 });
};

// Static method to find featured services
serviceSchema.statics.findFeatured = function() {
  return this.find({ 
    isActive: true,
    isFeatured: true 
  }).sort({ sortOrder: 1, name: 1 });
};

// Static method to find popular services
serviceSchema.statics.findPopular = function() {
  return this.find({ 
    isActive: true,
    isPopular: true 
  }).sort({ sortOrder: 1, name: 1 });
};

// Static method to search services
serviceSchema.statics.search = function(query) {
  return this.find({
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { longDescription: { $regex: query, $options: 'i' } },
          { subcategory: { $regex: query, $options: 'i' } }
        ]
      },
      { isActive: true }
    ]
  });
};

// Instance method to add testimonial
serviceSchema.methods.addTestimonial = function(testimonialData) {
  this.testimonials.push(testimonialData);
  return this.save();
};

// Instance method to update average rating
serviceSchema.methods.updateAverageRating = function() {
  if (this.testimonials.length > 0) {
    const total = this.testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return total / this.testimonials.length;
  }
  return 0;
};

module.exports = mongoose.model('Service', serviceSchema); 