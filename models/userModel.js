const { DataTypes } = require('sequelize')
const { creatDB } = require("../config/db")


const User = creatDB.define("user", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User;