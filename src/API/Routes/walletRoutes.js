const router = require('express').Router();
const authorisation = require('../../Middlewares/authorisation');
const { getWalletInfoAction } = require('../Controllers/walletController');

/* WALLET ROUTES */

router.get('/bychef', authorisation, getWalletInfoAction);

module.exports = router;
