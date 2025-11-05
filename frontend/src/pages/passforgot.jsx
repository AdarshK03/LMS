import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
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

    setMessage(
      "If an account with that email exists, a password reset link has been sent."
    );
    setEmail("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.description}>
          Enter your registered email address and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="example@email.com"
          />
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          style={{ ...styles.link, background: "none", border: "none", cursor: "pointer", display: "block", margin: "15px auto 0", }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: { marginBottom: "10px", color: "#333" },
  description: { color: "#666", marginBottom: "20px", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", alignItems: "stretch" },
  label: {
    textAlign: "left",
    fontSize: "14px",
    color: "#333",
    marginBottom: "6px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
  link: {
    display: "block",
    marginTop: "15px",
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  },
  error: { color: "red", fontSize: "13px", marginBottom: "10px" },
  success: { color: "green", fontSize: "13px", marginBottom: "10px" },
};

export default ForgotPassword;
