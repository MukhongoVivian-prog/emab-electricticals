const { validationResult, body } = require('express-validator');

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Validation rules for user registration
const registerValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number')
];

// Validation rules for user login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for contact form
const contactValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
  
  body('serviceType')
    .optional()
    .isIn(['general', 'residential', 'commercial', 'industrial', 'emergency', 'other'])
    .withMessage('Invalid service type'),
  
  body('urgency')
    .optional()
    .isIn(['low', 'medium', 'high', 'emergency'])
    .withMessage('Invalid urgency level')
];

// Validation rules for booking form
const bookingValidation = [
  body('customer.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ max: 100 })
    .withMessage('Full name cannot exceed 100 characters'),
  
  body('customer.email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('customer.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  
  body('service.type')
    .notEmpty()
    .withMessage('Service type is required')
    .isIn(['residential', 'commercial', 'industrial', 'emergency', 'installation', 'maintenance', 'inspection', 'upgrade', 'other'])
    .withMessage('Invalid service type'),
  
  body('service.description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ max: 1000 })
    .withMessage('Service description cannot exceed 1000 characters'),
  
  body('scheduling.preferredDate')
    .notEmpty()
    .withMessage('Preferred date is required')
    .isISO8601()
    .withMessage('Please enter a valid date'),
  
  body('scheduling.preferredTime')
    .optional()
    .isIn(['morning', 'afternoon', 'evening', 'flexible'])
    .withMessage('Invalid preferred time')
];

// Validation rules for quote form
const quoteValidation = [
  body('customer.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ max: 100 })
    .withMessage('Full name cannot exceed 100 characters'),
  
  body('customer.email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('project.type')
    .notEmpty()
    .withMessage('Project type is required')
    .isIn(['residential', 'commercial', 'industrial', 'emergency', 'installation', 'maintenance', 'inspection', 'upgrade', 'other'])
    .withMessage('Invalid project type'),
  
  body('project.description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ max: 2000 })
    .withMessage('Project description cannot exceed 2000 characters'),
  
  body('project.scope')
    .optional()
    .isIn(['small', 'medium', 'large', 'custom'])
    .withMessage('Invalid project scope'),
  
  body('project.urgency')
    .optional()
    .isIn(['normal', 'urgent', 'emergency'])
    .withMessage('Invalid urgency level'),
  
  body('project.timeline')
    .optional()
    .isIn(['asap', 'within-week', 'within-month', 'flexible'])
    .withMessage('Invalid timeline')
];

// Validation rules for blog creation/update
const blogValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Blog title is required')
    .isLength({ max: 200 })
    .withMessage('Blog title cannot exceed 200 characters'),
  
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Blog excerpt is required')
    .isLength({ max: 500 })
    .withMessage('Blog excerpt cannot exceed 500 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Blog content is required'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['safety', 'education', 'technology', 'troubleshooting', 'energy', 'commercial', 'residential', 'industrial', 'emergency'])
    .withMessage('Invalid category'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Tag cannot exceed 30 characters'),
  
  body('featuredImage')
    .trim()
    .notEmpty()
    .withMessage('Featured image is required')
    .isURL()
    .withMessage('Please enter a valid image URL'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean')
];

// Validation rules for service creation/update
const serviceValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ max: 100 })
    .withMessage('Service name cannot exceed 100 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Service category is required')
    .isIn(['residential', 'commercial', 'industrial', 'emergency'])
    .withMessage('Invalid service category'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ max: 1000 })
    .withMessage('Service description cannot exceed 1000 characters'),
  
  body('longDescription')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Long description cannot exceed 5000 characters'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('features.*.title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Feature title is required')
    .isLength({ max: 100 })
    .withMessage('Feature title cannot exceed 100 characters'),
  
  body('features.*.description')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Feature description cannot exceed 300 characters'),
  
  body('pricing.type')
    .optional()
    .isIn(['fixed', 'hourly', 'quote', 'custom'])
    .withMessage('Invalid pricing type'),
  
  body('pricing.basePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  
  body('pricing.hourlyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  contactValidation,
  bookingValidation,
  quoteValidation,
  blogValidation,
  serviceValidation
}; 