import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
        rememberMe,
      }),
    });

    const data =
      (res.headers.get("content-type") || "").includes("application/json")
        ? await res.json()
        : null;

    if (res.ok) {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data.user.role !== "ADMIN" && data.user.role !== "SUPER_ADMIN") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setError("You are not authorized to access admin panel")
        return
      }
      navigate("/admin-page");
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
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100 p-6">
      <div 
        className="absolute inset-0 z-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        
       </div>
      <div className="w-full max-w-md bg-gray-950 shadow-xl rounded-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <svg
            width="38"
            height="38"
            viewBox="0 0 32 32"
            fill="#2871fa"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <rect width="32" height="32" rx="8" />
            <path
              d="M10 12v8m12-8v8M10 12h12M10 20h12"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-2xl font-bold text-white">
            SmartLibrary AI
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-white mb-6">
          Login to your Account
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 text-sm rounded-md p-2 mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              Stay signed in
            </label>
            <div className ="w-8/12 flex justify-end">
                <button 
                onClick={()=> navigate("/")}
                className="w-5/12 py-2.5 bg-gray-500 hover:bg-gray-700 text-white font-semibold text-sm rounded-md transition-colors disabled:opacity-70">
                Student Login
                </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-md transition-colors disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      
        <div className="text-center mt-6 space-x-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Forgot Password?
          </Link>
          <Link
            to="/create-account"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin;
