const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['safety', 'education', 'technology', 'troubleshooting', 'energy', 'commercial', 'residential', 'industrial', 'emergency'],
    default: 'education'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
blogSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
blogSchema.virtual('commentCount').get(function() {
  return this.comments.filter(comment => comment.isApproved).length;
});

// Virtual for reading time calculation
blogSchema.virtual('calculatedReadTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
});

// Indexes for better query performance
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ isPublished: 1 });
blogSchema.index({ isFeatured: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ author: 1 });

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
    this.isPublished = true;
  }
  
  // Calculate read time if not provided
  if (!this.readTime) {
    this.readTime = this.calculatedReadTime;
  }
  
  next();
});

// Static method to find published blogs
blogSchema.statics.findPublished = function() {
  return this.find({ 
    status: 'published', 
    isPublished: true,
    publishedAt: { $lte: new Date() }
  });
};

// Static method to find featured blogs
blogSchema.statics.findFeatured = function() {
  return this.find({ 
    status: 'published', 
    isPublished: true,
    isFeatured: true,
    publishedAt: { $lte: new Date() }
  });
};

// Static method to find blogs by category
blogSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category,
    status: 'published', 
    isPublished: true,
    publishedAt: { $lte: new Date() }
  });
};

// Static method to search blogs
blogSchema.statics.search = function(query) {
  return this.find({
    $and: [
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { excerpt: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      },
      { status: 'published', isPublished: true }
    ]
  });
};

// Instance method to increment views
blogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to add like
blogSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  if (!existingLike) {
    this.likes.push({ user: userId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method to remove like
blogSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  return this.save();
};

// Instance method to add comment
blogSchema.methods.addComment = function(commentData) {
  this.comments.push(commentData);
  return this.save();
};

module.exports = mongoose.model('Blog', blogSchema); 