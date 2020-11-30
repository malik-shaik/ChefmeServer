const {
  getTimeStamp,
  getCurrentTimeStamp,
  getCurrentDateTimeReadable,
} = require('../../utils');

const {
  getOrderByChefIdAndToken,
  createThreadMessage,
  updateThread,
  updateOrder,
} = require('../../Database/Queries');

// ##########################################################################
// GET ORDER BY ID SERVICE
module.exports.getOrderByTokenService = async ({ chefId, orderToken }) => {
  try {
    const order = await getOrderByChefIdAndToken(chefId, orderToken);
    if (order.chef_id !== chefId) throw new Error('Wrong order.');
    return order;
  } catch (error) {
    console.log('ErrorIn: getOrderByTokenService :', error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// ORDER REQUEST EDIT SERVICE
module.exports.orderRequestEditService = async (chefId, request) => {
  try {
    // TODO: refactor this
    const orderToken = 'ZEWLB';
    // chefId = 2981;
    const userIp = request.ip;

    const order = await getOrderByChefIdAndToken(chefId, orderToken);
    const {
      id: orderId,
      live,
      thread_id,
      token,
      people_num,
      budget,
      date,
      dinner_time: time,
    } = order;

    const price_food_per_person = budget;
    const price_food_total = budget * people_num;
    const price_food_fee_percentage = 17;
    const pay_total = budget * people_num;

    const messageId = await createThreadMessage(
      getCurrentTimeStamp(),
      getCurrentDateTimeReadable(),
      live,
      thread_id,
      token,
      'order_edit_chef',
      chefId,
      userIp
    );

    const fields = {
      last_message_id: messageId,
      last_message_by_user_id: chefId,
      last_message_time_stamp: getCurrentTimeStamp(),
    };

    await updateThread(thread_id, fields);

    const updateOrderFields = {
      // status: 'confirmed',
      status: 'accepted',
      status_change: getCurrentTimeStamp(),
      accepted: getCurrentTimeStamp(),
      offer_given: getCurrentTimeStamp(),
      chef_respond_time: getCurrentTimeStamp(),
      date,
      date_stamp: getTimeStamp(date),
      time_to_date: getTimeStamp(date) - getCurrentTimeStamp(),
      dinner_time: time,
      dinner_time_stamp: getTimeStamp(date, time),
      people_num,
      budget,
      price_food_per_person,
      price_food_total,
      price_food_fee_percentage,
      pay_total,
    };

    await updateOrder(orderId, updateOrderFields);
    // console.log(result);

    return 'Order successfully accepted';
  } catch (error) {
    console.log('ErrorIn: orderRequestEditService :', error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// ORDER REQUEST REJECT SERVICE
module.exports.orderRequestRejectService = async (chefId, request) => {
  try {
    // TODO: refactor this
    const orderToken = 'GSTBJ';
    // chefId = 2981;
    const userIp = request.ip;
    const reason = 'Busy';
    const reason_other = null;

    const order = await getOrderByChefIdAndToken(chefId, orderToken);
    const {
      id: orderId,
      live,
      thread_id,
      token,
      people_num,
      budget,
      date,
      dinner_time: time,
    } = order;

    const updateOrderFields = {
      last_updated: getCurrentTimeStamp(),
      status_change: getCurrentTimeStamp(),
      status: 'rejected',
      rejected: getCurrentTimeStamp(),
      cancelled_by: 'chef',
      cancelled_by_user_id: chefId,
      cancelled_reason: reason,
      cancelled_reason_other: reason_other,
    };

    await updateOrder(orderId, updateOrderFields);

    const messageId = await createThreadMessage(
      getCurrentTimeStamp(),
      getCurrentDateTimeReadable(),
      live,
      thread_id,
      token,
      'order_rejected',
      chefId,
      userIp
    );

    const fields = {
      last_message_id: messageId,
      last_message_by_user_id: chefId,
      last_message_time_stamp: getCurrentTimeStamp(),
    };

    await updateThread(thread_id, fields);

    return order;
  } catch (error) {
    console.log('ErrorIn: orderRequestRejectService :', error);
    throw new Error(error.message);
  }
};
