require('dotenv').config();

module.exports = {
  PORT: process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,
};
