const Booking = require("../models/Booking");
const { validationResult } = require("express-validator");
const { sendAdminBookingNotification } = require("../utils/smsService");

// @desc    Submit a new booking (Public)
// @route   POST /api/bookings
const createBooking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, vehicleType, service, problem } = req.body;

  try {
    const booking = await Booking.create({
      fullName: name,
      phoneNumber: phone,
      vehicleType,
      serviceRequired: service,
      problemDescription: problem || "",
    });

    // Send SMS alert to admin phone (async, non-blocking)
    sendAdminBookingNotification(booking);

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully!",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (Admin Only)
// @route   GET /api/bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Admin Only)
// @route   PUT /api/bookings/:id
const updateBookingStatus = async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ["Pending", "In Progress", "Completed", "Cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value provided" });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};
