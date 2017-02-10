const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema + create model

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  }
});

// make driver model, passing DriverSchema
const Driver = mongoose.model('driver', DriverSchema);

// export model
module.exports = Driver;