const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  customer: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ]
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'USA'
      }
    }
  },
  project: {
    type: {
      type: String,
      required: [true, 'Project type is required'],
      enum: ['residential', 'commercial', 'industrial', 'emergency', 'installation', 'maintenance', 'inspection', 'upgrade', 'other']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [2000, 'Project description cannot exceed 2000 characters']
    },
    scope: {
      type: String,
      enum: ['small', 'medium', 'large', 'custom'],
      default: 'medium'
    },
    urgency: {
      type: String,
      enum: ['normal', 'urgent', 'emergency'],
      default: 'normal'
    },
    timeline: {
      type: String,
      enum: ['asap', 'within-week', 'within-month', 'flexible'],
      default: 'flexible'
    }
  },
  requirements: {
    materials: [{
      name: String,
      quantity: Number,
      unit: String,
      estimatedCost: Number
    }],
    labor: {
      estimatedHours: Number,
      hourlyRate: Number,
      totalCost: Number
    },
    permits: {
      required: {
        type: Boolean,
        default: false
      },
      cost: Number,
      description: String
    },
    additionalServices: [{
      name: String,
      description: String,
      cost: Number
    }]
  },
  pricing: {
    subtotal: {
      type: Number,
      min: [0, 'Subtotal cannot be negative']
    },
    tax: {
      type: Number,
      min: [0, 'Tax cannot be negative']
    },
    discount: {
      type: Number,
      min: [0, 'Discount cannot be negative']
    },
    total: {
      type: Number,
      min: [0, 'Total cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    validUntil: {
      type: Date,
      default: function() {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      }
    },
    notes: String
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'reviewed', 'accepted', 'rejected', 'expired'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timeline: {
    estimatedStart: Date,
    estimatedCompletion: Date,
    actualStart: Date,
    actualCompletion: Date
  },
  communication: {
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    method: {
      type: String,
      enum: ['email', 'phone', 'in-person'],
      default: 'email'
    },
    followUpDate: Date,
    notes: [{
      content: String,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    size: Number,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  terms: {
    paymentTerms: {
      type: String,
      default: 'Net 30'
    },
    warranty: {
      type: String,
      default: '1 year parts and labor'
    },
    conditions: [String]
  },
  customerResponse: {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'counter-offer'],
      default: 'pending'
    },
    responseDate: Date,
    comments: String,
    counterOffer: {
      amount: Number,
      terms: String
    }
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'walk-in', 'referral'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for quote validity
quoteSchema.virtual('isValid').get(function() {
  return this.pricing.validUntil > new Date();
});

// Virtual for days until expiry
quoteSchema.virtual('daysUntilExpiry').get(function() {
  const now = new Date();
  const expiry = this.pricing.validUntil;
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for total project cost
quoteSchema.virtual('totalProjectCost').get(function() {
  let total = this.pricing.total || 0;
  
  // Add materials cost
  if (this.requirements.materials) {
    total += this.requirements.materials.reduce((sum, material) => sum + (material.estimatedCost || 0), 0);
  }
  
  // Add labor cost
  if (this.requirements.labor && this.requirements.labor.totalCost) {
    total += this.requirements.labor.totalCost;
  }
  
  // Add permits cost
  if (this.requirements.permits && this.requirements.permits.cost) {
    total += this.requirements.permits.cost;
  }
  
  // Add additional services cost
  if (this.requirements.additionalServices) {
    total += this.requirements.additionalServices.reduce((sum, service) => sum + (service.cost || 0), 0);
  }
  
  return total;
});

// Indexes for better query performance
quoteSchema.index({ status: 1 });
quoteSchema.index({ priority: 1 });
quoteSchema.index({ 'pricing.validUntil': 1 });
quoteSchema.index({ assignedTo: 1 });
quoteSchema.index({ 'customer.email': 1 });
quoteSchema.index({ createdAt: -1 });

// Static method to find active quotes
quoteSchema.statics.findActive = function() {
  return this.find({ 
    status: { $in: ['draft', 'sent', 'reviewed'] },
    'pricing.validUntil': { $gt: new Date() }
  }).sort({ createdAt: -1 });
};

// Static method to find expired quotes
quoteSchema.statics.findExpired = function() {
  return this.find({ 
    'pricing.validUntil': { $lt: new Date() },
    status: { $in: ['draft', 'sent', 'reviewed'] }
  }).sort({ 'pricing.validUntil': 1 });
};

// Static method to find quotes by status
quoteSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to find quotes by priority
quoteSchema.statics.findByPriority = function(priority) {
  return this.find({ priority }).sort({ createdAt: -1 });
};

// Static method to find quotes by assigned user
quoteSchema.statics.findByAssignedTo = function(userId) {
  return this.find({ assignedTo: userId }).sort({ createdAt: -1 });
};

// Instance method to send quote
quoteSchema.methods.send = function(method = 'email') {
  this.status = 'sent';
  this.communication.sent = true;
  this.communication.sentAt = new Date();
  this.communication.method = method;
  return this.save();
};

// Instance method to accept quote
quoteSchema.methods.accept = function(comments) {
  this.status = 'accepted';
  this.customerResponse.status = 'accepted';
  this.customerResponse.responseDate = new Date();
  if (comments) {
    this.customerResponse.comments = comments;
  }
  return this.save();
};

// Instance method to reject quote
quoteSchema.methods.reject = function(comments) {
  this.status = 'rejected';
  this.customerResponse.status = 'rejected';
  this.customerResponse.responseDate = new Date();
  if (comments) {
    this.customerResponse.comments = comments;
  }
  return this.save();
};

// Instance method to add counter offer
quoteSchema.methods.addCounterOffer = function(amount, terms, comments) {
  this.customerResponse.status = 'counter-offer';
  this.customerResponse.responseDate = new Date();
  this.customerResponse.counterOffer = { amount, terms };
  if (comments) {
    this.customerResponse.comments = comments;
  }
  return this.save();
};

// Instance method to add note
quoteSchema.methods.addNote = function(content, userId) {
  this.communication.notes.push({
    content,
    createdBy: userId
  });
  return this.save();
};

// Instance method to extend validity
quoteSchema.methods.extendValidity = function(days = 30) {
  this.pricing.validUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return this.save();
};

module.exports = mongoose.model('Quote', quoteSchema); 