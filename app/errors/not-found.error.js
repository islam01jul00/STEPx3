const HttpError = require('./http.error');

class NotFoundError extends HttpError {
  constructor(message = 'Not found.') {
    super(404, message);
  }
}

module.exports = NotFoundError;
