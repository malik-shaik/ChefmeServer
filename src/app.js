const express = require('express');
const allRoutes = require('./API/Routes');
const middlewares = require('./Middlewares');

const app = express();

/* MIDDLEWARES */
middlewares(express, app);

/* ROUTES */
allRoutes(app);

module.exports = app;
