
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
const routes = () => {
  return (
    <Routes>
      {/* Page routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={< Products/>} />
    </Routes>
  )
}

export default routes
