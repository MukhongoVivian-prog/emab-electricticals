const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validate, contactValidation } = require('../middleware/validate');
const { 
  successResponse, 
  createdResponse, 
  notFoundResponse, 
  badRequestResponse,
  paginatedResponse
} = require('../utils/response');
const { sendContactConfirmation, sendAdminNotification } = require('../utils/email');
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', contactValidation, validate, async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'website'
    };
    
    const contact = await Contact.create(contactData);
    
    // Send confirmation email to customer
    await sendContactConfirmation(contactData);
    
    // Send notification to admin (if admin email is configured)
    if (process.env.ADMIN_EMAIL) {
      await sendAdminNotification(process.env.ADMIN_EMAIL, 'Contact Form Submission', {
        'Customer Name': contactData.fullName,
        'Email': contactData.email,
        'Subject': contactData.subject,
        'Service Type': contactData.serviceType || 'General',
        'Urgency': contactData.urgency || 'Normal'
      });
    }
    
    createdResponse(res, contact, 'Contact form submitted successfully. We will get back to you within 24 hours.');
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
});

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
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
    
    // Filter by urgency
    if (req.query.urgency) {
      query.urgency = req.query.urgency;
    }
    
    // Filter by assigned user
    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }
    
    // Search by customer name or email
    if (req.query.search) {
      query.$or = [
        { 'firstName': { $regex: req.query.search, $options: 'i' } },
        { 'lastName': { $regex: req.query.search, $options: 'i' } },
        { 'email': { $regex: req.query.search, $options: 'i' } },
        { 'subject': { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .populate('assignedTo', 'firstName lastName')
      .populate('response.respondedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    paginatedResponse(res, contacts, page, limit, total, 'Contacts retrieved successfully');
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: error.message
    });
  }
});

// @desc    Get contact by ID (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id)
      .populate('assignedTo', 'firstName lastName')
      .populate('response.respondedBy', 'firstName lastName')
      .populate('notes.createdBy', 'firstName lastName');
    
    if (!contact) {
      return notFoundResponse(res, 'Contact not found');
    }
    
    // Mark as read if not already read
    if (!contact.isRead) {
      await contact.markAsRead(req.user._id);
    }
    
    successResponse(res, contact, 'Contact retrieved successfully');
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact',
      error: error.message
    });
  }
});

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responseMessage } = req.body;
    
    if (!status) {
      return badRequestResponse(res, 'Status is required');
    }
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return notFoundResponse(res, 'Contact not found');
    }
    
    await contact.updateStatus(status, req.user._id);
    
    // Add response message if provided
    if (responseMessage) {
      contact.response.message = responseMessage;
      await contact.save();
    }
    
    successResponse(res, contact, 'Contact status updated successfully');
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: error.message
    });
  }
});

// @desc    Assign contact to user (Admin only)
// @route   PUT /api/contact/:id/assign
// @access  Private/Admin
router.put('/:id/assign', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    
    if (!assignedTo) {
      return badRequestResponse(res, 'Assigned user is required');
    }
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return notFoundResponse(res, 'Contact not found');
    }
    
    await contact.assignTo(assignedTo);
    
    successResponse(res, contact, 'Contact assigned successfully');
  } catch (error) {
    console.error('Assign contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign contact',
      error: error.message
    });
  }
});

// @desc    Add note to contact (Admin only)
// @route   POST /api/contact/:id/notes
// @access  Private/Admin
router.post('/:id/notes', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return badRequestResponse(res, 'Note content is required');
    }
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return notFoundResponse(res, 'Contact not found');
    }
    
    await contact.addNote({
      content,
      createdBy: req.user._id
    });
    
    successResponse(res, contact, 'Note added successfully');
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message
    });
  }
});

// @desc    Get unread contacts count (Admin only)
// @route   GET /api/contact/unread/count
// @access  Private/Admin
router.get('/unread/count', protect, authorize('admin'), async (req, res) => {
  try {
    const count = await Contact.countDocuments({ isRead: false });
    
    successResponse(res, { count }, 'Unread contacts count retrieved successfully');
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count',
      error: error.message
    });
  }
});

// @desc    Get contacts by status (Admin only)
// @route   GET /api/contact/status/:status
// @access  Private/Admin
router.get('/status/:status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.findByStatus(status);
    const total = contacts.length;
    const paginatedContacts = contacts.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedContacts, page, limit, total, 'Contacts retrieved successfully');
  } catch (error) {
    console.error('Get contacts by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts by status',
      error: error.message
    });
  }
});

// @desc    Get contacts by priority (Admin only)
// @route   GET /api/contact/priority/:priority
// @access  Private/Admin
router.get('/priority/:priority', protect, authorize('admin'), async (req, res) => {
  try {
    const { priority } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.findByPriority(priority);
    const total = contacts.length;
    const paginatedContacts = contacts.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedContacts, page, limit, total, 'Contacts retrieved successfully');
  } catch (error) {
    console.error('Get contacts by priority error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts by priority',
      error: error.message
    });
  }
});

// @desc    Get contacts by urgency (Admin only)
// @route   GET /api/contact/urgency/:urgency
// @access  Private/Admin
router.get('/urgency/:urgency', protect, authorize('admin'), async (req, res) => {
  try {
    const { urgency } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.findByUrgency(urgency);
    const total = contacts.length;
    const paginatedContacts = contacts.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedContacts, page, limit, total, 'Contacts retrieved successfully');
  } catch (error) {
    console.error('Get contacts by urgency error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts by urgency',
      error: error.message
    });
  }
});

// @desc    Get contacts assigned to user (Admin/Technician)
// @route   GET /api/contact/assigned/:userId
// @access  Private/Admin
router.get('/assigned/:userId', protect, authorize('admin', 'technician'), async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.findByAssignedTo(userId);
    const total = contacts.length;
    const paginatedContacts = contacts.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedContacts, page, limit, total, 'Assigned contacts retrieved successfully');
  } catch (error) {
    console.error('Get assigned contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve assigned contacts',
      error: error.message
    });
  }
});

module.exports = router; 