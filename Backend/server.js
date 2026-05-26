const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Admin Auto-Seeding
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ phoneNumber: "7897659266" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("mubarak123", 10);
      await Admin.create({
        name: "Owner Mubarak",
        phoneNumber: "7897659266",
        password: hashedPassword,
      });
      console.log("Admin account seeded successfully (7897659266 / mubarak123)");
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};
seedAdmin();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
