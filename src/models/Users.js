const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Users = sequelize.define(
  "Users",
  {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Email: { type: DataTypes.STRING, unique: true },
    Name: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING },
    CreatedAt: { type: DataTypes.DATE, allowNull: true }, //Biarkan SQL Server menangani
    UpdatedAt: { type: DataTypes.DATE, allowNull: true }, //Biarkan SQL Server menangani
  },
  {
    tableName: "Users", //table SQL
    timestamps: false, //matikan timestamps otomatis
    freezeTableName: true, //nama table tidak akan diubah
  }
);

module.exports = Users;
