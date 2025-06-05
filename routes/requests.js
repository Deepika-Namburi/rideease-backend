const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Ride = require("../models/Ride");

// GET: All requests (for admin or logic filter in frontend)
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Create a new ride request
router.post("/", async (req, res) => {
  const { rideId, email, requesterName } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const newRequest = new Request({
      rideId,
      requesterEmail: email,
      requesterName,
      from: ride.pickup,
      to: ride.drop,
      date: ride.date,
      time: ride.time,
      status: "pending"
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH: Accept or reject a ride request
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
