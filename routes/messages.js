const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
});

// POST new message
router.post("/", async (req, res) => {
  const { sender, text } = req.body;
  const message = new Message({ sender, text });
  await message.save();
  res.status(201).json(message);
});

module.exports = router;
