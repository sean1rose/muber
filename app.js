const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// bring in the routes function
const routes = require('./routes/routes');
// obj that takes incoming http requests and then runs code to do something per that request
const app = express();

// connect mongoose to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

// wire up body parser middleware
  // any incoming request -> assume it's json and parse it into an obj
app.use(bodyParser.json());
// make sure middleware comes BEFORE 'routes' is called

// request (route) handlers:
routes(app);

module.exports = app;