const { Sequelize } = require('sequelize');
const {
  DB_DIALECT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_NAME,
} = require('../Config');

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  // disable logging; default: console.log
  logging: false,
});
const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log('✅ ... Database connected successfully ... ✅');
    return true;
  } catch (error) {
    console.error('⛔️ Unable to connect to the database ⛔️');
    // console.log('Error Message:',error)
    return false;
  }
};

module.exports = { db, dbConnection };
