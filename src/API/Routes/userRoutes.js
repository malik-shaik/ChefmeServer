const router = require('express').Router();
const authorisation = require('../../Middlewares/authorisation');
const {
  loginValidationFields,
  userProfileUpdateFields,
} = require('../../Helpers');

const {
  facebookAuthAction,
  getUserByIdAction,
  loginAction,
  profileEditAction,
} = require('../Controllers/userController');

/* USER ROUTES */
router.get('/userById', authorisation, getUserByIdAction);

router.post('/login', loginValidationFields, loginAction);

router.post('/facebookauth', facebookAuthAction);

router.patch(
  '/profile/edit',
  authorisation,
  userProfileUpdateFields,
  profileEditAction
);

module.exports = router;
