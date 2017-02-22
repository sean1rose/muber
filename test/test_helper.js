const mongoose = require('mongoose');

before(done => {
  // test db separate from prod db, can drop this as much as we want
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning - ', err);
    });
});

// drop collection of drivers before each
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  // drop collection before each test. so recreate the index after drop.
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});