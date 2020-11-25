const { QueryTypes } = require('sequelize');
const { db } = require('..');

const { SELECT, INSERT, UPDATE } = QueryTypes;

const runQuery = async (sql, bindParams, type = SELECT, options = null) => {
  const sql_mode =
    'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
  await db.query(`SET GLOBAL sql_mode="${sql_mode}"`);
  await db.query(`SET SESSION sql_mode="${sql_mode}"`);
  // await db.query(
  //   'SET GLOBAL sql_mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"'
  // );
  // await db.query(
  //   'SET SESSION sql_mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"'
  // );
  const results = await db.query(sql, { bind: { ...bindParams }, type });
  return options === 'all' ? results : results[0];
};

module.exports = {
  /* GET USER BY USER ID */
  getUserById: async (userId) => {
    const sql = 'SELECT * FROM `site_users` WHERE id = $userId';
    const bind = { userId };
    return await runQuery(sql, bind);
  },

  /* GET USER BY EMAIL */
  getUserByEmail: async (email) => {
    const sql = 'SELECT * FROM site_users WHERE email = $email';
    const bind = { email };
    return await runQuery(sql, bind);
  },

  /* GET MESSAGE BY MESSAGE ID */
  getMessageById: async (id) => {
    const sql = 'SELECT * FROM site_orders WHERE id = $id';
    const bind = { id };
    return await runQuery(sql, bind);
  },

  /* GET ALL MESSAGES BY CHEF ID */
  getMessagesByChefId: async (chefId) => {
    const sql =
      'SELECT threads.*, messages.type as last_message_type, messages.message as last_message, links.last_viewed_message_id, links.id as link_id, orders.status as order_status, orders.date as order_date, orders.people_num as order_people_num, orders.dinner_time as order_dinner_time, orders.customer_id, orders.customer_firstname, orders.customer_lastname, orders.customer_city as order_customer_city, orders.paid as order_paid, orders.pay_total as order_pay_total, orders.currency as order_currency, links2.user_id as other_user_id, users2.firstname as other_user_firstname, users2.lastname as other_user_lastname, users2.image as other_user_image,users2.is_elite as other_user_is_elite, last_message_author.firstname as last_message_by_firstname,CASE WHEN threads.last_message_id = links.last_viewed_message_id THEN 0 ELSE 1 END as unread FROM site_thread_links as links LEFT JOIN site_threads as threads ON(threads.id = links.thread_id) LEFT JOIN site_thread_messages as messages ON(messages.id = threads.last_message_id) LEFT JOIN site_orders as orders ON(orders.id = threads.order_id) LEFT JOIN site_thread_links as links2 ON(links2.thread_id = threads.id AND links2.user_id != $userid) LEFT JOIN site_users as users2 ON(users2.id = links2.user_id) LEFT JOIN site_users as last_message_author ON(last_message_author.id = threads.last_message_by_user_id) WHERE links.active = 1 AND links.user_id = $userid AND (orders.date_stamp > 1604325674 OR threads.last_message_id != links.last_viewed_message_id OR threads.last_message_time_stamp > 1603807274) GROUP BY threads.id ORDER BY threads.last_message_time_stamp DESC LIMIT 30';
    const bind = { userid: chefId };
    return await runQuery(sql, bind, SELECT, 'all');
  },

  /* GET ORDER BY CHEF ID AND TOKEN */
  getOrderByChefIdAndToken: async (chefId, order_token) => {
    const sql =
      'SELECT * FROM site_orders WHERE token = $order_token AND chef_id = $chefId';
    const results = await db.query(sql, {
      bind: { chefId, order_token },
      type: QueryTypes.SELECT,
    });
    return results[0];
  },

  /* CREATE THREAD MESSAGE */
  createThreadMessage: async (
    timeStamp,
    timeReadable,
    live,
    threadId,
    token,
    type,
    chefId,
    ip,
    message = null,
    privat = false,
    reminderTime = null,
    automatic = false
  ) => {
    const sql =
      'INSERT INTO site_thread_messages (time_stamp, time_readable, live, thread_id, thread_token, type, private, user_id, message, ip, reminder_time, automatic) VALUES ($timeStamp, $timeReadable, $live, $threadId, $token, $type, $privat, $chefId, $message, $ip, $reminderTime, $automatic)';
    const bind = {
      timeStamp,
      timeReadable,
      live,
      threadId,
      token,
      type,
      privat,
      chefId,
      message,
      ip,
      reminderTime,
      automatic,
    };
    const messageId = await runQuery(sql, bind, INSERT);
    return messageId;
  },

  /* UPDATE THREAD */
  updateThread: async (id, fields) => {
    let sql = 'UPDATE site_threads SET ';
    let comma = '';

    Object.keys(fields).forEach((field) => {
      sql += `${comma} ${field} = $${field}`;
      comma = ',';
    });
    sql += ` WHERE id = ${id}`;

    const bind = { ...fields };
    return await runQuery(sql, bind, UPDATE);
  },

  /* UPDATE ORDER */
  updateOrder: async (id, fields) => {
    let sql = 'UPDATE site_orders SET ';
    let comma = '';

    Object.keys(fields).forEach((field) => {
      sql += `${comma} ${field} = $${field}`;
      comma = ',';
    });
    sql += ` WHERE id = ${id}`;

    const bind = { ...fields };
    return await runQuery(sql, bind, UPDATE);
  },
};