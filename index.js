const express = require("express");
const app = express();
const logger = require("morgan");
const { connectDB } = require("./config/db");
const userPath = require("./routes/userRoute");
const productPath = require("./routes/productRoute");

const PORT = 1337;

app.use(express.json());
app.use(logger("dev"));
app.use(express.static("Content"));

app.use("/api/v1/user", userPath);
app.use("/api/v1/product", productPath);

app.listen(PORT, () => {
  console.log("Server is running");
  connectDB();
});
