const { validateData } = require('../../Helpers');
const {
  facebookAuthService,
  getUserByIdService,
  loginService,
  profileEditService,
} = require('../Services/userServices');
// const { status_codes } = require('../../Constants');

// const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET USER BY ID ACTION
module.exports.getUserByIdAction = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = await getUserByIdService(req.userId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// ##########################################################################
// LOGIN ACTION
module.exports.loginAction = async (req, res) => {
  try {
    const errors = validateData(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const data = await loginService(req.body);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// ##########################################################################
// FACEBOOK AUTH ACTION
module.exports.facebookAuthAction = async (req, res) => {
  try {
    const data = await facebookAuthService(req.body);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// ##########################################################################
// USER PROFILE EDIT ACTION
module.exports.profileEditAction = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const errors = validateData(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const data = await profileEditService(req.userId, req.body);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
