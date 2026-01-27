import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  logout,
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
  forgotPasswordReset,
} from "../controllers/authController.js";

const router = express.Router();

// 🔐 Rate limiter for auth-sensitive routes
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: {
    message: "Too many attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Auth Routes
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

// 🔐 Forgot Password Routes
router.post("/forgot-password/send-otp", authLimiter, forgotPasswordSendOtp);
router.post("/forgot-password/verify-otp", authLimiter, forgotPasswordVerifyOtp);
router.post("/forgot-password/reset", authLimiter, forgotPasswordReset);

export default router;
