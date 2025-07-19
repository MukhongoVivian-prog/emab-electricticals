// Success response wrapper
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

// Error response wrapper
const errorResponse = (res, message = 'Error occurred', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
};

// Pagination response wrapper
const paginatedResponse = (res, data, page, limit, total, message = 'Data retrieved successfully') => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null
    },
    timestamp: new Date().toISOString()
  });
};

// Created response (201)
const createdResponse = (res, data, message = 'Resource created successfully') => {
  return successResponse(res, data, message, 201);
};

// No content response (204)
const noContentResponse = (res) => {
  return res.status(204).send();
};

// Bad request response (400)
const badRequestResponse = (res, message = 'Bad request', errors = null) => {
  return errorResponse(res, message, 400, errors);
};

// Unauthorized response (401)
const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return errorResponse(res, message, 401);
};

// Forbidden response (403)
const forbiddenResponse = (res, message = 'Forbidden') => {
  return errorResponse(res, message, 403);
};

// Not found response (404)
const notFoundResponse = (res, message = 'Resource not found') => {
  return errorResponse(res, message, 404);
};

// Conflict response (409)
const conflictResponse = (res, message = 'Resource conflict') => {
  return errorResponse(res, message, 409);
};

// Validation error response (422)
const validationErrorResponse = (res, errors, message = 'Validation failed') => {
  return errorResponse(res, message, 422, errors);
};

// Rate limit response (429)
const rateLimitResponse = (res, message = 'Too many requests') => {
  return errorResponse(res, message, 429);
};

// Internal server error response (500)
const serverErrorResponse = (res, message = 'Internal server error') => {
  return errorResponse(res, message, 500);
};

// Service unavailable response (503)
const serviceUnavailableResponse = (res, message = 'Service temporarily unavailable') => {
  return errorResponse(res, message, 503);
};

// Custom response with metadata
const customResponse = (res, data, metadata = {}, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    metadata,
    timestamp: new Date().toISOString()
  });
};

// File upload response
const fileUploadResponse = (res, files, message = 'Files uploaded successfully') => {
  const uploadedFiles = Array.isArray(files) ? files : [files];
  
  return successResponse(res, {
    files: uploadedFiles.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${file.destination.split('/').pop()}/${file.filename}`
    })),
    count: uploadedFiles.length
  }, message);
};

// Search response with filters
const searchResponse = (res, data, query, filters = {}, total = 0, message = 'Search completed') => {
  return successResponse(res, {
    results: data,
    search: {
      query,
      filters,
      totalResults: total
    }
  }, message);
};

// Bulk operation response
const bulkOperationResponse = (res, results, message = 'Bulk operation completed') => {
  const successful = results.filter(result => result.success);
  const failed = results.filter(result => !result.success);
  
  return successResponse(res, {
    total: results.length,
    successful: successful.length,
    failed: failed.length,
    results: {
      successful,
      failed
    }
  }, message);
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  validationErrorResponse,
  rateLimitResponse,
  serverErrorResponse,
  serviceUnavailableResponse,
  customResponse,
  fileUploadResponse,
  searchResponse,
  bulkOperationResponse
}; 