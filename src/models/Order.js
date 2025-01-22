const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Order = sequelize.define('Order', {
    OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CartID: { type: DataTypes.INTEGER, allowNull: false },
    // OrderDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    OrderDate: {
        type: DataTypes.DATE,
        allowNull: true, // Biarkan database yang menangani
    },
    TotalAmount: { type: DataTypes.DECIMAL(10, 2) },
}, {
    tableName: 'Orders',
    timestamps: false,
    freezeTableName: true,
});

module.exports = Order;