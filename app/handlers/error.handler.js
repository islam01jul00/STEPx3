const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message, details } = error;

  res.status(statusCode).json({
    message,
    details,
  });
};

module.exports = errorHandler;
