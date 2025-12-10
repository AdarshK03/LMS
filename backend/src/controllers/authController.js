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

// ✅ Send OTP (Existing)
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
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP is ${otp}. It expires in 5 minutes.`
    );

    res.status(200).json({ message: "OTP sent successfully ✅" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ Verify OTP (Existing)
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
