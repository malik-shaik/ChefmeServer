const express = require('express');
const allRoutes = require('./API/Routes');
const middlewares = require('./Middlewares');
const responseHandler = require('./Middlewares/responseHandler');

const app = express();

/* MIDDLEWARES */
middlewares(express, app);

/* ROUTES */
allRoutes(app);

/* RESPONSE HANDLER */
app.use(responseHandler);

module.exports = app;
