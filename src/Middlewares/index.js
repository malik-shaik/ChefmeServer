const cors = require('cors');

module.exports = (express, app) => {
  app.use(express.json());
  app.use(cors());
};
