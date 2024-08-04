const { MethodNotAllowedError } = require('../errors');

const methodNotAllowedHandler = (req, res) => {
  throw new MethodNotAllowedError(
    `The endpoint '${req.originalUrl}' does not support '${req.method}' method.`,
  );
};

module.exports = methodNotAllowedHandler;
