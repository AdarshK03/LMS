import express from "express";
import rateLimit from "express-rate-limit";
import {
  sendOTP,
  verifyOTP,
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 attempts per window
  message: {
    message: "Too many login/register attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Auth Routes
router.post("/register", register); // Add authLimiter back for production
router.post("/login", login); // Add authLimiter back for production
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// ✅ OTP Routes
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// ✅ Reset Password (Sequelize + OWASP compliant) - Keeping this inline as it wasn't fully in controller or root routes
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
