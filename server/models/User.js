const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userType: {
    enum: ["individual", "enterprise", "government"],
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  fax: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
