const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validate, bookingValidation } = require('../middleware/validate');
const { 
  successResponse, 
  createdResponse, 
  notFoundResponse, 
  badRequestResponse,
  paginatedResponse
} = require('../utils/response');
const { sendBookingConfirmation, sendAdminNotification } = require('../utils/email');
const { uploadAttachments, handleUploadError } = require('../middleware/upload');
const Booking = require('../models/Booking');

// @desc    Submit booking request
// @route   POST /api/booking
// @access  Public
router.post('/', bookingValidation, validate, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'website'
    };
    
    const booking = await Booking.create(bookingData);
    
    // Send confirmation email to customer
    await sendBookingConfirmation(bookingData);
    
    // Send notification to admin (if admin email is configured)
    if (process.env.ADMIN_EMAIL) {
      await sendAdminNotification(process.env.ADMIN_EMAIL, 'Service Booking Request', {
        'Customer Name': bookingData.customer.fullName,
        'Email': bookingData.customer.email,
        'Service Type': bookingData.service.type,
        'Preferred Date': new Date(bookingData.scheduling.preferredDate).toLocaleDateString(),
        'Preferred Time': bookingData.scheduling.preferredTime
      });
    }
    
    createdResponse(res, booking, 'Booking request submitted successfully. We will contact you within 24 hours to confirm your appointment.');
  } catch (error) {
    console.error('Submit booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit booking request',
      error: error.message
    });
  }
});

// @desc    Get all bookings (Admin only)
// @route   GET /api/booking
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
    
    // Filter by assigned technician
    if (req.query.assignedTechnician) {
      query.assignedTechnician = req.query.assignedTechnician;
    }
    
    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query['scheduling.preferredDate'] = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    // Search by customer name or email
    if (req.query.search) {
      query.$or = [
        { 'customer.fullName': { $regex: req.query.search, $options: 'i' } },
        { 'customer.email': { $regex: req.query.search, $options: 'i' } },
        { 'service.description': { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('assignedTechnician', 'firstName lastName')
      .sort({ 'scheduling.preferredDate': 1 })
      .skip(skip)
      .limit(limit);
    
    paginatedResponse(res, bookings, page, limit, total, 'Bookings retrieved successfully');
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: error.message
    });
  }
});

// @desc    Get booking by ID (Admin only)
// @route   GET /api/booking/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id)
      .populate('assignedTechnician', 'firstName lastName');
    
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    successResponse(res, booking, 'Booking retrieved successfully');
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: error.message
    });
  }
});

// @desc    Confirm booking (Admin only)
// @route   PUT /api/booking/:id/confirm
// @access  Private/Admin
router.put('/:id/confirm', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTechnician, estimatedDuration } = req.body;
    
    if (!assignedTechnician) {
      return badRequestResponse(res, 'Assigned technician is required');
    }
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    await booking.confirm(assignedTechnician, estimatedDuration);
    
    successResponse(res, booking, 'Booking confirmed successfully');
  } catch (error) {
    console.error('Confirm booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm booking',
      error: error.message
    });
  }
});

// @desc    Start work on booking (Technician only)
// @route   PUT /api/booking/:id/start
// @access  Private/Technician
router.put('/:id/start', protect, authorize('technician'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    // Check if technician is assigned to this booking
    if (booking.assignedTechnician.toString() !== req.user._id.toString()) {
      return badRequestResponse(res, 'You are not assigned to this booking');
    }
    
    await booking.startWork();
    
    successResponse(res, booking, 'Work started successfully');
  } catch (error) {
    console.error('Start work error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start work',
      error: error.message
    });
  }
});

// @desc    Complete booking (Technician only)
// @route   PUT /api/booking/:id/complete
// @access  Private/Technician
router.put('/:id/complete', protect, authorize('technician'), async (req, res) => {
  try {
    const { id } = req.params;
    const { actualDuration, actualCost } = req.body;
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    // Check if technician is assigned to this booking
    if (booking.assignedTechnician.toString() !== req.user._id.toString()) {
      return badRequestResponse(res, 'You are not assigned to this booking');
    }
    
    await booking.complete(actualDuration, actualCost);
    
    successResponse(res, booking, 'Booking completed successfully');
  } catch (error) {
    console.error('Complete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete booking',
      error: error.message
    });
  }
});

// @desc    Cancel booking
// @route   PUT /api/booking/:id/cancel
// @access  Private/Admin
router.put('/:id/cancel', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, refundAmount } = req.body;
    
    if (!reason) {
      return badRequestResponse(res, 'Cancellation reason is required');
    }
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    await booking.cancel(reason, 'company', refundAmount);
    
    successResponse(res, booking, 'Booking cancelled successfully');
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// @desc    Reschedule booking
// @route   PUT /api/booking/:id/reschedule
// @access  Private/Admin
router.put('/:id/reschedule', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime } = req.body;
    
    if (!newDate) {
      return badRequestResponse(res, 'New date is required');
    }
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    await booking.reschedule(newDate, newTime);
    
    successResponse(res, booking, 'Booking rescheduled successfully');
  } catch (error) {
    console.error('Reschedule booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reschedule booking',
      error: error.message
    });
  }
});

// @desc    Add feedback to booking
// @route   POST /api/booking/:id/feedback
// @access  Public
router.post('/:id/feedback', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return badRequestResponse(res, 'Valid rating (1-5) is required');
    }
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    await booking.addFeedback(rating, comment);
    
    successResponse(res, booking, 'Feedback submitted successfully');
  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
});

// @desc    Upload attachments to booking
// @route   POST /api/booking/:id/attachments
// @access  Private/Admin
router.post('/:id/attachments', protect, authorize('admin'), uploadAttachments, handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.files || req.files.length === 0) {
      return badRequestResponse(res, 'No files provided');
    }
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return notFoundResponse(res, 'Booking not found');
    }
    
    const attachments = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/attachments/${file.filename}`,
      size: file.size
    }));
    
    booking.attachments.push(...attachments);
    await booking.save();
    
    successResponse(res, booking, 'Attachments uploaded successfully');
  } catch (error) {
    console.error('Upload attachments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload attachments',
      error: error.message
    });
  }
});

// @desc    Get pending bookings (Admin only)
// @route   GET /api/booking/pending
// @access  Private/Admin
router.get('/pending', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.findPending();
    const total = bookings.length;
    const paginatedBookings = bookings.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedBookings, page, limit, total, 'Pending bookings retrieved successfully');
  } catch (error) {
    console.error('Get pending bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve pending bookings',
      error: error.message
    });
  }
});

// @desc    Get confirmed bookings (Admin only)
// @route   GET /api/booking/confirmed
// @access  Private/Admin
router.get('/confirmed', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.findConfirmed();
    const total = bookings.length;
    const paginatedBookings = bookings.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedBookings, page, limit, total, 'Confirmed bookings retrieved successfully');
  } catch (error) {
    console.error('Get confirmed bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve confirmed bookings',
      error: error.message
    });
  }
});

// @desc    Get bookings by date range (Admin only)
// @route   GET /api/booking/date-range
// @access  Private/Admin
router.get('/date-range', protect, authorize('admin'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return badRequestResponse(res, 'Start date and end date are required');
    }
    
    const bookings = await Booking.findByDateRange(new Date(startDate), new Date(endDate));
    
    successResponse(res, bookings, 'Bookings retrieved successfully');
  } catch (error) {
    console.error('Get bookings by date range error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings by date range',
      error: error.message
    });
  }
});

// @desc    Get bookings by technician (Admin only)
// @route   GET /api/booking/technician/:technicianId
// @access  Private/Admin
router.get('/technician/:technicianId', protect, authorize('admin'), async (req, res) => {
  try {
    const { technicianId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.findByTechnician(technicianId);
    const total = bookings.length;
    const paginatedBookings = bookings.slice(skip, skip + limit);
    
    paginatedResponse(res, paginatedBookings, page, limit, total, 'Technician bookings retrieved successfully');
  } catch (error) {
    console.error('Get technician bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve technician bookings',
      error: error.message
    });
  }
});

// @desc    Get overdue bookings (Admin only)
// @route   GET /api/booking/overdue
// @access  Private/Admin
router.get('/overdue', protect, authorize('admin'), async (req, res) => {
  try {
    const bookings = await Booking.findOverdue();
    
    successResponse(res, bookings, 'Overdue bookings retrieved successfully');
  } catch (error) {
    console.error('Get overdue bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve overdue bookings',
      error: error.message
    });
  }
});

module.exports = router; 