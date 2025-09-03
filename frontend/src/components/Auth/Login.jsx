import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', {
        email,
        password,
      });

      login(response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
       <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
     </p>
    </div>
    
  );
};

export default Login;
