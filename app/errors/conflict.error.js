const HttpError = require('./http.error');

class ConflictError extends HttpError {
  constructor(message = 'Conflict.') {
    super(409, message);
  }
}

module.exports = ConflictError;
