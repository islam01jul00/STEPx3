const HttpError = require('./http.error');

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized.') {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
