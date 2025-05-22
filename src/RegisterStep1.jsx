import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterStep1() {
  const navigate = useNavigate();
  const [step1Data, setStep1Data] = useState({
    name: '',
    email: '',
    clinicName: '',
    clinicAddress: ''
  });

  const handleNext = () => {
    localStorage.setItem('register-step1', JSON.stringify(step1Data));
    navigate('/register-step2');
  };

  return (
    <div className="container">
      <h2>Step 1: Basic Info</h2>
      <input placeholder="Full Name" onChange={e => setStep1Data({ ...step1Data, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setStep1Data({ ...step1Data, email: e.target.value })} />
      <input placeholder="Clinic Name" onChange={e => setStep1Data({ ...step1Data, clinicName: e.target.value })} />
      <input placeholder="Clinic Address" onChange={e => setStep1Data({ ...step1Data, clinicAddress: e.target.value })} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default RegisterStep1;