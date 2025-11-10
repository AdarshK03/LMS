import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./src/config/db.js";  // or default import depending on db.js
import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

// ✅ Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// Start Server
const PORT = process.env.PORT || 5000;

// ✅ Test route for Postman
app.get("/api/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      success: true,
      message: "Backend and Database are connected successfully 🚀",
    });
  } catch (error) {
    console.error("Database test failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed ❌",
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
