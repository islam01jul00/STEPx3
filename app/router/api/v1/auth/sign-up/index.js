const { Router } = require('express');
const { authValidations } = require('../../../../../validations');
const { validate } = require('../../../../../middelwares');
const { authController } = require('../../../../../controllers');
const { methodNotAllowedHandler } = require('../../../../../handlers');

const router = Router();

router
  .route('/')
  .post(validate(authValidations.signUpSchema), authController.signUp);

router.use(methodNotAllowedHandler);

module.exports = router;
