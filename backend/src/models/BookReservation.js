import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BookReservation = sequelize.define(
  "BookReservation",
  {
    reservationCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "CANCELLED", "EXPIRED", "ISSUED"),
      defaultValue: "ACTIVE",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default BookReservation;
