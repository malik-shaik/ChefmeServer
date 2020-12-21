const {
  facebookAuthService,
  getUserByIdService,
  loginService,
  profileEditService,
} = require('../Services/userServices');
const { status_codes } = require('../../Constants');

const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET USER BY ID ACTION
module.exports.getUserByIdAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = await getUserByIdService(req.userId);
    return res.status(200).send(data);
    // return next({ status: 200, data });
  } catch (error) {
    return res.status(400).send(error.message);
    // return next({ status: 400, message: error.message });
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

// ##########################################################################
// USER PROFILE EDIT ACTION
module.exports.profileEditAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = await profileEditService(req.userId, req.body);
    return next({ status: SUCCESS, data });
  } catch (error) {
    return next({ status: FAILED, message: error.message });
  }
};
