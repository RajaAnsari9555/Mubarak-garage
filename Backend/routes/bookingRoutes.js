const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const { protectAdmin } = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

// Anti-spam rate limiting for public booking creations (5 submissions per hour per IP)
const bookingSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: "Too many appointments booked from this IP. Please try again in an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Setup public and admin routes
router.post(
  "/",
  bookingSubmitLimiter,
  [
    body("name").trim().notEmpty().withMessage("Full Name is required").isLength({ max: 50 }),
    body("phone").trim().notEmpty().withMessage("Phone number is required").matches(/^\+?[0-9\s-]{7,15}$/).withMessage("Enter a valid phone number"),
    body("vehicleType").isIn(["Bus", "Truck", "Car / 4-Wheeler", "Van", "Heavy Machinery", "Other"]).withMessage("Invalid vehicle type"),
    body("service").notEmpty().withMessage("Service required is mandatory"),
    body("problem").trim().escape(), // escapes HTML tags to prevent XSS payloads
  ],
  createBooking
);

// Admin-only protected endpoints
router.get("/", protectAdmin, getAllBookings);
router.put("/:id", protectAdmin, updateBookingStatus);

module.exports = router;
