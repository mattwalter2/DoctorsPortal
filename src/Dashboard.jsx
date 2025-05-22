import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    allergies: '',
    conditions: ''
  });

  const providerId = localStorage.getItem('providerId');

  useEffect(() => {
    const fetchProvider = async () => {
      if (!providerId) {
        alert("No provider ID found. Please log in or register.");
        window.location.href = "/register";
        return;
      }

      try {
        const res = await axios.get('http://127.0.0.1:5000/api/providers');
        const matched = res.data.find(p => p.id === parseInt(providerId));
        if (!matched) {
          alert("Provider not found.");
          window.location.href = "/register";
        } else {
          setProvider(matched);
        }
      } catch (err) {
        console.error("Failed to load provider data:", err);
        alert("Unable to fetch your profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPatients = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/patients?providerId=${providerId}`);
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to load patients:', err);
      }
    };

    fetchProvider();
    fetchPatients();
  }, [providerId]);

  const handleLogout = () => {
    localStorage.removeItem('providerId');
    window.location.href = '/register';
  };

  const handlePatientSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/api/patients', {
        ...newPatient,
        providerId
      });
      alert('Patient created successfully!');
      setNewPatient({
        fullName: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        allergies: '',
        conditions: ''
      });
      setShowPatientForm(false);

      const res = await axios.get(`http://127.0.0.1:5000/api/patients?providerId=${providerId}`);
      setPatients(res.data);
    } catch (err) {
      console.error('Failed to create patient:', err);
      alert('Could not create patient.');
    }
  };

  if (loading) return <div className="container"><h2>Loading dashboard...</h2></div>;
  if (!provider) return <div className="container"><h2>Provider not found.</h2></div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <section className="profile-section">
        <h2>Your Profile</h2>
        <table className="profile-table">
          <tbody>
            <tr><td><strong>Email:</strong></td><td>{provider.email}</td></tr>
            <tr><td><strong>Role:</strong></td><td>{provider.role}</td></tr>
            <tr><td><strong>Bio:</strong></td><td>{provider.bio || <em>Not provided</em>}</td></tr>
            <tr><td><strong>Specialty:</strong></td><td>{provider.specialty || <em>Not provided</em>}</td></tr>
            <tr><td><strong>Practice Hours:</strong></td><td>{provider.hours || <em>Not provided</em>}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="add-patient-section">
        <h2>Patients</h2>
        {!showPatientForm ? (
          <button onClick={() => setShowPatientForm(true)}>+ Add New Patient</button>
        ) : (
          <div className="patient-form">
            <input placeholder="Full Name" onChange={e => setNewPatient({ ...newPatient, fullName: e.target.value })} />
            <input type="date" placeholder="DOB" onChange={e => setNewPatient({ ...newPatient, dob: e.target.value })} />
            <input placeholder="Email" onChange={e => setNewPatient({ ...newPatient, email: e.target.value })} />
            <input placeholder="Phone" onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} />
            <input placeholder="Shipping Address" onChange={e => setNewPatient({ ...newPatient, address: e.target.value })} />
            <textarea placeholder="Allergies" onChange={e => setNewPatient({ ...newPatient, allergies: e.target.value })} />
            <textarea placeholder="Conditions" onChange={e => setNewPatient({ ...newPatient, conditions: e.target.value })} />
            <button onClick={handlePatientSubmit}>Save Patient</button>
            <button onClick={() => setShowPatientForm(false)}>Cancel</button>
          </div>
        )}

        <div className="patient-directory">
          <h3>Patient Directory</h3>
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td>{p.full_name}</td>
                    <td>{p.dob}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="future-section">
        <h2>Coming Soon</h2>
        <ul>
          <li>📝 Prescription management</li>
          <li>📦 Order tracking</li>
          <li>📊 Analytics & commissions</li>
          <li>💬 Secure messaging with pharmacists</li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;