const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
      required: [true, 'Phone number is required'],
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
  service: {
    type: {
      type: String,
      required: [true, 'Service type is required'],
      enum: ['residential', 'commercial', 'industrial', 'emergency', 'installation', 'maintenance', 'inspection', 'upgrade', 'other']
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      maxlength: [1000, 'Service description cannot exceed 1000 characters']
    },
    specificService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  },
  scheduling: {
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required']
    },
    preferredTime: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'flexible'],
      default: 'flexible'
    },
    timeSlot: {
      start: String,
      end: String
    },
    isFlexible: {
      type: Boolean,
      default: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  estimatedDuration: {
    hours: Number,
    minutes: Number
  },
  actualDuration: {
    hours: Number,
    minutes: Number
  },
  pricing: {
    estimatedCost: {
      type: Number,
      min: [0, 'Estimated cost cannot be negative']
    },
    actualCost: {
      type: Number,
      min: [0, 'Actual cost cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    notes: String
  },
  notes: {
    customer: {
      type: String,
      maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
    },
    internal: {
      type: String,
      maxlength: [1000, 'Internal notes cannot exceed 1000 characters']
    }
  },
  confirmation: {
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    method: {
      type: String,
      enum: ['email', 'sms', 'both'],
      default: 'email'
    }
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms'],
      required: true
    },
    scheduledFor: {
      type: Date,
      required: true
    },
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }],
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['customer', 'company', 'system'],
      default: 'customer'
    },
    cancelledAt: Date,
    refundAmount: Number
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [1000, 'Feedback comment cannot exceed 1000 characters']
    },
    submittedAt: Date
  },
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
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

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (this.actualDuration) {
    return `${this.actualDuration.hours}h ${this.actualDuration.minutes}m`;
  } else if (this.estimatedDuration) {
    return `${this.estimatedDuration.hours}h ${this.estimatedDuration.minutes}m`;
  }
  return 'TBD';
});

// Virtual for total cost
bookingSchema.virtual('totalCost').get(function() {
  return this.pricing.actualCost || this.pricing.estimatedCost || 0;
});

// Virtual for is overdue
bookingSchema.virtual('isOverdue').get(function() {
  if (this.status === 'confirmed' && this.scheduling.preferredDate < new Date()) {
    return true;
  }
  return false;
});

// Indexes for better query performance
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'scheduling.preferredDate': 1 });
bookingSchema.index({ assignedTechnician: 1 });
bookingSchema.index({ 'customer.email': 1 });
bookingSchema.index({ priority: 1 });
bookingSchema.index({ urgency: 1 });
bookingSchema.index({ createdAt: -1 });

// Static method to find pending bookings
bookingSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ 'scheduling.preferredDate': 1 });
};

// Static method to find confirmed bookings
bookingSchema.statics.findConfirmed = function() {
  return this.find({ status: 'confirmed' }).sort({ 'scheduling.preferredDate': 1 });
};

// Static method to find bookings by date range
bookingSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    'scheduling.preferredDate': {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ 'scheduling.preferredDate': 1 });
};

// Static method to find bookings by technician
bookingSchema.statics.findByTechnician = function(technicianId) {
  return this.find({ assignedTechnician: technicianId }).sort({ 'scheduling.preferredDate': 1 });
};

// Static method to find overdue bookings
bookingSchema.statics.findOverdue = function() {
  return this.find({
    status: 'confirmed',
    'scheduling.preferredDate': { $lt: new Date() }
  }).sort({ 'scheduling.preferredDate': 1 });
};

// Instance method to confirm booking
bookingSchema.methods.confirm = function(technicianId, estimatedDuration) {
  this.status = 'confirmed';
  this.assignedTechnician = technicianId;
  if (estimatedDuration) {
    this.estimatedDuration = estimatedDuration;
  }
  return this.save();
};

// Instance method to start work
bookingSchema.methods.startWork = function() {
  this.status = 'in-progress';
  return this.save();
};

// Instance method to complete booking
bookingSchema.methods.complete = function(actualDuration, actualCost) {
  this.status = 'completed';
  if (actualDuration) {
    this.actualDuration = actualDuration;
  }
  if (actualCost) {
    this.pricing.actualCost = actualCost;
  }
  return this.save();
};

// Instance method to cancel booking
bookingSchema.methods.cancel = function(reason, cancelledBy, refundAmount) {
  this.status = 'cancelled';
  this.cancellation = {
    reason,
    cancelledBy,
    cancelledAt: new Date(),
    refundAmount: refundAmount || 0
  };
  return this.save();
};

// Instance method to reschedule
bookingSchema.methods.reschedule = function(newDate, newTime) {
  this.status = 'rescheduled';
  this.scheduling.preferredDate = newDate;
  if (newTime) {
    this.scheduling.preferredTime = newTime;
  }
  return this.save();
};

// Instance method to add feedback
bookingSchema.methods.addFeedback = function(rating, comment) {
  this.feedback = {
    rating,
    comment,
    submittedAt: new Date()
  };
  return this.save();
};

module.exports = mongoose.model('Booking', bookingSchema); 