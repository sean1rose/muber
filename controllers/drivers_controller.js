const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res) {
    console.log('req.body - ', req.body);
    // // create driver in database
    const driverProps = req.body;    
    
    // if (!req.body) return res.sendStatus(400);
    
    Driver.create(driverProps).then(driver => res.send(driver));
    
  }
  
};