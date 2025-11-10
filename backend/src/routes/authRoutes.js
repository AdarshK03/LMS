import express from "express";
import bcrypt from "bcryptjs";
import { sendOTP, verifyOTP } from "../controllers/authController.js";
import User from "../models/userModel.js";

const router = express.Router();

// ✅ Send OTP
router.post("/send-otp", sendOTP);

// ✅ Verify OTP
router.post("/verify-otp", verifyOTP);

// ✅ Reset Password (Sequelize + OWASP compliant)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare old and new password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    // OWASP-compliant password policy
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { email } });

    res.json({ success: true, message: "Password reset successful ✅" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
