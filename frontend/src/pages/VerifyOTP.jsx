import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setMessage("OTP verified successfully!");
    setTimeout(() => navigate("/reset-password"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-center">
          <div className="flex justify-between gap-2 mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
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
            Verify OTP
          </button>
        </form>

        <button
          onClick={() => navigate("/forgot-password")}
          className="mt-5 text-blue-600 hover:underline text-sm font-medium transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
