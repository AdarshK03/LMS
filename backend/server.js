import express from "express";
import sequelize from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";


const app = express();

// ✅ Core middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  })
);
app.use(helmet());

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "LMS Backend API is running 🚀" });
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);


// ✅ Connect & Sync Database
(async () => {
  try {
    console.log("⏳ Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Connected to hosted PostgreSQL");

    // Sync models with DB
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized with PostgreSQL");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running and listening on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
})();
