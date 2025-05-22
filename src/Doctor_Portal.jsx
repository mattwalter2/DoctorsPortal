import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Doctor_Portal() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    passwordHash: '',
    role: 'doctor',
    credentials: {
      npi: '',
      dea: '',
      licenseFile: ''
    }
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['npi', 'dea', 'licenseFile'].includes(name)) {
      setForm(prev => ({
        ...prev,
        credentials: { ...prev.credentials, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const registerProvider = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      setMessage(res.data.message || 'Registered successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Registration failed. Please check your input or try again.');
    }
  };

  return (
    <div className="container">
      <h1>Provider Registration</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="passwordHash" placeholder="Password" type="password" onChange={handleChange} />
      <input name="npi" placeholder="NPI Number" onChange={handleChange} />
      <input name="dea" placeholder="DEA Number" onChange={handleChange} />
      <button onClick={registerProvider}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Doctor_Portal;