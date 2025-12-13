import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to check password strength
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

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔹 Basic Input Validation
    if (!name?.trim() || !email?.trim() || !password)
      return res.status(400).json({ message: "All fields are required." });

    // 🔹 Password Strength Check
    const passwordError = isStrongPassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // 🔹 Prevent duplicate accounts
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // 🔹 Hash password securely
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

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid E-mail or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid E-mail or Password" });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    let refreshToken;
    if (rememberMe) {
      refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Set it as a secure HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    // Send back access token + basic info
    res.json({
      message: "Login successful",
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Refresh Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(403).json({ message: "User not found" });
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token: accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// ✅ Logout
export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully." });
};


// Forgot Password Work-Flow
//Send OTP for password reset

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

// ✅ Verify OTP for password reset

export const forgotPasswordVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const record = await Otp.findOne({ where: { email } });
    if (!record || record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired or invalid" });

    const valid = await bcrypt.compare(otp, record.otpHash);
    if (!valid)
      return res.status(400).json({ message: "Invalid OTP" });

    record.verified = true;
    await record.save();

    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

// ✅ Reset password (ONLY after OTP verification)
export const forgotPasswordReset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    const otpRecord = await Otp.findOne({
      where: { email, verified: true },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res
        .status(403)
        .json({ message: "OTP verification required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (samePassword)
      return res
        .status(400)
        .json({ message: "New password cannot be same as old password" });

    const strengthError = isStrongPassword(newPassword);
    if (strengthError)
      return res.status(400).json({ message: strengthError });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // 🔥 Invalidate OTP permanently
    await Otp.destroy({ where: { email } });

    res.json({ success: true, message: "Password reset successful ✅" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};



