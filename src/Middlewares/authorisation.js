const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config');

const authenticate = (req, res, next) => {
  const token = req.header('auth-token');
  try {
    if (!token) throw new Error();
    const decode = JWT.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    req.err = 'Authentication failed, please login and try again.';
    next();
  }
};

module.exports = authenticate;



