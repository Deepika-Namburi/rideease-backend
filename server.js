const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",  // You can replace with Netlify domain later
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const rideRoutes = require("./routes/rides");
const requestRoutes = require("./routes/requests");
const messageRoutes = require("./routes/messages");

app.use("/auth", authRoutes);
app.use("/rides", rideRoutes);
app.use("/requests", requestRoutes);
app.use("/messages", messageRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
  dbName: "ride_share",
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
