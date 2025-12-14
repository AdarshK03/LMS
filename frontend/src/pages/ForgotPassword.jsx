import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setMessage("OTP has been sent to your email address.");

      // Redirect to Verify OTP page with email
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 800);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter your registered email address and we’ll send you a 6-digit OTP
          to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
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
            Send OTP
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

export default ForgotPassword;
