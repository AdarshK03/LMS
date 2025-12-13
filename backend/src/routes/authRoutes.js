import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  refreshToken,
  logout,
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
  forgotPasswordReset,
} from "../controllers/authController.js";


const router = express.Router();

const authLimiter = rateLimit({

  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login/register attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// 🔐 Forgot Password Routes (SECURE)
router.post("/forgot-password/send-otp", forgotPasswordSendOtp);
router.post("/forgot-password/verify-otp", forgotPasswordVerifyOtp);
router.post("/forgot-password/reset", forgotPasswordReset);


export default router;
