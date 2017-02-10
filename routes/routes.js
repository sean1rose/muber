const DriversController = require('../controllers/drivers_controller');

// request (route) handlers:
module.exports = (app) => {

  // watch for incoming requests of method GET to route http://localhost:3050/api
    // route handles request via use of a controller
  app.get('/api', DriversController.greeting);

  // route for creating drivers...
  app.post('/api/drivers', DriversController.create);

};
