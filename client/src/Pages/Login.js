import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
const BACKEND_URL = "http://127.0.0.1:5000";

const Login = () => {
  const { state, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateFormData()) {
      return;
    }

    // Make a POST request to your backend for login
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful
        console.log("Login successful");
        localStorage.setItem("Login", "true");
        localStorage.setItem("Email", formData.email);
        login(formData.email); // Update the global state
        navigate("/products");
      } else {
        // Handle login error
        const data = await response.json();
        localStorage.setItem("Login", "false");
        console.error("Login error:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Frontend validation function
  const validateFormData = () => {
    // Example validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address");
      return false;
    }

    return true;
  };

  const handleForgotPassword = () => {
    // Implement the logic for forgot password
    // console.log("Forgot Password clicked");
    navigate("/reset-password");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        <div className="text-right">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
