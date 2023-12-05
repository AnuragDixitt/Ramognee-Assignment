const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isPasswordValid = (password) => {
  //Password should have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
};

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const {
      userType,
      firstName,
      lastName,
      email,
      address,
      country,
      state,
      city,
      pincode,
      mobileNumber,
      fax,
      phone,
      password,
    } = req.body;

    // Check if the user with the provided email exists
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      userType,
      firstName,
      lastName,
      email,
      address,
      country,
      state,
      city,
      pincode,
      mobileNumber,
      fax,
      phone,
      password: hashedPassword,
    });

    await user.save();

    //Respond with a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ messsage: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
