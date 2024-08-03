const HttpError = require('./http.error');

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request.', details) {
    super(400, message);

    this.details = details;
  }
}

module.exports = BadRequestError;
