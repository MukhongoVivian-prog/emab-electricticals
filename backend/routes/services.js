const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validate, serviceValidation } = require('../middleware/validate');
const { 
  successResponse, 
  createdResponse, 
  notFoundResponse, 
  badRequestResponse,
  searchResponse
} = require('../utils/response');
const { uploadServiceImage, handleUploadError } = require('../middleware/upload');
const Service = require('../models/Service');

// @desc    Get all active services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const query = { isActive: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by subcategory
    if (req.query.subcategory) {
      query.subcategory = req.query.subcategory;
    }
    
    // Filter featured services
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }
    
    // Filter popular services
    if (req.query.popular === 'true') {
      query.isPopular = true;
    }
    
    // Search functionality
    if (req.query.search) {
      const searchResults = await Service.search(req.query.search);
      return searchResponse(res, searchResults, req.query.search, {}, searchResults.length, 'Services retrieved successfully');
    }
    
    const services = await Service.find(query)
      .sort({ sortOrder: 1, name: 1 });
    
    successResponse(res, services, 'Services retrieved successfully');
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services',
      error: error.message
    });
  }
});

// @desc    Get service by slug
// @route   GET /api/services/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const service = await Service.findOne({ slug, isActive: true });
    
    if (!service) {
      return notFoundResponse(res, 'Service not found');
    }
    
    // Get related services
    const relatedServices = await Service.find({
      _id: { $ne: service._id },
      category: service.category,
      isActive: true
    })
    .limit(3)
    .select('name slug description primaryImage')
    .sort({ sortOrder: 1, name: 1 });
    
    successResponse(res, {
      service,
      relatedServices
    }, 'Service retrieved successfully');
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve service',
      error: error.message
    });
  }
});

// @desc    Create new service (Admin only)
// @route   POST /api/services
// @access  Private/Admin
router.post('/', protect, authorize('admin'), serviceValidation, validate, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    
    createdResponse(res, service, 'Service created successfully');
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
});

// @desc    Update service (Admin only)
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), serviceValidation, validate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id);
    if (!service) {
      return notFoundResponse(res, 'Service not found');
    }
    
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    successResponse(res, updatedService, 'Service updated successfully');
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
});

// @desc    Delete service (Admin only)
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id);
    if (!service) {
      return notFoundResponse(res, 'Service not found');
    }
    
    await Service.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message
    });
  }
});

// @desc    Upload service image
// @route   POST /api/services/upload-image
// @access  Private/Admin
router.post('/upload-image', protect, authorize('admin'), uploadServiceImage, handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return badRequestResponse(res, 'No image file provided');
    }
    
    const imageUrl = `/uploads/services/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Upload service image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
});

// @desc    Add testimonial to service
// @route   POST /api/services/:id/testimonial
// @access  Public
router.post('/:id/testimonial', async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, rating, comment } = req.body;
    
    if (!customerName || !rating || !comment) {
      return badRequestResponse(res, 'Customer name, rating, and comment are required');
    }
    
    if (rating < 1 || rating > 5) {
      return badRequestResponse(res, 'Rating must be between 1 and 5');
    }
    
    const service = await Service.findById(id);
    if (!service) {
      return notFoundResponse(res, 'Service not found');
    }
    
    await service.addTestimonial({
      customerName,
      rating,
      comment
    });
    
    successResponse(res, service, 'Testimonial added successfully');
  } catch (error) {
    console.error('Add testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add testimonial',
      error: error.message
    });
  }
});

// @desc    Get featured services
// @route   GET /api/services/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const services = await Service.findFeatured()
      .limit(6);
    
    successResponse(res, services, 'Featured services retrieved successfully');
  } catch (error) {
    console.error('Get featured services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured services',
      error: error.message
    });
  }
});

// @desc    Get popular services
// @route   GET /api/services/popular
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const services = await Service.findPopular()
      .limit(6);
    
    successResponse(res, services, 'Popular services retrieved successfully');
  } catch (error) {
    console.error('Get popular services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular services',
      error: error.message
    });
  }
});

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const services = await Service.findByCategory(category);
    
    successResponse(res, services, 'Services retrieved successfully');
  } catch (error) {
    console.error('Get services by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services by category',
      error: error.message
    });
  }
});

// @desc    Search services
// @route   GET /api/services/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return badRequestResponse(res, 'Search query is required');
    }
    
    const results = await Service.search(q);
    
    searchResponse(res, results, q, {}, results.length, 'Search completed');
  } catch (error) {
    console.error('Search services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search services',
      error: error.message
    });
  }
});

// @desc    Get service categories
// @route   GET /api/services/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    
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

// @desc    Get service subcategories
// @route   GET /api/services/subcategories
// @access  Public
router.get('/subcategories', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    const subcategories = await Service.distinct('subcategory', query);
    
    successResponse(res, subcategories.filter(Boolean), 'Subcategories retrieved successfully');
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve subcategories',
      error: error.message
    });
  }
});

module.exports = router; 