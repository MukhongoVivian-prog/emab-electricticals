const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
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
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  serviceType: {
    type: String,
    enum: ['general', 'residential', 'commercial', 'industrial', 'emergency', 'other'],
    default: 'general'
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'responded', 'resolved', 'spam'],
    default: 'new'
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
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  source: {
    type: String,
    enum: ['website', 'phone', 'email', 'social-media', 'referral'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  location: {
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  readBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followUpDate: Date,
  notes: [{
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Note cannot exceed 1000 characters']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for response time
contactSchema.virtual('responseTime').get(function() {
  if (this.response && this.response.respondedAt) {
    return this.response.respondedAt - this.createdAt;
  }
  return null;
});

// Indexes for better query performance
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ urgency: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ assignedTo: 1 });
contactSchema.index({ isRead: 1 });

// Static method to find unread contacts
contactSchema.statics.findUnread = function() {
  return this.find({ isRead: false }).sort({ createdAt: -1 });
};

// Static method to find contacts by status
contactSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to find contacts by priority
contactSchema.statics.findByPriority = function(priority) {
  return this.find({ priority }).sort({ createdAt: -1 });
};

// Static method to find contacts by urgency
contactSchema.statics.findByUrgency = function(urgency) {
  return this.find({ urgency }).sort({ createdAt: -1 });
};

// Static method to find contacts by assigned user
contactSchema.statics.findByAssignedTo = function(userId) {
  return this.find({ assignedTo: userId }).sort({ createdAt: -1 });
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function(userId) {
  this.isRead = true;
  this.readAt = new Date();
  this.readBy = userId;
  return this.save();
};

// Instance method to add note
contactSchema.methods.addNote = function(noteData) {
  this.notes.push(noteData);
  return this.save();
};

// Instance method to update status
contactSchema.methods.updateStatus = function(status, userId) {
  this.status = status;
  if (status === 'responded' && !this.response.respondedAt) {
    this.response.respondedAt = new Date();
    this.response.respondedBy = userId;
  }
  return this.save();
};

// Instance method to assign to user
contactSchema.methods.assignTo = function(userId) {
  this.assignedTo = userId;
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema); 