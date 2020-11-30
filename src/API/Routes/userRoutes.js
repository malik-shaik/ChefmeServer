const router = require('express').Router();
const authorisation = require('../../Middlewares/authorisation');
const {
  facebookAuthAction,
  getUserByIdAction,
  loginAction,
  profileEditAction,
} = require('../Controllers/userController');

/* USER ROUTES */
router.get('/userById', authorisation, getUserByIdAction);

router.post('/login', loginAction);

router.post('/facebookauth', facebookAuthAction);

router.post('/profile/edit', profileEditAction);

module.exports = router;
