const joi = require('joi');

const signUpSchema = joi.object({
  firstName: joi.string().max(32).trim().required(),
  lastName: joi.string().max(32).trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(64).required(),
});

const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const sendPasswordResetOTPSchema = joi.object({
  email: joi.string().email().required(),
});

const verifyPasswordResetOTPSchema = joi.object({
  email: joi.string().email().required(),
  passwordResetOTP: joi.string().required(),
});

const resetPasswordSchema = joi.object({
  email: joi.string().email().required(),
  passwordResetToken: joi.string().required(),
  password: joi.string().min(8).max(64).required(),
});

module.exports = {
  signUpSchema,
  signInSchema,
  sendPasswordResetOTPSchema,
  verifyPasswordResetOTPSchema,
  resetPasswordSchema,
};
