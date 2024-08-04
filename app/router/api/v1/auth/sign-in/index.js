const { Router } = require('express');
const { authValidations } = require('../../../../../validations');
const { validate } = require('../../../../../middelwares');
const { authController } = require('../../../../../controllers');
const { methodNotAllowedHandler } = require('../../../../../handlers');

const router = Router();

router
  .route('/')
  .post(validate(authValidations.signInSchema), authController.signIn);

router.use(methodNotAllowedHandler);

module.exports = router;
