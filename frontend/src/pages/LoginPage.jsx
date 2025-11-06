import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter an e-mail and a password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data =
        (res.headers.get("content-type") || "").includes("application/json")
          ? await res.json()
          : null;

      if (res.ok) {
        if (data && data.token) {
          localStorage.setItem("auth_token", data.token);
        }
        navigate("/home");
      } else {
        setError(
          (data && data.error) ||
            (res.status === 401 ? "Invalid Credentials." : "Login Failed")
        );
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Network Error - please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-8 py-10">
        {/* Logo + Title */}
        <div className="flex items-center justify-center mb-8">
          <svg
            width="38"
            height="38"
            viewBox="0 0 32 32"
            fill="#2871fa"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <rect width="32" height="32" rx="8" />
            <path
              d="M10 12v8m12-8v8M10 12h12M10 20h12"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900">SmartLibrary AI</span>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Login to your Account
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 text-sm rounded-md p-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-md transition duration-200 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-5 space-x-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <Link
            to="/create-account"
            className="text-sm text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
