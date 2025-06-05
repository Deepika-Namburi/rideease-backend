const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");

// GET /rides – fetch all rides with optional pickup/drop filters
router.get("/", async (req, res) => {
  try {
    const { pickup, drop } = req.query;
    const filter = {};

    if (pickup) filter.pickup = { $regex: pickup, $options: "i" };
    if (drop) filter.drop = { $regex: drop, $options: "i" };

    const rides = await Ride.find(filter).sort({ date: 1, time: 1 });
    res.json(rides);
  } catch (err) {
    console.error("❌ Error fetching rides:", err);
    res.status(500).json({ message: "Server error while fetching rides." });
  }
});

// POST /rides – create a new ride
router.post("/", async (req, res) => {
  try {
    const ride = new Ride(req.body);
    const saved = await ride.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating ride:", err);
    res.status(500).json({ message: "Server error while creating ride." });
  }
});

// PATCH /rides/:id – update ride details
router.patch("/:id", async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.json(ride);
  } catch (err) {
    console.error("❌ Error updating ride:", err);
    res.status(500).json({ message: "Server error while updating ride." });
  }
});

// DELETE /rides/:id – delete a ride
router.delete("/:id", async (req, res) => {
  try {
    const result = await Ride.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Ride not found" });
    res.json({ message: "Ride deleted" });
  } catch (err) {
    console.error("❌ Error deleting ride:", err);
    res.status(500).json({ message: "Server error while deleting ride." });
  }
});

module.exports = router;
