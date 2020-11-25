const { getTotalEarnedService } = require('../Services/walletService');
const { status_codes } = require('../../Constants');

const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET WALLET INFO ACTION
module.exports.getWalletInfoAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = await getTotalEarnedService(req.userId);
    return next({ status: SUCCESS, data });
  } catch (error) {
    return next({ status: FAILED, message: error.message });
  }
};
