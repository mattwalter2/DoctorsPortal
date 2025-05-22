import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewPatientForm() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    allergies: '',
    conditions: ''
  });

  const handleSubmit = async () => {
    const providerId = localStorage.getItem('providerId');
    if (!providerId) {
      alert('You must be logged in to create a patient.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/api/patients', {
        ...patient,
        providerId
      });
      alert('Patient created successfully.');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating patient:', err);
      alert('Failed to create patient.');
    }
  };

  return (
    <div className="container">
      <h2>New Patient</h2>
      <input placeholder="Full Name" onChange={e => setPatient({ ...patient, fullName: e.target.value })} />
      <input type="date" placeholder="Date of Birth" onChange={e => setPatient({ ...patient, dob: e.target.value })} />
      <input placeholder="Email" onChange={e => setPatient({ ...patient, email: e.target.value })} />
      <input placeholder="Phone" onChange={e => setPatient({ ...patient, phone: e.target.value })} />
      <input placeholder="Shipping Address" onChange={e => setPatient({ ...patient, address: e.target.value })} />
      <textarea placeholder="Allergies" onChange={e => setPatient({ ...patient, allergies: e.target.value })} />
      <textarea placeholder="Medical Conditions" onChange={e => setPatient({ ...patient, conditions: e.target.value })} />
      <button onClick={handleSubmit}>Save Patient</button>
    </div>
  );
}

export default NewPatientForm;