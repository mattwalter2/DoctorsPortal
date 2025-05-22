import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientDirectory() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const providerId = localStorage.getItem('providerId');

  useEffect(() => {
    const fetchPatients = async () => {
      if (!providerId) {
        alert('No provider ID found. Please log in.');
        return;
      }
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/patients?providerId=${providerId}`);
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        alert('Failed to load patient directory.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [providerId]);

  const filtered = patients.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.dob.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Patient Directory</h2>
      <input
        type="text"
        placeholder="Search by name or DOB"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Allergies</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(patient => (
              <tr key={patient.id}>
                <td>{patient.full_name}</td>
                <td>{patient.dob}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>{patient.allergies}</td>
                <td>{patient.conditions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientDirectory;