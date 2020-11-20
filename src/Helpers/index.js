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
