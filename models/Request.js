const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  rideId: String,
  requesterEmail: String,
  requesterName: String,
  from: String,
  to: String,
  date: String,
  time: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Request", requestSchema);
