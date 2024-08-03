const HttpError = require('./http.error');

class MethodNotAllowedError extends HttpError {
  constructor(message = 'Method not Allowed.') {
    super(405, message);
  }
}

module.exports = MethodNotAllowedError;
