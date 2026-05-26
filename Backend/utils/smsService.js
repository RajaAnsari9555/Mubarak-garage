const twilio = require("twilio");

// Initialize Twilio client using secure env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

/**
 * Sends a customized SMS alert to the admin's phone number when a new booking is created.
 * @param {Object} booking - The saved booking details from MongoDB
 */
const sendAdminBookingNotification = async (booking) => {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER || "+919555964719";
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  // Design custom message text
  const messageBody = `
🔧 Janta Garage Booking Alert!
👤 Customer: ${booking.fullName}
📞 Phone: ${booking.phoneNumber}
🚗 Vehicle: ${booking.vehicleType}
🔧 Service: ${booking.serviceRequired}
💬 Problem: ${booking.problemDescription || "No description provided."}
📅 Booked on: ${new Date(booking.createdAt).toLocaleString()}
  `.trim();

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhone,
      to: adminPhone,
    });
    console.log(`[SMS SUCCESS] Notification dispatched! Message SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    // Log error to console but do not crash the app, keeping database transactions reliable
    console.error("[SMS ERROR] Failed to send notification:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendAdminBookingNotification };
