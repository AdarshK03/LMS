import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Otp = sequelize.define(
  "Otp",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "otps",      // ✅ lowercased, matches DB
    freezeTableName: true,  // ✅ prevents Sequelize from pluralizing or duplicating
    timestamps: true,
  }
);

export default Otp;
