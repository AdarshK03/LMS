import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "@/assets/login.png";
import { User, Lock, Mail, Phone, HelpCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState(""); // NEW State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // ... (inside return)

  {/* WHATSAPP - Optional/Unused but kept for UI */ }
  <div className="flex items-center gap-5 border-b border-white/40 pb-3">
    <Phone className="w-6 h-6 text-black" />
    <div className="w-full">
      <p className="text-xs font-bold text-black tracking-wider mb-1">WHATSAPP NUMBER</p>
      <input
        type="text"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
        placeholder="Enter WhatsApp number"
        className="w-full bg-transparent outline-none text-lg text-black placeholder-blue-200/50 font-medium"
      />
    </div>
  </div>

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
          mobile: whatsappNumber, // NEW: Send mobile number
          rememberMe,
        }),
      });

      const data =
        (res.headers.get("content-type") || "").includes("application/json")
          ? await res.json()
          : null;

      if (res.ok) {
        if (data?.token) {
          // ✅ FIXED KEY
          localStorage.setItem("token", data.token);
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


  // .....................................................................................
  //   // ...........first design...........

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Compartment - Image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
      </div>

      {/* Right Compartment - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#9fd3f7] p-8 lg:p-16">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="text-black text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight mb-2">
              WELCOME , Student
            </h1>
            <p className="text-black text-lg">
              Login with you college ID
            </p>
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-[#48aff8] backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">

            {/* USERNAME - Optional/Unused for Login but kept for UI */}
            <div className="flex items-center gap-5 border-b border-white/40 pb-3">
              <User className="w-6 h-6 text-black" />
              <div className="w-full">
                <p className="text-xs font-bold text-black tracking-wider mb-1">USERNAME</p>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full bg-transparent outline-none text-lg text-black placeholder-blue-200/50 font-medium"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-5 border-b border-white/40 pb-3">
              <Lock className="w-6 h-6 text-black" />
              <div className="w-full">
                <p className="text-xs font-bold text-black tracking-wider mb-1">PASSWORD</p>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent outline-none text-lg text-black placeholder-blue-200/50 font-medium"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-5 border-b border-white/40 pb-3">
              <Mail className="w-6 h-6 text-black" />
              <div className="w-full">
                <p className="text-xs font-bold text-black tracking-wider mb-1">EMAIL</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full bg-transparent outline-none text-lg text-black placeholder-blue-200/50 font-medium"
                />
              </div>
            </div>

            {/* WHATSAPP - Optional/Unused but kept for UI */}
            <div className="flex items-center gap-5 border-b border-white/40 pb-3">
              <Phone className="w-6 h-6 text-black" />
              <div className="w-full">
                <p className="text-xs font-bold text-black tracking-wider mb-1">WHATSAPP NUMBER</p>
                <input
                  type="text"
                  placeholder="Enter WhatsApp number"
                  className="w-full bg-transparent outline-none text-lg text-black placeholder-blue-200/50 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link to="/admin-login" className="text-white font-semibold hover:underline">
                Admin Login
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-[#48aff8] hover:bg-gray-50 px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};


export default LoginPage;
