const { Router } = require('express');
const signUpRouter = require('./sign-up');
const signInRouter = require('./sign-in');
const sendPasswordResetOTPRouter = require('./send-password-reset-otp');
const verifyPasswordResetOTPRouter = require('./verify-password-reset-otp');
const resetPasswordRouter = require('./reset-password');

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/sign-in', signInRouter);
router.use('/send-password-reset-otp', sendPasswordResetOTPRouter);
router.use('/verify-password-reset-otp', verifyPasswordResetOTPRouter);
router.use('/reset-password', resetPasswordRouter);

module.exports = router;
