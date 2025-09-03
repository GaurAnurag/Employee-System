import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.post('/auth/forgot-password', null, {
        params: { email },
      });
      setMessage(res.data);

      // Wait for 2 seconds, then navigate to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'Failed to send reset link. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
