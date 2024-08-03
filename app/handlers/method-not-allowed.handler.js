const { MethodNotAllowedError } = require('../errors');

const methodNotAllowedHandler = (req, res) => {
  throw new MethodNotAllowedError(
    `This endpoint '${req.originalUrl}' does not support '${req.method}' method.`,
  );
};

module.exports = methodNotAllowedHandler;
