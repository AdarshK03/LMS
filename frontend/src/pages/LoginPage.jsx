import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE;

const LoginPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    
    if(!email.trim() || !password) {
      setError('Please enter an e-mail and a password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim().toLowerCase(), password})
      });

      const data = await (res.headers.get('content-type') || '').includes('application/json')
      ? await res.json()
      : null;

      if(res.ok) {
        if(data && data.token) {
          localStorage.setItem('auth_token', data.token);
        }
        navigate('/home');
      } else {
        setError((data && data.error) || (res.status === 401 ? 'Invalid Credentials.' : 'Login Failed'));
      }
    } catch(err) {
      console.error('Login Error: ', err);
      setError('Network Error - please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '70px auto',
      background: '#fff',
      boxShadow: '0 8px 32px rgba(100,100,150,0.15)',
      borderRadius: '18px',
      padding: '40px 40px 32px 40px',
      fontFamily: "'Inter', Arial, sans-serif"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        {/* Book icon SVG */}
        <svg width="38" height="38" viewBox="0 0 32 32" fill="#2871fa" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 10 }}>
          <rect width="32" height="32" rx="8"/>
          <path d="M10 12v8m12-8v8M10 12h12M10 20h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#222a3a' }}>SmartLibrary AI</span>
      </div>
      <h2 style={{
        textAlign: 'center', color: '#222a3a', marginBottom: 20, fontWeight: 700
      }}>
        Login to your Account
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" style={{ fontSize: '1rem', color: '#3a4665', marginBottom: 6, display: 'block' }}>Email Address</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' required placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '10px 12px',
            marginBottom: 18,
            borderRadius: '9px',
            border: '1px solid #eaeaf2',
            fontSize: '1rem',
            boxSizing: 'border-box',
            background: '#fafbfc'
          }}
        />
        <label htmlFor="password" style={{ fontSize: '1rem', color: '#3a4665', marginBottom: 6, display: 'block' }}>Password</label>
        <input type="password" id="password" name="password" required autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
          style={{
            width: '100%',
            padding: '10px 12px',
            marginBottom: 18,
            borderRadius: '9px',
            border: '1px solid #eaeaf2',
            fontSize: '1rem',
            boxSizing: 'border-box',
            background: '#fafbfc'
          }}

        />
        <button type="submit" disabled={loading} aria-busy={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: '#2871fa',
            border: 'none',
            color: '#fff',
            borderRadius: '9px',
            fontSize: '1.08rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 10,
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Link to="/forgot-password" style={{ color: '#2871fa', textDecoration: 'none', margin: '0 8px', fontSize: '0.95rem' }}>Forgot Password?</Link>
        <Link to="/create-account" style={{ color: '#2871fa', textDecoration: 'none', margin: '0 8px', fontSize: '0.95rem' }}>Create Account</Link>
      </div>
    </div>
  );
};

export default LoginPage;