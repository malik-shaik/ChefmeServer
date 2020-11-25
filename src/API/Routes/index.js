const messageRoutes = require('./messageRoutes');
const notFoundRoute = require('./notFoundRoute');
const orderRoutes = require('./orderRoutes');
const responseHandler = require('../../Middlewares/responseHandler');
const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');

module.exports = (app) => {
  app.use('/users', userRoutes);
  app.use('/orders', orderRoutes);
  app.use('/messages', messageRoutes);
  app.use('/wallet', walletRoutes);
  app.use('/*', notFoundRoute);
  app.use(responseHandler);
};
