const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// bring in the routes function
const routes = require('./routes/routes');
// obj that takes incoming http requests and then runs code to do something per that request
const app = express();

// connect mongoose to mongodb
mongoose.Promise = global.Promise;

// using 2 separate dbs
if (process.env.NODE_ENV !== 'test'){
  // if not in test env (in dev env, prod) -> connect to muber db 
  mongoose.connect('mongodb://localhost/muber');
}
// if running test env -> don't touch it, but add to (insde of test helper, always connect to "muber_test" db)
// don't need else statement for test db cuz test_helper handles it 

// wire up body parser middleware
  // any incoming request -> assume it's json and parse it into an obj
app.use(bodyParser.json());
// make sure middleware comes BEFORE 'routes' is called

// request (route) handlers:
routes(app);

module.exports = app;