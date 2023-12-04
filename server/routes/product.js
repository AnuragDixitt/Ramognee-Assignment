const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/Product");

// Fetch products from external API
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    // Save products to database (MongoDB)
    await Product.insertMany(products);
    res.status(200).json(products);
  } catch (error) {
    console.log("Error fetching products from external API: ", error);
    res
      .status(500)
      .json({ message: "Error fetching products from external API" });
  }
});

module.exports = router;
