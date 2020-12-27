const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../Config');

// ##########################################################################
// CREATES JSON WEB TOKEN
module.exports.createJWT = (userId) =>
  JWT.sign({ userId }, JWT_SECRET, { expiresIn: 360000 });

// ##########################################################################
// CHECK THE PASSWORD
module.exports.checkPassword = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword.replace('$2y$', '$2a$')); // for checking the php bcrypt password

// ##########################################################################
// LOGIN VALID FIELDS
module.exports.loginValidationFields = [
  body('email', 'Please enter valid email').isEmail(),
  body('password', 'Please enter password with 4 or more charecters').isLength({
    min: 4,
  }),
];

// ##########################################################################
// USER PROFILE UPDATE VALID FIELDS
module.exports.userProfileUpdateFields = [
  body('firstname', 'Firstname must be 2 or more charecters').isLength({
    min: 2,
  }),
  body('lastname', 'Lastname must be 2 or more charecters').isLength({
    min: 2,
  }),
  body('email', 'Invalid email').isEmail(),
  body('phone', 'Invalid phone number')
    .isNumeric()
    .isLength({ min: 8, max: 8 }),
  body('street', 'Street must be 2 or more charecters').isLength({
    min: 2,
  }),
  body('city', 'City must be 2 or more charecters').isLength({
    min: 2,
  }),
  body('postal', 'Invalid postal code')
    .isNumeric()
    .isLength({ min: 4, max: 4 }),
];

// ##########################################################################
// VALIDATION
module.exports.validateData = (data) => validationResult(data);
