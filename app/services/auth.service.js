const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User } = require('../models');
const {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../errors');

const signUp = async (firstName, lastName, email, password) => {
  const currentUser = await User.findOne({ email });

  if (currentUser) {
    throw new ConflictError('This email address is already in use.');
  }

  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signIn = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendPasswordResetOTP = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError(
      'This email address is not associated with any user.',
    );
  }

  const passwordResetOTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Reset your STEPx3 account password',
    text: `Password reset OTP: ${passwordResetOTP}`,
  };

  await transporter.sendMail(mailOptions);

  user.passwordResetOTP = passwordResetOTP;
  user.passwordResetOTPExpires =
    Date.now() + process.env.PASSWORD_RESET_OTP_EXPIRES_IN * 60 * 1000;

  await user.save();
};

const verifyPasswordResetOTP = async (email, passwordResetOTP) => {
  const user = await User.findOne({
    email,
    passwordResetOTP,
    passwordResetOTPExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ForbiddenError('Invalid email or password reset OTP.');
  }

  const passwordResetToken = crypto.randomBytes(32).toString('hex');

  user.passwordResetOTP = null;
  user.passwordResetOTPExpires = null;

  user.passwordResetToken = passwordResetToken;
  user.passwordResetTokenExpires =
    Date.now() + process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN * 60 * 1000;

  await user.save();

  return passwordResetToken;
};

const resetPassword = async (email, passwordResetToken, password) => {
  const user = await User.findOne({
    email,
    passwordResetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ForbiddenError('Invaild email or password rest token.');
  }

  user.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());

  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;

  await user.save();
};

module.exports = {
  signUp,
  signIn,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resetPassword,
};
