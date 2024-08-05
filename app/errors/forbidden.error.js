const HttpError = require('./http.error');

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden.') {
    super(403, message);
  }
}

module.exports = ForbiddenError;
