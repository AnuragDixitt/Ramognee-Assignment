const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
const userRouter = require("./routes/auth");
app.use("/api/auth", userRouter);
const productRouter = require("./routes/product");
app.use("/api/products", productRouter);
// const cartRouter = require("./routes/cart");
// app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
