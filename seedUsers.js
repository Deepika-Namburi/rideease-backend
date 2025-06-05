const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Define the users to re-insert
    const users = [
      {
        email: "23b05a4512@svecw.edu.in",
        password: "123456",
        name: "Manasa",
        driverId: "DR4512",
        isDriver: true,
      },
      {
        email: "23b05a4508@svecw.edu.in",
        password: "123456",
        name: "Vahida",
        driverId: "DR4508",
        isDriver: true,
      },
      {
        email: "23b05a4509@svecw.edu.in",
        password: "123456",
        name: "Deepika Namburi",
        driverId: "DR4509",
        isDriver: true,
      }
    ];

    for (const user of users) {
      await User.deleteOne({ email: user.email });
      await User.create(user);
      console.log(`✅ Replaced user: ${user.email}`);
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err);
  });
