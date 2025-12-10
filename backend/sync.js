import sequelize from "./src/config/db.js";
import Otp from "./src/models/otpModel.js";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced with database!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error syncing models:", error);
    process.exit(1);
  }
})();
