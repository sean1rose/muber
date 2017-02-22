const DriversController = require('../controllers/drivers_controller');

// request (route) handlers:
module.exports = (app) => {

  // watch for incoming requests of method GET to route http://localhost:3050/api
    // route handles request via use of a controller
  app.get('/api', DriversController.greeting);

  // route for creating drivers...
  app.post('/api/drivers', DriversController.create);

  // in the controller, can find id by using 'req.params.id';
  app.put('/api/drivers/:id', DriversController.edit);

  app.delete('/api/drivers/:id', DriversController.delete);

// get list of drivers
  app.get('/api/drivers', DriversController.index);

};
