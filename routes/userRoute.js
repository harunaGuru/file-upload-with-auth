const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
const SECRET = "jwt secret";

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: "Invalid email",
      });
    }
    if (!validateName(name)) {
      return res.status(400).json({
        error: "Invalid name",
      });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(403).json("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));
    const user = { name, email, password: hashedPassword, isSeller };
    const createdUser = await User.create(user);
    return res.status(201).json({
      status: "ok",
      message: "User created successfully",
      createdUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Both field are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: "Invalid email",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });
    if (!existingUser) {
      return res.status(403).json("User does not exist");
    }
    const decodedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!decodedPassword) {
      return res.status(400).json("Invalid credential");
    }

    const payload = {
      user: {
        id: existingUser.id,
      },
    };
    const bearerToken = await jwt.sign(payload, SECRET, {
      expiresIn: 360000,
    });
    res.cookie("t", bearerToken, {
      expire: new Date() + 9999,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      bearerToken: bearerToken,
    });
  } catch (error) {
      console.log(error)
    return res.status(500).json({ error: "Something went wrong", error});
  }
});

router.get("/signout", async (_req, res) => {
  try {
    res.clearCookie("t");
    res.status(200).json("User logged out");
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
