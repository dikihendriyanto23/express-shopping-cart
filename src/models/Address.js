const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Address = sequelize.define(
  "Address",
  {
    AddressID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CartID: { type: DataTypes.INTEGER, allowNull: false },
    AddressLine1: { type: DataTypes.TEXT, allowNull: false },
    AddressLine2: { type: DataTypes.TEXT, allowNull: true },
    City: { type: DataTypes.TEXT, allowNull: false },
    State: { type: DataTypes.TEXT, allowNull: false },
    ZipCode: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "Addresses",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Address;
