const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// embedded sub-document, used inside of the DriverSchema
const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
})


// create schema + create model
const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

// make driver model, passing DriverSchema
const Driver = mongoose.model('driver', DriverSchema);

// export model
module.exports = Driver;