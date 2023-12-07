import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetStep, setResetStep] = useState(0); // 0: Initial, 1: OTP Sent, 2: Password Reset
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // First send OTP to user's email
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/generate-otp",
        {
          method: "POST",
          body: JSON.stringify({ email: resetEmail }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      // If OTP sent successfully, set resetStep to 1
      if (result.status === 1) {
        setResetStep(1);
        toast.success("OTP sent successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        console.error("Error generating OTP:", result.error);
        toast.error("Account Does not exist", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send request to reset password
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: resetEmail,
            OTP: otp,
            Password: newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.status === 1) {
        setResetStep(2);
        toast.success("Password reset successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        // redirect to login page
        navigate("/login");
      } else {
        console.error("Error resetting password:", result.error);
        toast.error("Error resetting password!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      {resetStep === 0 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Send OTP
          </button>
        </form>
      )}

      {resetStep === 1 && (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      )}

      {resetStep === 2 && (
        <p className="text-green-500 mb-4">Password reset successful!</p>
      )}
    </div>
  );
};

export default ResetPassword;
