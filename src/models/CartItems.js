const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Product = require("./Product");
const Cart = require("./Carts");

const CartItems = sequelize.define(
  "CartItems",
  {
    CartItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CartID: { type: DataTypes.INTEGER, allowNull: false },
    ProductID: { type: DataTypes.INTEGER, allowNull: false },
    Quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "CartItems",
    timestamps: false,
    freezeTableName: true,
  }
);

CartItems.belongsTo(Product, { foreignKey: "ProductID" });
// CartItems.belongsTo(Cart, { foreignKey: "CartID" });

module.exports = CartItems;
