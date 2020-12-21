const messageRoutes = require('./messageRoutes');
const notFoundRoute = require('./notFoundRoute');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');

module.exports = (app) => {
  app.use('/users', userRoutes);
  app.use('/orders', orderRoutes);
  app.use('/messages', messageRoutes);
  app.use('/wallet', walletRoutes);
  app.use('/*', notFoundRoute);
};

// get('/users')
// post('/users')
// delete('/users/:id')
// put('/users/:id')
