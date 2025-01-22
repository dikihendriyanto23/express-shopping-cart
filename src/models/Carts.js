const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const CartItems = require("./CartItems");

const Carts = sequelize.define(
  "Carts",
  {
    CartID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CreatedAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "Carts",
    timestamps: false,
    freezeTableName: true,
  }
);

Carts.hasMany(CartItems, { foreignKey: "CartID" });

module.exports = Carts;
