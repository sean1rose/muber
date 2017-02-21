const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    console.log('req.body - ', req.body);
    // // create driver in database
    const driverProps = req.body;    
    
    // if (!req.body) return res.sendStatus(400);
    
    // use next callback to go to next middleware in the chain (which will be the error handling middleware)
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
    
  },

  // add route to route file, then add controller function...
  edit(req, res, next) {
    // use :id to access driver trying to search for
    const driverId = req.params.id;
    const driverProperties = req.body;
    Driver.findByIdAndUpdate({ _id: driverId}, driverProperties)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);

    // .then doesn't return the driver obj that was updated, but rather an object w/ statistics of what was updated...
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    // const driverProps = req.body;
    Driver.findByIdAndRemove({ _id: driverId})
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
  
};