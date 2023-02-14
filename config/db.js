const {Sequelize} = require("sequelize");

const creatDB = new Sequelize("FileUpload", "user", "pass", {
    dialect: "sqlite",
    host: "./config/db.sqlite"
})

const connectDB =  () => {
    creatDB.sync().then(() => {
        console.log("Database is connected")
    }).catch((e) => {
        console.log("Database is not connected", e)
    })
}

module.exports = {creatDB, connectDB}