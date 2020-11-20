const {
  getTimeStamp,
  getCurrentTimeStamp,
  getCurrentDateTimeReadable,
} = require('../../utils');

const {
  getOrderById,
  getOrderByChefIdAndToken,
  createThreadMessage,
  updateThread,
  updateOrder,
} = require('../../Database/Queries');

// ##########################################################################
// GET ORDER BY ID SERVICE
module.exports.getOrderByIdService = async ({ chefId, orderId }) => {
  try {
    const order = await getOrderById(orderId);
    // console.log(order);
    // if (order.chefId !== chefId) throw new Error('Wrong order.');
    return order;
  } catch (error) {
    console.log('ErrorIn: getOrderByIdService :', error);
    throw new Error(error.message);
  }
};

// ##########################################################################
// ORDER REQUEST EDIT SERVICE
module.exports.orderRequestEditService = async (chefId, request) => {
  try {
    // TODO: refactor this
    const orderToken = 'JONDE';
    chefId = 2125;
    // const date = '2020-12-28';
    // const time = '11:30';
    // const people = 4;
    // const budget = 400;
    const userIp = request.ip;
    // above values come from request
    // const feePercentage = 0.17;

    const order = await getOrderByChefIdAndToken(chefId, orderToken);
    const {
      id: orderId,
      live,
      thread_id,
      token,
      people_num,
      // budget,
      date,
      dinner_time: time,
    } = order;

    const editOrder = {
      people: 4,
      budget: 400,
    };

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
      status: 'accepted',
      status_change: getCurrentTimeStamp(),
      date,
      date_stamp: getTimeStamp(date),
      time_to_date: getTimeStamp(date) - getCurrentTimeStamp(),
      dinner_time: time,
      dinner_time_stamp: getTimeStamp(date, time),
      people_num,
    };

    await updateOrder(orderId, updateOrderFields);
    // console.log(result);

    return 'Order successfully accepted';
  } catch (error) {
    console.log('ErrorIn: orderRequestEditService :', error);
    throw new Error(error.message);
  }
};
