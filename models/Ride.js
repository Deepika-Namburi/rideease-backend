const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverName: String,
  email: {
    type: String,
    required: true
  },
  pickup: String,
  drop: String,
  date: String,
  time: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);
