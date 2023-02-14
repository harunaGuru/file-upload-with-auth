const { DataTypes } = require("sequelize");
const { creatDB } = require("../config/db");

const Product = creatDB.define("product", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  file: DataTypes.STRING,
});

module.exports = Product;
