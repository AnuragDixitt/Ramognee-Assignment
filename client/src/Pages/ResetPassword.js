import React, { useState } from "react";

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Add your reset password logic here
    try {
      // Simulate a successful reset password request
      // In a real application, this would involve making an API call
      setResetSuccess(true);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      {resetSuccess ? (
        <p className="text-green-500 mb-4">Password reset successful!</p>
      ) : (
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
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
