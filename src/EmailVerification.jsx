import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const navigate = useNavigate();

  const simulateVerification = () => {
    setTimeout(() => {
      navigate('/complete-profile');
    }, 1500);
  };

  return (
    <div className="container">
      <h2>Verification Email Sent</h2>
      <p>Please check your email to verify your account.</p>
      <button onClick={simulateVerification}>I Verified My Email</button>
    </div>
  );
}

export default EmailVerification;