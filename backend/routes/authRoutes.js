import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { User } from "../models/users.js";

dotenv.config();  //Load .env variables
const router = express.Router();

router.use(cookieParser()); //use the cookieParser Middleware

const authLimiter = rateLimit({  //rate limiter function
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 attempts per window
  message: {
    message: "Too many login/register attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

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

router.get("/test", (req, res) => {
  res.send("Auth route working!");
});

router.post("/register", authLimiter, async (req, res) => {
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
});

// LOGIN
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "E-mail not registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password did not match." });

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
});

//This route refreshes the jwt login token if the user selects rememberMe option
router.post("/refresh", async (req, res) => { 
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token: accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

// Logout route (Created for future use)
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully." });
});

export default router;
