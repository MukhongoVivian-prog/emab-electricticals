const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  successResponse, 
  notFoundResponse, 
  badRequestResponse,
  paginatedResponse
} = require('../utils/response');
const { uploadAvatar, handleUploadError } = require('../middleware/upload');
const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/user
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const query = {};
    
    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Filter by active status
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }
    
    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { lastName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    paginatedResponse(res, users, page, limit, total, 'Users retrieved successfully');
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/user/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return notFoundResponse(res, 'User not found');
    }
    
    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
});

// @desc    Update user (Admin only)
// @route   PUT /api/user/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, role, isActive, address, preferences } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      return notFoundResponse(res, 'User not found');
    }
    
    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (address) user.address = address;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    
    await user.save();
    
    successResponse(res, user, 'User updated successfully');
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/user/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return notFoundResponse(res, 'User not found');
    }
    
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return badRequestResponse(res, 'Cannot delete your own account');
    }
    
    await User.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

// @desc    Upload user avatar
// @route   POST /api/user/avatar
// @access  Private
router.post('/avatar', protect, uploadAvatar, handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return badRequestResponse(res, 'No image file provided');
    }
    
    const user = await User.findById(req.user.id);
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();
    
    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error.message
    });
  }
});

// @desc    Get active users (Admin only)
// @route   GET /api/user/active
// @access  Private/Admin
router.get('/active', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.findActive()
      .select('-password')
      .sort({ firstName: 1, lastName: 1 });
    
    successResponse(res, users, 'Active users retrieved successfully');
  } catch (error) {
    console.error('Get active users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve active users',
      error: error.message
    });
  }
});

// @desc    Get users by role (Admin only)
// @route   GET /api/user/role/:role
// @access  Private/Admin
router.get('/role/:role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const query = { role, isActive: true };
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ firstName: 1, lastName: 1 })
      .skip(skip)
      .limit(limit);
    
    paginatedResponse(res, users, page, limit, total, 'Users retrieved successfully');
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users by role',
      error: error.message
    });
  }
});

// @desc    Get technicians (Admin only)
// @route   GET /api/user/technicians
// @access  Private/Admin
router.get('/technicians', protect, authorize('admin'), async (req, res) => {
  try {
    const technicians = await User.find({ 
      role: { $in: ['technician', 'admin'] }, 
      isActive: true 
    })
    .select('firstName lastName email phone')
    .sort({ firstName: 1, lastName: 1 });
    
    successResponse(res, technicians, 'Technicians retrieved successfully');
  } catch (error) {
    console.error('Get technicians error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve technicians',
      error: error.message
    });
  }
});

// @desc    Update user preferences
// @route   PUT /api/user/preferences
// @access  Private
router.put('/preferences', protect, async (req, res) => {
  try {
    const { preferences } = req.body;
    
    const user = await User.findById(req.user.id);
    user.preferences = { ...user.preferences, ...preferences };
    await user.save();
    
    successResponse(res, user.preferences, 'Preferences updated successfully');
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message
    });
  }
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/user/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const stats = {
      total: totalUsers,
      active: activeUsers,
      verified: verifiedUsers,
      byRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };
    
    successResponse(res, stats, 'User statistics retrieved successfully');
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user statistics',
      error: error.message
    });
  }
});

module.exports = router; 