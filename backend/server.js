import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:8080",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Security headers

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ DB Connection failed:", err));

// Sync models (create tables if not exist)
sequelize
  .sync()
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Sync error:", err));

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));