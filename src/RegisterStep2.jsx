import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function RegisterStep2() {
  const navigate = useNavigate();
  const step1Data = JSON.parse(localStorage.getItem('register-step1'));
  const [form, setForm] = useState({
    passwordHash: '',
    role: 'doctor',
    credentials: { npi: '', dea: '', licenseFile: '' },
    ...step1Data
  });

  const handleSubmit = async () => {
    const res = await axios.post('http://127.0.0.1:5000/api/register', form, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('providerId', res.data.providerId);
    navigate('/verify-email');
  };

  return (
    <div className="page-center">
      <div className="register-box">
        <h2>Step 2: Credentials</h2>
        <div className="form-row">
          <input
            placeholder="Password"
            type="password"
            onChange={e => setForm({ ...form, passwordHash: e.target.value })}
          />
          <input
            placeholder="NPI Number"
            onChange={e => setForm({ ...form, credentials: { ...form.credentials, npi: e.target.value } })}
          />
          <input
            placeholder="DEA Number"
            onChange={e => setForm({ ...form, credentials: { ...form.credentials, dea: e.target.value } })}
          />
          <button onClick={handleSubmit}>Submit & Verify Email</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterStep2;