// import React from "react";
// import { UserPlus } from "lucide-react";
// import { Link } from 'react-router-dom'

// const CreateAccount = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
//         <div className="flex flex-col items-center mb-6">
//           <div className="bg-blue-600 text-white p-3 rounded-full">
//             <UserPlus className="h-6 w-6" />
//           </div>
//           <h1 className="text-2xl font-semibold text-gray-800 mt-3">Create Account</h1>
//           <p className="text-gray-500 text-sm">Join us to continue</p>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               placeholder="John Doe"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               placeholder="john@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               placeholder="********"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
//           >
//             Create Account
//           </button>
//         </form>

//         <p className="text-center text-gray-600 text-sm mt-4">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;


import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🧩 handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "text" ? "name" : e.target.type]: e.target.value });
  };

  // 🚀 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created successfully!");
        setTimeout(() => navigate("/"), 1500); // redirect to login after success
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-full">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mt-3">Create Account</h1>
          <p className="text-gray-500 text-sm">Join us to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;

