const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ✅ You missed this line
  name: { type: String },
  driverId: { type: String },
  isDriver: { type: Boolean }
});

module.exports = mongoose.model("User", userSchema);
