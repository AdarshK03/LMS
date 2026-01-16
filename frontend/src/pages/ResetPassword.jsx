import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Session expired. Please start again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setMessage("Password reset successful!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#183f4a] overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 opacity-200 pointer-events-none">
        <div className="w-full h-full border-l-4 border-t-4 border-[#c9a24d] rounded-tl-[4rem]" />
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-200 pointer-events-none">
        <div className="w-full h-full border-r-4 border-t-4 border-[#c9a24d] rounded-tr-[4rem]" />
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-200 pointer-events-none">
        <div className="w-full h-full border-l-4 border-b-4 border-[#c9a24d] rounded-bl-[4rem]" />
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-200 pointer-events-none">
        <div className="w-full h-full border-r-4 border-b-4 border-[#c9a24d] rounded-br-[4rem]" />
      </div>

      <div className="absolute inset-0 flex m-20 justify-center pointer-events-none">
        <h1 className="text-[6rem] sm:text-[8rem] font-extrabold tracking-widest text-[#e6d3a3] opacity-[0.70] select-none">
          RESET PASSWORD
        </h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600 text-sm mb-6">
          Enter your new password below to complete the reset process.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Re-enter new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 text-sm rounded-md p-2">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-600 bg-green-50 border border-green-200 text-sm rounded-md p-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-md transition-colors"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-5 text-blue-600 hover:underline text-sm font-medium transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
