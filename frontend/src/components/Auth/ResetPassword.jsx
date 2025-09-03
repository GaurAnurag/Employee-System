import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './ResetPassword.css'; 

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage('Reset token missing or invalid.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await api.post('/auth/reset-password', null, {
        params: {
          token,
          newPassword,
        },
      });
      setMessage(res.data);
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2s
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
