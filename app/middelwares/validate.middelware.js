const { BadRequestError } = require('../errors');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const details = error.details.map(({ message, path }) => ({
      message,
      path,
    }));

    throw new BadRequestError(
      'This request body contains invalid data.',
      details,
    );
  }

  next();
};

module.exports = validate;
