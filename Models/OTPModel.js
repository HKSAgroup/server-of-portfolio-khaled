const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    phoneNumber: { type: String, required: [true] },
    otp: {
      type: String,
      required: [true],
    },
    // after 5 mnts, otp is deleted automatically from db
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
