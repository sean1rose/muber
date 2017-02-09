const express = require('express');

// obj that takes incoming http requests and then runs code to do something per that request
const app = express();


// request (route) handlers:

// watch for incoming requests of method GET to route http://localhost:3050/api
app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});



module.exports = app;