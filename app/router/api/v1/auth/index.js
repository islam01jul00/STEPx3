const { Router } = require('express');
const signUpRouter = require('./sign-up');
const signInRouter = require('./sign-in');

const router = Router();

router.use('/sign-up', signUpRouter);
router.use('/sign-in', signInRouter);

module.exports = router;
