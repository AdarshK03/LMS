import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN", "SUPER_ADMIN"),
      allowNull: false,
      defaultValue: "USER"
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "BLOCKED", "SUSPENDED"),
      allowNull: false,
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "Users", // match your existing table name
    timestamps: true,
  }
);

export default User;
