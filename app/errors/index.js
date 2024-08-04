const HttpError = require('./http.error');
const BadRequestError = require('./bad-request.error');
const UnauthorizedError = require('./unauthorized.error');
const NotFoundError = require('./not-found.error');
const MethodNotAllowedError = require('./method-not-allowed.error');
const ConflictError = require('./conflict.error');

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
};
