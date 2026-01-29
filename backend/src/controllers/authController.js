import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ─────────────────────────────────────────────
// Password strength helper
function isStrongPassword(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength)
    return "Password must be at least 8 characters long.";
  if (!hasUpper || !hasLower)
    return "Password must contain both uppercase and lowercase letters.";
  if (!hasNum) return "Password must include at least one number.";
  if (!hasSymbol)
    return "Password must include at least one special character.";
  return null;
}

// ─────────────────────────────────────────────
// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const passwordError = isStrongPassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ─────────────────────────────────────────────
// LOGIN  ✅ HEADER-BASED JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // 🔥 FRONTEND WILL STORE THIS
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ─────────────────────────────────────────────
// LOGOUT (CLIENT-SIDE ONLY)
export const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

// ─────────────────────────────────────────────
// FORGOT PASSWORD - SEND OTP
export const forgotPasswordSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.destroy({ where: { email } });

    await Otp.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      verified: false,
    });

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It expires in 5 minutes.`
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Forgot Password OTP Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ─────────────────────────────────────────────
// VERIFY OTP
export const forgotPasswordVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ where: { email } });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const valid = await bcrypt.compare(otp, record.otpHash);
    if (!valid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    record.verified = true;
    await record.save();

    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

// ─────────────────────────────────────────────
// RESET PASSWORD
export const forgotPasswordReset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const otpRecord = await Otp.findOne({
      where: { email, verified: true },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(403).json({ message: "OTP verification required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const strengthError = isStrongPassword(newPassword);
    if (strengthError)
      return res.status(400).json({ message: strengthError });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await Otp.destroy({ where: { email } });

    res.json({ success: true, message: "Password reset successful ✅" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
