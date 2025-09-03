import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      await axios.post('http://localhost:9000/api/auth/register', {
        username,
        email,
        password,
      });
      setMessage('Registration successful! Redirecting to login...');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Registration failed.';
      setMessage(serverMessage);
      setMessageType('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {message && (
        <div className={messageType === 'error' ? 'alert alert-error' : 'alert alert-success'}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
