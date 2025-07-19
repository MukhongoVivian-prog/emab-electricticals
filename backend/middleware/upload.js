const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create subdirectories based on file type
    let uploadPath = uploadDir;
    
    if (file.fieldname === 'avatar') {
      uploadPath = path.join(uploadDir, 'avatars');
    } else if (file.fieldname === 'blogImage' || file.fieldname === 'featuredImage') {
      uploadPath = path.join(uploadDir, 'blog');
    } else if (file.fieldname === 'serviceImage') {
      uploadPath = path.join(uploadDir, 'services');
    } else if (file.fieldname === 'attachment') {
      uploadPath = path.join(uploadDir, 'attachments');
    } else {
      uploadPath = path.join(uploadDir, 'general');
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    
    // Sanitize filename
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedDocumentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  // Check file type based on field name
  if (file.fieldname === 'avatar' || file.fieldname === 'blogImage' || file.fieldname === 'featuredImage' || file.fieldname === 'serviceImage') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed'), false);
    }
  } else if (file.fieldname === 'attachment') {
    if (allowedImageTypes.includes(file.mimetype) || allowedDocumentTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image and document files are allowed'), false);
    }
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 10 // Maximum 10 files
  }
});

// Specific upload configurations
const uploadAvatar = upload.single('avatar');
const uploadBlogImage = upload.single('featuredImage');
const uploadServiceImage = upload.single('serviceImage');
const uploadAttachments = upload.array('attachments', 5); // Max 5 attachments
const uploadMultipleImages = upload.array('images', 10); // Max 10 images

// Middleware to handle upload errors
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files. Maximum is 10 files.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        error: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('Only image files')) {
    return res.status(400).json({
      success: false,
      error: 'Only image files (JPEG, PNG, WebP, GIF) are allowed.'
    });
  }
  
  if (error.message.includes('Only image and document files')) {
    return res.status(400).json({
      success: false,
      error: 'Only image and document files are allowed.'
    });
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type.'
    });
  }
  
  next(error);
};

// Helper function to delete file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Helper function to get file URL
const getFileUrl = (filename, type = 'general') => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  return `${baseUrl}/uploads/${type}/${filename}`;
};

// Helper function to validate file size
const validateFileSize = (file, maxSize = 5 * 1024 * 1024) => {
  return file.size <= maxSize;
};

// Helper function to validate image dimensions
const validateImageDimensions = (file, maxWidth = 1920, maxHeight = 1080) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.width <= maxWidth && img.height <= maxHeight) {
        resolve(true);
      } else {
        reject(new Error(`Image dimensions must be ${maxWidth}x${maxHeight} or smaller`));
      }
    };
    img.onerror = () => reject(new Error('Invalid image file'));
    img.src = file.path;
  });
};

module.exports = {
  upload,
  uploadAvatar,
  uploadBlogImage,
  uploadServiceImage,
  uploadAttachments,
  uploadMultipleImages,
  handleUploadError,
  deleteFile,
  getFileUrl,
  validateFileSize,
  validateImageDimensions
}; 