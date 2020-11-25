const {
  getTotalEarned,
  getFutureAmout,
  getFuturePayments,
} = require('../../Database/Queries');

// ##########################################################################
// GET TOTAL EARNED SERVICE
module.exports.getTotalEarnedService = async (chefId) => {
  try {
    chefId = 2981;
    const totalEarned = await getTotalEarned(chefId);
    const futureAmount = await getFutureAmout(chefId);
    const futurePayments = await getFuturePayments(chefId);
    return { totalEarned, futureAmount, futurePayments };
  } catch (error) {
    console.log('ErrorIn: getTotalEarnedService :', error);
    throw new Error(error.message);
  }
};
