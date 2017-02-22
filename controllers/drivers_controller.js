const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // for get request
  index(req, res, next) {
    /* http://mongoosejs.com/docs/api.html#model_Model.geoNear
      Model.geoNear(GeoJSON, options, [callback])
        GeoJSON <Object, Array> point or legacy coordinate pair [x,y] to search near
        options <Object> for the query
        [callback] <Function> optional callback for the query
    */
    // request obj will contain the lat/lon of the user (not req.body, cuz it's a get request)
      // query string -> 'http://google.com?lng-80&lat=20'
      // these aren't #s -> they're strings, so parseFloat it
    const { lng, lat } = req.query;

    // get driver that's near a point w/ lat/lng, using sphere, max distance 2000 km
    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
    
  },

  // for post
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