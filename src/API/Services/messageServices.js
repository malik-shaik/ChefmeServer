const { getMessageById, getMessagesByChefId } = require('../../Database/Queries');

// ##########################################################################
// GET MESSAGE BY ID SERVICE
module.exports.getMessageByIdService = async ({ chefId, messageId }) => {
  try {
    const message = await getMessageById(messageId);
    // console.log(message);
    // if (message.chefId !== chefId) throw new Error('An error occured. Order is missing.');
    return message;
  } catch (error) {
    console.log('ErrorIn: getMessageByIdService :', error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// GET ALL MESSAGES BY CHEFID SERVICE
module.exports.getMessagesByUserIdService = async (chefId) => {
  try {
    const messages = await getMessagesByChefId(chefId);
    return messages;
  } catch (error) {
    console.log('ErrorIn: getMessagesByUserIdService :', error);
    throw new Error(error.message);
  }
};
