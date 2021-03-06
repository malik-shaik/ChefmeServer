const {
  getUserByEmail,
  getUserByFacebookId,
  getUserById,
  updateUser,
} = require('../../Database/Modals');
// const helperMethods = require('../../Helpers');
const { checkPassword, createJWT } = require('../../Helpers');

// ##########################################################################
// GET USER BY ID SERVICE
module.exports.getUserByIdService = async (id) => {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error('User does not exist.');
    user.password = undefined;

    const token = createJWT(id);
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
    const user = await getUserByEmail(data.email);
    if (!user) throw new Error('Invalid credentials.');

    const passwordMatch = await checkPassword(data.password, user.password);
    if (!passwordMatch) throw new Error('Invalid credentials.');

    user.password = undefined;
    const token = createJWT(user.id);

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

    // console.log(data);
    const user = await getUserByFacebookId(parseInt(data.id));
    if (!user) throw new Error('User does not exist. Please register.');
    return user;
  } catch (error) {
    console.log('ErrorIn: facebookAuthService :', error);
    throw new Error(error.message);
  }
};

// ###########################################################################
// USER EDIT SERVICE
module.exports.profileEditService = async (userId, data) => {
  try {
    await updateUser(userId, data);
    const user = await getUserByEmail(data.email);

    return { user, message: 'User updated successfully' };
  } catch (error) {
    console.log('ErrorIn: profileEditService :', error);
    throw new Error(error.message);
  }
};
