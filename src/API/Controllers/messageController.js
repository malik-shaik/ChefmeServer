const {
  getMessageByIdService,
  getMessagesByUserIdService,
} = require('../Services/messageServices');
const { status_codes } = require('../../Constants');

const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET MESSAGE BY ID ACTION
module.exports.getMessageByIdAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { userId: chefId } = req;
    const { messageId } = req.params;
    const data = await getMessageByIdService({ chefId, messageId });
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};

// ####################################################################
// GET ALL ORDER BY USER ID ACTION
module.exports.getMessagesByUserIdAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { type } = req.params;
    const { userId: chefId } = req;
    const data = await getMessagesByUserIdService(chefId, type);
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};
