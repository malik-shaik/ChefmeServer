const {
  facebookAuthService,
  getUserByIdService,
  loginService,
} = require('../Services/userServices');
const { status_codes } = require('../../Constants');

const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET USER BY ID ACTION
module.exports.getUserByIdAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = await getUserByIdService(req.userId);
    return next({ status: SUCCESS, data });
  } catch (error) {
    return next({ status: FAILED, message: error.message });
  }
};

// ##########################################################################
// LOGIN ACTION
module.exports.loginAction = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    return next({ status: SUCCESS, data });
  } catch (error) {
    return next({ status: FAILED, message: error.message });
  }
};

// ##########################################################################
// FACEBOOK AUTH ACTION
module.exports.facebookAuthAction = async (req, res, next) => {
  try {
    const data = await facebookAuthService(req.body);
    return next({ status: SUCCESS, data });
  } catch (error) {
    return next({ status: FAILED, message: error.message });
  }
};
