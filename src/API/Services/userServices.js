const Query = require('../../Database/Queries');
const helperMethods = require('../../Helpers');

// ##########################################################################
// GET USER BY ID SERVICE
module.exports.getUserByIdService = async (id) => {
  try {
    const user = await Query.getUserById(id);
    if (!user) throw new Error('User does not exist.');
    user.password = undefined;

    const token = helperMethods.createJWT(id);
    return { user, token };
  } catch (error) {
    console.log('ErrorIn: getUserByIdService :', error);
    throw new Error(error.message);
  }
};

// ###########################################################################
// LOGIN SERVICE
module.exports.loginService = async (data) => {
  try {
    const user = await Query.getUserByEmail(data.email);
    if (!user) throw new Error('User does not exist. Please signup.');

    const passwordMatch = await helperMethods.checkPassword(
      data.password,
      user.password
    );
    if (!passwordMatch) throw new Error('Invalid credentials.');

    user.password = undefined;
    const token = helperMethods.createJWT(user.id);

    return { user, token };
  } catch (error) {
    console.log('ErrorIn: loginService :', error);
    throw new Error(error.message);
  }
};

// ###########################################################################
// FACEBOOK AUTH SERVICE
module.exports.facebookAuthService = async (data) => {
  try {
    // TODO: Check documentation for facebook Mapping Users Across Apps and Pages

    // FIXME: fix the facebook auth issue

    console.log(data);
    const user = await Query.getUserByFacebookId(parseInt(data.id));
    if (!user) throw new Error('User does not exist. Please register.');
    return user;
  } catch (error) {
    console.log('ErrorIn: facebookAuthService :', error);
    throw new Error(error.message);
  }
};
