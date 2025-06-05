const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = email.trim(); // Remove extra spaces

  console.log("🟡 Login attempt from:", cleanEmail);
  console.log("🟡 Password entered:", password);

  try {
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email);
    console.log("🔒 Password in DB:", user.password);

    if (user.password !== password) {
      console.log("❌ Password mismatch!");
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success
    res.json({
      email: user.email,
      name: user.name,
      isDriver: user.isDriver,
      driverId: user.driverId
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
