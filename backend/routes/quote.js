const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validate, quoteValidation } = require('../middleware/validate');
const { 
  successResponse, 
  createdResponse, 
  notFoundResponse, 
  badRequestResponse,
  paginatedResponse
} = require('../utils/response');
const { sendQuoteRequest, sendAdminNotification } = require('../utils/email');
const { uploadAttachments, handleUploadError } = require('../middleware/upload');
const Quote = require('../models/Quote');

// @desc    Submit quote request
// @route   POST /api/quote
// @access  Public
router.post('/', quoteValidation, validate, async (req, res) => {
  try {
    const quoteData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'website'
    };
    
    const quote = await Quote.create(quoteData);
    
    // Send confirmation email to customer
    await sendQuoteRequest(quoteData);
    
    // Send notification to admin (if admin email is configured)
    if (process.env.ADMIN_EMAIL) {
      await sendAdminNotification(process.env.ADMIN_EMAIL, 'Quote Request', {
        'Customer Name': quoteData.customer.fullName,
        'Email': quoteData.customer.email,
        'Project Type': quoteData.project.type,
        'Scope': quoteData.project.scope || 'Not specified',
        'Urgency': quoteData.project.urgency || 'Normal'
      });
    }
    
    createdResponse(res, quote, 'Quote request submitted successfully. We will review your project and provide you with a detailed quote within 24 hours.');
  } catch (error) {
    console.error('Submit quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request',
      error: error.message
    });
  }
});

// @desc    Get all quotes (Admin only)
// @route   GET /api/quote
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    
    // Filter by assigned user
    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }
    
    // Search by customer name or email
    if (req.query.search) {
      query.$or = [
        { 'customer.fullName': { $regex: req.query.search, $options: 'i' } },
        { 'customer.email': { $regex: req.query.search, $options: 'i' } },
        { 'project.description': { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const total = await Quote.countDocuments(query);
    const quotes = await Quote.find(query)
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    paginatedResponse(res, quotes, page, limit, total, 'Quotes retrieved successfully');
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quotes',
      error: error.message
    });
  }
});

// @desc    Get quote by ID (Admin only)
// @route   GET /api/quote/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const quote = await Quote.findById(id)
      .populate('assignedTo', 'firstName lastName')
      .populate('communication.notes.createdBy', 'firstName lastName');
    
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    successResponse(res, quote, 'Quote retrieved successfully');
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quote',
      error: error.message
    });
  }
});

// @desc    Send quote to customer (Admin only)
// @route   PUT /api/quote/:id/send
// @access  Private/Admin
router.put('/:id/send', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'email' } = req.body;
    
    const quote = await Quote.findById(id);
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    await quote.send(method);
    
    successResponse(res, quote, 'Quote sent successfully');
  } catch (error) {
    console.error('Send quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send quote',
      error: error.message
    });
  }
});

// @desc    Update quote pricing (Admin only)
// @route   PUT /api/quote/:id/pricing
// @access  Private/Admin
router.put('/:id/pricing', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { pricing } = req.body;
    
    if (!pricing) {
      return badRequestResponse(res, 'Pricing information is required');
    }
    
    const quote = await Quote.findById(id);
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    quote.pricing = { ...quote.pricing, ...pricing };
    await quote.save();
    
    successResponse(res, quote, 'Quote pricing updated successfully');
  } catch (error) {
    console.error('Update quote pricing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote pricing',
      error: error.message
    });
  }
});

// @desc    Add note to quote (Admin only)
// @route   POST /api/quote/:id/notes
// @access  Private/Admin
router.post('/:id/notes', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return badRequestResponse(res, 'Note content is required');
    }
    
    const quote = await Quote.findById(id);
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    await quote.addNote(content, req.user._id);
    
    successResponse(res, quote, 'Note added successfully');
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message
    });
  }
});

// @desc    Upload attachments to quote
// @route   POST /api/quote/:id/attachments
// @access  Private/Admin
router.post('/:id/attachments', protect, authorize('admin'), uploadAttachments, handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.files || req.files.length === 0) {
      return badRequestResponse(res, 'No files provided');
    }
    
    const quote = await Quote.findById(id);
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    const attachments = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/attachments/${file.filename}`,
      size: file.size,
      type: file.mimetype
    }));
    
    quote.attachments.push(...attachments);
    await quote.save();
    
    successResponse(res, quote, 'Attachments uploaded successfully');
  } catch (error) {
    console.error('Upload attachments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload attachments',
      error: error.message
    });
  }
});

// @desc    Extend quote validity (Admin only)
// @route   PUT /api/quote/:id/extend
// @access  Private/Admin
router.put('/:id/extend', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { days = 30 } = req.body;
    
    const quote = await Quote.findById(id);
    if (!quote) {
      return notFoundResponse(res, 'Quote not found');
    }
    
    await quote.extendValidity(days);
    
    successResponse(res, quote, 'Quote validity extended successfully');
  } catch (error) {
    console.error('Extend quote validity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to extend quote validity',
      error: error.message
    });
  }
});

// @desc    Get active quotes (Admin only)
// @route   GET /api/quote/active
// @access  Private/Admin
router.get('/active', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.findActive();
    const total = quotes.length;
    const paginatedQuotes = quotes.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedQuotes, page, limit, total, 'Active quotes retrieved successfully');
  } catch (error) {
    console.error('Get active quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve active quotes',
      error: error.message
    });
  }
});

// @desc    Get expired quotes (Admin only)
// @route   GET /api/quote/expired
// @access  Private/Admin
router.get('/expired', protect, authorize('admin'), async (req, res) => {
  try {
    const quotes = await Quote.findExpired();
    
    successResponse(res, quotes, 'Expired quotes retrieved successfully');
  } catch (error) {
    console.error('Get expired quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve expired quotes',
      error: error.message
    });
  }
});

// @desc    Get quotes by status (Admin only)
// @route   GET /api/quote/status/:status
// @access  Private/Admin
router.get('/status/:status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.findByStatus(status);
    const total = quotes.length;
    const paginatedQuotes = quotes.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedQuotes, page, limit, total, 'Quotes retrieved successfully');
  } catch (error) {
    console.error('Get quotes by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quotes by status',
      error: error.message
    });
  }
});

// @desc    Get quotes by priority (Admin only)
// @route   GET /api/quote/priority/:priority
// @access  Private/Admin
router.get('/priority/:priority', protect, authorize('admin'), async (req, res) => {
  try {
    const { priority } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.findByPriority(priority);
    const total = quotes.length;
    const paginatedQuotes = quotes.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedQuotes, page, limit, total, 'Quotes retrieved successfully');
  } catch (error) {
    console.error('Get quotes by priority error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quotes by priority',
      error: error.message
    });
  }
});

// @desc    Get quotes assigned to user (Admin only)
// @route   GET /api/quote/assigned/:userId
// @access  Private/Admin
router.get('/assigned/:userId', protect, authorize('admin'), async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.findByAssignedTo(userId);
    const total = quotes.length;
    const paginatedQuotes = quotes.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedQuotes, page, limit, total, 'Assigned quotes retrieved successfully');
  } catch (error) {
    console.error('Get assigned quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve assigned quotes',
      error: error.message
    });
  }
});

module.exports = router; 