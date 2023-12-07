import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import ResetPassword from "../Pages/ResetPassword";
const routes = () => {
  return (
    <Routes>
      {/* Page routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default routes;
