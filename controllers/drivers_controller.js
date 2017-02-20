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
    
  }
  
};