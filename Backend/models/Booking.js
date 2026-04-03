const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Bus", "Truck", "Car / 4-Wheeler", "Van", "Heavy Machinery", "Other"],
    },
    serviceRequired: {
      type: String,
      required: true,
      enum: [
        "Engine Repair / Replacement",
        "Transmission & Gearbox",
        "Brake System",
        "Tyre & Wheel",
        "Electrical & Battery",
        "AC & Cooling",
        "Fuel System",
        "Greasing & Lubrication",
        "Body & Welding",
        "Full Service",
        "Other / Not Sure",
      ],
    },
    problemDescription: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
