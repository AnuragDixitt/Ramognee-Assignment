import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
const routes = () => {
  return (
    <Routes>
      {/* Page routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default routes;
