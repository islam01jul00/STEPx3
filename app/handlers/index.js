const errorHandler = require('./error.handler');
const notFoundHandler = require('./not-found.handler');
const methodNotAllowedHandler = require('./method-not-allowed.handler');

module.exports = {
  errorHandler,
  notFoundHandler,
  methodNotAllowedHandler,
};
