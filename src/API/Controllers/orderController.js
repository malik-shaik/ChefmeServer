const {
  getOrderByTokenService,
  getOrdersByUserIdService,
  orderRequestRejectService,
  orderRequestEditService,
} = require('../Services/orderServices');
const { status_codes } = require('../../Constants');

const { SUCCESS, FAILED } = status_codes;

// ####################################################################
// GET ORDER BY ID ACTION
module.exports.getOrderByTokenAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { userId: chefId } = req;
    const { orderToken } = req.params;
    const data = await getOrderByTokenService(chefId, orderToken);
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};

// ####################################################################
// GET ALL ORDER BY USER ID ACTION
module.exports.getOrdersByUserIdAction = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { userId: chefId } = req;
    const data = await getOrdersByUserIdService(chefId);
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};

// ####################################################################
// ORDER REQUEST ACCEPT, EDIT ACTION
module.exports.orderRequestEditAciton = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { userId: chefId } = req;
    const data = await orderRequestEditService(chefId, req);
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};

// ####################################################################
// ORDER REQUEST REJECT ACTION
module.exports.orderRequestRejectAciton = async (req, res, next) => {
  try {
    if (req.err) throw new Error(req.err);
    const { userId: chefId } = req;
    const data = await orderRequestRejectService(chefId, req);
    next({ status: SUCCESS, data });
  } catch (error) {
    next({ status: FAILED, message: error.message });
  }
};
