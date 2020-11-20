const express = require('express');
const { db } = require('./Database');
const { testAllMessages } = require('./Database/Queries');

const app = express();

db.authenticate().then(() => console.log('DB connected'));

testAllMessages();

app.listen(3300, () => console.log('App is running'));
