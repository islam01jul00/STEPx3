const joi = require('joi');

const signUpSchema = joi.object({
  firstName: joi.string().max(32).trim().required(),
  lastName: joi.string().max(32).trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(64).required(),
});

module.exports = { signUpSchema };
