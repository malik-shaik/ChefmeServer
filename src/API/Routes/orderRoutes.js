const router = require('express').Router();
const authorisation = require('../../Middlewares/authorisation');
const {
  getOrderByTokenAction,
  getOrdersByUserIdAction,
  orderRequestEditAciton,
  orderRequestRejectAciton,
} = require('../Controllers/orderController');

/* ORDER ROUTES */
router.get('/all', authorisation, getOrdersByUserIdAction);

router.post('/request/accept', authorisation, orderRequestEditAciton);

router.post('/request/reject', authorisation, orderRequestRejectAciton);

// TODO: implement the below routes
// router.post('/request/edit', authorisation, orderRequestEditAciton);

router.get('/:orderToken', authorisation, getOrderByTokenAction);

module.exports = router;
