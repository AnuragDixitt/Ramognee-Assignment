const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/Product");
const mongoose = require("mongoose");
// const user = require("../models/User");
const User = require("../models/User");

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

router.post("/add", async (req, res) => {
  try {
    const { email, id } = req.body;
    // console.log(id);
    // console.log(req.body);
    // Check if the user exists
    const user = await User.findOne(email);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(id);
    // Check if the product is already in the user's cart
    const cartItem = user.cart.find((item) => item.product === id);

    if (cartItem) {
      // If the product is already in the cart, increment the quantity
      cartItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      user.cart.push({ product: id, quantity: 1 });
    }

    // Save the updated user with the new cart state
    await user.save();
    const updatedCartItem = user.cart.find((item) => item.product === id);

    res
      .status(200)
      .json({ count: updatedCartItem ? updatedCartItem.quantity : 1 });
  } catch (error) {
    console.log("Error adding product to cart: ", error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { email, id } = req.body;

    // Check if the user exists
    const user = await User.findOne(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is in the user's cart
    const cartItem = user.cart.find((item) => item.product === id);

    if (cartItem) {
      // If the product is in the cart, decrement the quantity
      cartItem.quantity = Math.max(0, cartItem.quantity - 1);

      // Remove the item from the cart if the quantity is zero
      if (cartItem.quantity === 0) {
        user.cart = user.cart.filter((item) => item.product !== id);
      }

      // Save the updated user with the new cart state
      await user.save();

      // Find the updated cart item
      const updatedCartItem = user.cart.find((item) => item.product === id);

      res.status(200).json({
        count: updatedCartItem ? updatedCartItem.quantity : 0,
      });
    } else {
      res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.log("Error removing product from cart: ", error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
});

module.exports = router;
