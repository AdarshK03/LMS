// src/models/otpModel.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Otp = sequelize.define(
  "Otp",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otpHash: {

      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {

    tableName: "Otps",
    timestamps: true,
  }
);

export default Otp;
