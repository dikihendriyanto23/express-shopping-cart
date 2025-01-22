const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT },
    Price: { type: DataTypes.FLOAT, allowNull: false },
    Stock: { type: DataTypes.INTEGER, allowNull: false },
    CreatedAt: { type: DataTypes.DATE, allowNull: true }, // Allow null karena di insert langsung oleh database
    UpdatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "Products",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Product;
