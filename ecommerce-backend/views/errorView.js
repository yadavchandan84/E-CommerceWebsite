export const renderErrorView = (error, statusCode = 500) => {
  return {
    error: 'Something went wrong!',
    message: error?.message || 'Internal server error',
    statusCode: statusCode,
    timestamp: new Date().toISOString()
  };
};

export const renderNotFoundView = () => {
  return {
    error: 'Not Found',
    message: 'The requested resource was not found',
    statusCode: 404,
    timestamp: new Date().toISOString()
  };
};

export const renderValidationErrorView = (message) => {
  return {
    error: 'Validation Error',
    message: message || 'Invalid request data provided',
    statusCode: 400,
    timestamp: new Date().toISOString()
  };
};

export const renderUnauthorizedView = () => {
  return {
    error: 'Unauthorized',
    message: 'You are not authorized to access this resource',
    statusCode: 401,
    timestamp: new Date().toISOString()
  };
};

export const renderForbiddenView = () => {
  return {
    error: 'Forbidden',
    message: 'Access to this resource is forbidden',
    statusCode: 403,
    timestamp: new Date().toISOString()
  };
};

export const renderTooManyRequestsView = (message) => {
  return {
    error: 'Too Many Requests',
    message: message || 'Rate limit exceeded. Please try again later.',
    statusCode: 429,
    timestamp: new Date().toISOString()
  };
};