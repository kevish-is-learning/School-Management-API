const AppError = require("../utils/appError");

function notFoundHandler(req, _res, next) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  const details = error.details || null;

  if (statusCode >= 500) {
    console.error("Unhandled error:", error);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: statusCode,
      details
    }
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
