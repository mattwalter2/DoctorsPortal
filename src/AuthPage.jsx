import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'; // ensure global styles apply

function AuthPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', form);
      localStorage.setItem('providerId', res.data.providerId);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Authentication failed.');
    }
  };

  return (
    <div className="page-center">
      <div className="auth-box">
        <h2>Login</h2>
        <div className="form-row">
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
        </div>
        <p>{message}</p>
        <p>
          Don’t have an account?{' '}
          <button onClick={() => navigate('/register')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
