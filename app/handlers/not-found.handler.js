const { NotFoundError } = require('../errors');

const notFoundHandler = (req, res) => {
  throw new NotFoundError(`This endpoint '${req.originalUrl}' does not exsit.`);
};

module.exports = notFoundHandler;
