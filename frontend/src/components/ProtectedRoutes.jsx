// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token"); //fixed name
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsValid(res.ok);
      } catch (err) {
        console.error(err);
        setIsValid(false);
      }
    };

    checkAuth();
  }, []);

  if (isValid === null) return <p>Loading...</p>;
  if (!isValid) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;