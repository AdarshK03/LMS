import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// ✅ Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Please sign up first." });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await Otp.create({ email, otp, expiresAt });
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It expires in 5 minutes.`);

    res.status(200).json({ message: "OTP sent successfully ✅" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const record = await Otp.findOne({
      where: { email, otp, used: false },
    });

    if (!record || record.expiresAt < new Date())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    record.used = true;
    await record.save();

    res.status(200).json({ message: "OTP verified successfully ✅" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
