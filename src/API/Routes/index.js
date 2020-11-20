const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const messageRoutes = require('./messageRoutes');
const notFoundRoute = require('./notFoundRoute');
const responseHandler = require('../../Middlewares/responseHandler');

module.exports = (app) => {
  app.use('/users', userRoutes);
  app.use('/orders', orderRoutes);
  app.use('/messages', messageRoutes);
  app.use('/*', notFoundRoute);
  app.use(responseHandler);
};
