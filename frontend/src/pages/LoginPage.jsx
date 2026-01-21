import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "@/assets/lib.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const LoginPage = () => {
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
        credentials: "include",
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

  // .....................................................................................
//   // ...........first design...........
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
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
          <span className="text-2xl font-bold text-gray-800">
            SmartLibrary AI
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              Stay signed in
            </label>
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

        {/* Links */}
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


//.....................................................................................
  //...........second design...........

// return (
  
//     <div
//   className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
//   style={{ backgroundImage: `url(${bg})`  }}
// >

//       {/* ───────────── Background Brand Text (Behind Card) ───────────── */}
//       <div className="absolute inset-0 flex m-20 justify-center pointer-events-none">
//         <h1 className="text-[6rem] sm:text-[8rem] font-extrabold tracking-widest text-[#e6d3a3] opacity-[0.70] select-none">
//           SMARTLIBRARY AI
//         </h1>
//       </div>

//       {/* ───────────────── Login Card ───────────────── */}
//       <div className="w-full max-w-md opacity-95 bg-stone-800 rounded-2xl shadow-2xl p-8 ">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <p className="text-xs tracking-widest opacity-300 uppercase text-white mb-2">
//             Powered by IBM
//           </p>
//           <h2 className="text-2xl font-bold text-white">
//             SmartLibrary AI
//           </h2>
//           <div className="mt-4 flex justify-center">
//             <div className="w-20 h-px bg-white" />
//           </div>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md px-3 py-2 text-center">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-white mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded-md border border-[#cbb88a] bg-stone-700 px-3 py-2 text-sm
//               focus:outline-none focus:ring-2 focus:ring-[#8b6b2f]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-white mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-md border border-[#cbb88a] bg-stone-700 px-3 py-2 text-sm
//               focus:outline-none focus:ring-2 focus:ring-[#8b6b2f]"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-white">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               Stay signed in
//             </label>

//             <Link
//               to="/forgot-password"
//               className="text-[#8b6b2f] hover:underline font-medium"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 rounded-lg bg-[#8b6b2f] py-2.5 text-sm font-semibold
//             text-white hover:bg-[#745726] transition disabled:opacity-70"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-white mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to="/create-account"
//             className="text-[#8b6b2f] font-medium hover:underline"
//           >
//             Create one
//           </Link>
//         </p>
//       </div>
//     </div>
//   );

// };


//.....................................................................................
//...........third design...........


//   return (
//     <div className="min-h-screen relative flex items-center justify-center bg-[#183f4a] overflow-hidden">

//       {/* ───────────────── Decorative Corners ───────────────── */}
//       <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none">
//         <div className="w-full h-full border-l-4 border-t-4 border-[#c9a24d] rounded-tl-[4rem]" />
//       </div>

//       <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
//         <div className="w-full h-full border-r-4 border-t-4 border-[#c9a24d] rounded-tr-[4rem]" />
//       </div>

//       <div className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none">
//         <div className="w-full h-full border-l-4 border-b-4 border-[#c9a24d] rounded-bl-[4rem]" />
//       </div>

//       <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
//         <div className="w-full h-full border-r-4 border-b-4 border-[#c9a24d] rounded-br-[4rem]" />
//       </div>

//       {/* ───────────── Background Brand Text (Behind Card) ───────────── */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <h1 className="text-[6rem] sm:text-[8rem] font-extrabold tracking-widest text-[#e6d3a3] opacity-[0.07] select-none">
//           SMARTLIBRARY AI
//         </h1>
//       </div>

//       {/* ───────────────── Login Card ───────────────── */}
//       <div className="relative z-10 w-full max-w-md bg-[#f4ead1] rounded-2xl shadow-2xl p-8">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <p className="text-xs tracking-widest uppercase text-[#8b6b2f] mb-2">
//             Powered by IBM
//           </p>
//           <h2 className="text-2xl font-bold text-[#3a2a12]">
//             SmartLibrary AI
//           </h2>
//           <div className="mt-4 flex justify-center">
//             <div className="w-20 h-px bg-[#8b6b2f]" />
//           </div>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md px-3 py-2 text-center">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-[#3a2a12] mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded-md border border-[#cbb88a] bg-white px-3 py-2 text-sm
//               focus:outline-none focus:ring-2 focus:ring-[#8b6b2f]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#3a2a12] mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-md border border-[#cbb88a] bg-white px-3 py-2 text-sm
//               focus:outline-none focus:ring-2 focus:ring-[#8b6b2f]"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-[#3a2a12]">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               Stay signed in
//             </label>

//             <Link
//               to="/forgot-password"
//               className="text-[#8b6b2f] hover:underline font-medium"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 rounded-lg bg-[#8b6b2f] py-2.5 text-sm font-semibold
//             text-white hover:bg-[#745726] transition disabled:opacity-70"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-[#3a2a12] mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to="/create-account"
//             className="text-[#8b6b2f] font-medium hover:underline"
//           >
//             Create one
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

export default LoginPage;
