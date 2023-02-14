const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const uploadContent = require("../utils/fileUpload");
const { isAuthenticated, isSeller } = require("../middlewares/auth");

router.post("/create", isAuthenticated, isSeller, (req, res) => {
  uploadContent(req, res, async (err) => {
      if (err) {
        console.log("incoming err", err)
      return res.status(500).send({ err: err.message });
    }
    //console.log(req.body.file, req.body.price, req.body.file);
    if (!req.body.name || !req.body.price || !req.file) {
      return res
        .status(400)
        .json({ err: "All fields should be selected - name, price, file" });
    }

    if (isNaN(req.body.price)) {
      return res.status(400).json({ err: "Price must be a number" });
    }

    let productDetails = {
      name: req.body.name,
      price: req.body.price,
      file: req.file.path,
    };

    const createdProduct = await Product.create(productDetails);

    console.log("Created Product", createdProduct);

    return res.status(201).json({ message: "Product created" });
  });
});

router.get("/get/all", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      products: products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;
