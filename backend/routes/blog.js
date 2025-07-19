const express = require('express');
const router = express.Router();
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validate, blogValidation } = require('../middleware/validate');
const { 
  successResponse, 
  createdResponse, 
  notFoundResponse, 
  badRequestResponse,
  paginatedResponse,
  searchResponse
} = require('../utils/response');
const { uploadBlogImage, handleUploadError } = require('../middleware/upload');
const Blog = require('../models/Blog');

// @desc    Get all published blogs with pagination
// @route   GET /api/blog
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    const query = { status: 'published', isPublished: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Search functionality
    if (req.query.search) {
      const searchResults = await Blog.search(req.query.search);
      const total = searchResults.length;
      const blogs = searchResults.slice(skip, skip + limit);
      
      return paginatedResponse(res, blogs, page, limit, total, 'Blogs retrieved successfully');
    }
    
    // Get total count
    const total = await Blog.countDocuments(query);
    
    // Get blogs with pagination
    const blogs = await Blog.find(query)
      .populate('author', 'firstName lastName')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Don't send full content in list view
    
    paginatedResponse(res, blogs, page, limit, total, 'Blogs retrieved successfully');
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blogs',
      error: error.message
    });
  }
});

// @desc    Get featured blogs
// @route   GET /api/blog/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.findFeatured()
      .populate('author', 'firstName lastName')
      .limit(3)
      .select('-content');
    
    successResponse(res, blogs, 'Featured blogs retrieved successfully');
  } catch (error) {
    console.error('Get featured blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured blogs',
      error: error.message
    });
  }
});

// @desc    Get blog by slug
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOne({ 
      slug, 
      status: 'published', 
      isPublished: true 
    }).populate('author', 'firstName lastName');
    
    if (!blog) {
      return notFoundResponse(res, 'Blog not found');
    }
    
    // Increment views
    await blog.incrementViews();
    
    // Get related posts
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: 'published',
      isPublished: true
    })
    .limit(3)
    .select('title slug excerpt featuredImage publishedAt')
    .sort({ publishedAt: -1 });
    
    successResponse(res, {
      blog,
      relatedPosts
    }, 'Blog retrieved successfully');
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog',
      error: error.message
    });
  }
});

// @desc    Create new blog (Admin only)
// @route   POST /api/blog
// @access  Private/Admin
router.post('/', protect, authorize('admin'), blogValidation, validate, async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user._id,
      authorName: `${req.user.firstName} ${req.user.lastName}`
    };
    
    const blog = await Blog.create(blogData);
    
    createdResponse(res, blog, 'Blog created successfully');
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message
    });
  }
});

// @desc    Update blog (Admin only)
// @route   PUT /api/blog/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), blogValidation, validate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return notFoundResponse(res, 'Blog not found');
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    successResponse(res, updatedBlog, 'Blog updated successfully');
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message
    });
  }
});

// @desc    Delete blog (Admin only)
// @route   DELETE /api/blog/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return notFoundResponse(res, 'Blog not found');
    }
    
    await Blog.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message
    });
  }
});

// @desc    Upload blog image
// @route   POST /api/blog/upload-image
// @access  Private/Admin
router.post('/upload-image', protect, authorize('admin'), uploadBlogImage, handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return badRequestResponse(res, 'No image file provided');
    }
    
    const imageUrl = `/uploads/blog/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Upload blog image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
});

// @desc    Like/Unlike blog
// @route   POST /api/blog/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return notFoundResponse(res, 'Blog not found');
    }
    
    // Check if user already liked
    const existingLike = blog.likes.find(like => like.user.toString() === req.user._id.toString());
    
    if (existingLike) {
      // Unlike
      await blog.removeLike(req.user._id);
      res.json({
        success: true,
        message: 'Blog unliked successfully',
        data: { liked: false, likeCount: blog.likes.length - 1 }
      });
    } else {
      // Like
      await blog.addLike(req.user._id);
      res.json({
        success: true,
        message: 'Blog liked successfully',
        data: { liked: true, likeCount: blog.likes.length + 1 }
      });
    }
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like/unlike blog',
      error: error.message
    });
  }
});

// @desc    Add comment to blog
// @route   POST /api/blog/:id/comment
// @access  Private
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return badRequestResponse(res, 'Comment content is required');
    }
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return notFoundResponse(res, 'Blog not found');
    }
    
    const commentData = {
      user: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      content
    };
    
    await blog.addComment(commentData);
    
    res.json({
      success: true,
      message: 'Comment added successfully'
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: error.message
    });
  }
});

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { 
      status: 'published', 
      isPublished: true 
    });
    
    successResponse(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error.message
    });
  }
});

// @desc    Get blogs by category
// @route   GET /api/blog/category/:category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.findByCategory(category);
    const total = blogs.length;
    const paginatedBlogs = blogs.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedBlogs, page, limit, total, 'Blogs retrieved successfully');
  } catch (error) {
    console.error('Get blogs by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blogs by category',
      error: error.message
    });
  }
});

// @desc    Search blogs
// @route   GET /api/blog/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return badRequestResponse(res, 'Search query is required');
    }
    
    const results = await Blog.search(q);
    
    searchResponse(res, results, q, {}, results.length, 'Search completed');
  } catch (error) {
    console.error('Search blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search blogs',
      error: error.message
    });
  }
});

module.exports = router; 