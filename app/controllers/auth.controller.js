const { authService } = require('../services');
const { catchAsync } = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const token = await authService.signUp(firstName, lastName, email, password);

  res.status(201).json({
    data: {
      token,
    },
  });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.signIn(email, password);

  res.status(200).json({
    data: {
      token,
    },
  });
});

module.exports = { signUp, signIn };
