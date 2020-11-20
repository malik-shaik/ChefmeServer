const router = require('express').Router();
const authorisation = require('../../Middlewares/authorisation');
const {
  getMessageByIdAction,
  getMessagesByUserIdAction,
} = require('../Controllers/messageController');

/* MESSAGES ROUTES */

router.get('/all', authorisation, getMessagesByUserIdAction);

router.get('/:messageId', authorisation, getMessageByIdAction);

module.exports = router;
