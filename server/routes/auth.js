const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

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

async function changePassword(req, res) {
  var data = await Otp.find({ email: req.body.email, code: req.body.OTP });
  data = data[0];
  const response = {};
  if (data == undefined) {
    response.message = "Invalid OTP!!";
    response.status = 3;
    res.json(response);
    return;
  } else {
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        response.message = "OTP Expired";
        response.status = 0;
        res.status(200).json(response);
      } else {
        email = data.email;
        User.findOne({ email: email })
          .then(async (users) => {
            const salt = await bcrypt.genSalt();
            const pass = await bcrypt.hash(req.body.Password, salt);
            users.password = pass;
            users.save();
            response.message = "Password Changed Successfully";
            response.status = 1;
            res.status(200).json(response);
          })
          .catch((err) => {
            response.message = "Something went wrong!!";
            response.status = 2;
            res.json(response);
          });
      }
    }
  }
}

async function emailSend(req, res) {
  const response = {};
  email = req.body.email;
  await User.findOne({ email: email })
    .then(async (users) => {
      if (users === null) {
        response.status = 0;
        response.message = "Email Not Found";
        res.json(response);
      } else {
        let otpcode = Math.floor(Math.random() * 10000 + 1);
        let otpData = new Otp({
          email: email,
          code: otpcode,
          expireIn: new Date().getTime() + 120 * 1000,
        });
        let otpResponse = await otpData.save();
        mailer(email, otpData.code);

        response.message = "Mail sent";
        response.status = 1;
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      response.message = "Something went wrong";
      response.status = 2;
      res.json(response);
    });
}

function mailer(email, otp) {
  var transporter = nodemailer.createTransport({
    service: "gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.MAIL,
    to: `${email}`,
    subject: "Reset password LINK",
    text: "Reset your password using this OTP: " + `${otp}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
  });
}

router.post("/generate-otp", function (req, res) {
  emailSend(req, res);
});

router.post("/reset-password", function (req, res) {
  changePassword(req, res);
});

module.exports = router;
