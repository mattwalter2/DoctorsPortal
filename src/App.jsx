import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import EmailVerification from './EmailVerification';
import CompleteProfile from './CompleteProfile';
import Dashboard from './Dashboard';
import AuthPage from './AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path="/register" element={<RegisterStep1 />} />
        <Route path="/register-step2" element={<RegisterStep2 />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;