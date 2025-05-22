import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', form);
      localStorage.setItem('providerId', res.data.providerId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setMessage(err.response?.data?.error || 'Authentication failed.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <p>
        Don’t have an account?{' '}
        <button onClick={handleSignupRedirect}>Sign Up</button>
      </p>
    </div>
  );
}

export default AuthPage;