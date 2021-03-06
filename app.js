// jshint esversion:9
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

const indexRouter = require('./routes/index.routes');
app.use('/api', indexRouter);

const authRouter = require('./routes/auth.routes');
app.use('/api', authRouter);

const emailRouter = require('./routes/email.routes');
app.use('/api', emailRouter);

const itemRouter = require('./routes/item.routes');
app.use('/api', itemRouter);

const userRouter = require('./routes/user.routes');
app.use('/api', userRouter);

const orderRouter = require('./routes/order.routes');
app.use('/api', orderRouter);

const fileUploadRouter = require('./routes/fileUpload.routes');
app.use('/api', fileUploadRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
