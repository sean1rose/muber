const express = require('express');

// bring in the routes function
const routes = require('./routes/routes');

// obj that takes incoming http requests and then runs code to do something per that request
const app = express();

// request (route) handlers:
routes(app);

module.exports = app;