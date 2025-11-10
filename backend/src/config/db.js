// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Needed for Render/Neon hosted databases
    },
  },
  logging: false, // Disable SQL query logs in console
});

// ✅ Test connection when starting the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to hosted PostgreSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

export default sequelize;
