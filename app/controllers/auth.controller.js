const { authService } = require('../services');
const { catchAsync } = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const token = await authService.signUp(firstName, lastName, email, password);

  res.status(201).json({
    success: true,
    data: {
      token,
    },
  });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.signIn(email, password);

  res.status(200).json({
    success: true,
    data: {
      token,
    },
  });
});

const sendPasswordResetOTP = catchAsync(async (req, res) => {
  const { email } = req.body;

  await authService.sendPasswordResetOTP(email);

  res.json({
    success: true,
  });
});

const verifyPasswordResetOTP = catchAsync(async (req, res) => {
  const { email, passwordResetOTP } = req.body;

  const passwordResetToken = await authService.verifyPasswordResetOTP(
    email,
    passwordResetOTP,
  );

  res.json({
    success: true,
    data: {
      passwordResetToken,
    },
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, passwordResetToken, password } = req.body;

  await authService.resetPassword(email, passwordResetToken, password);

  res.json({
    success: true,
  });
});

module.exports = {
  signUp,
  signIn,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resetPassword,
};
