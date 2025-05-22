import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CompleteProfile() {
  const [profile, setProfile] = useState({
    bio: '',
    specialty: '',
    hours: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const providerId = localStorage.getItem('providerId'); // must be set after registration

    if (!providerId) {
      alert("No provider ID found. Please register first.");
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/complete-profile', {
        ...profile,
        providerId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Profile setup complete:', res.data);
      alert('Profile saved! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error saving profile:', err);
      alert('Error saving profile. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Finish Profile</h2>
      <textarea
        placeholder="Bio"
        onChange={e => setProfile({ ...profile, bio: e.target.value })}
      />
      <input
        placeholder="Specialty"
        onChange={e => setProfile({ ...profile, specialty: e.target.value })}
      />
      <input
        placeholder="Practice Hours"
        onChange={e => setProfile({ ...profile, hours: e.target.value })}
      />
      <button onClick={handleSubmit}>Finish Setup</button>
    </div>
  );
}

export default CompleteProfile;